import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
  baseURL: "http://localhost:5000/v1",
  headers: {
    Accept: "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach((cb) => cb(newAccessToken));
  refreshSubscribers = [];
}

const fetchAccessTokenByRefresh = async (rfToken) => {
  if (!rfToken) return null;
  try {
    const res = await axios.post("http://localhost:5000/v1/auth/refresh", {
      refreshToken: rfToken,
    });
    if (res.status === 200 && res.data) {
      return res.data;
    }
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data || error);
  }
  return null;
};

API.interceptors.request.use(
  async (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken && decodeToken.exp) {
        const now = Math.floor(Date.now() / 1000);
        const exp = decodeToken.exp;

        // Nếu token sắp hết hạn
        if (exp - now <= 20) {
          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const newTokens = await fetchAccessTokenByRefresh(refreshToken);
              if (newTokens) {
                console.log("ABC refreshToken successfull");
                localStorage.setItem("accessToken", newTokens.accessToken);
                localStorage.setItem("refreshToken", newTokens.refreshToken);
                config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                onRefreshed(newTokens.accessToken);
              }
              return config;
            } catch (err) {
              console.error("Lỗi khi refresh token:", err);
              return Promise.reject(err);
            } finally {
              isRefreshing = false;
            }
          }

          // Nếu đang trong lúc refresh, các request khác đợi token mới
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(config);
            });
          });
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn, có thể logout tại đây nếu cần
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
