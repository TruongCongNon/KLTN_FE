import ggPlay from "../../../assets/GooglePlay.png";
import appSotre from "../../../assets/appStore.png";
import QRCOde from "../../../assets/qrCode.png";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-20">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Exclusive Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">SmartNova</h3>
            <h4 className="text-lg mb-2">Đăng ký</h4>
            <div className="flex items-center border border-gray-500 rounded">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent p-2 w-full focus:outline-none"
              />
              <button className="p-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hỗ trợ</h3>
            <p className="mb-2">
              33 Nguyen Van Huyen - Khue Trung - Cam Le - Da Nang
            </p>
            <p className="mb-2">truongcongnon104@gmail.com</p>
            <p>+84372338033</p>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tài khoản</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Tài khoản của bạn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                 Đăng nhập/Đăng ký
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Giỏ hàng
                </a>
              </li>
              
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tải ứng dụng</h3>
            <div className="flex space-x-2 mb-4">
              <img
                src={QRCOde}
                alt="QR Code"
                className="w-20 h-20"
              />
              <div className="flex flex-col space-y-2">
                <a href="#">
                  <img src={ggPlay} alt="Google Play" className="w-24" />
                </a>
                <a href="#">
                  <img src={appSotre} alt="App Store" className="w-24" />
                </a>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.04c-5.523 0-10 4.477-10 10 0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.891 3.777-3.891 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.891h-2.33v6.988c4.78-.75 8.437-4.887 8.437-9.878 0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.771a4.926 4.926 0 002.163-2.723c-.951.555-2.005.959-3.127 1.175a4.92 4.92 0 00-8.38 4.482A13.943 13.943 0 011.67 3.149a4.918 4.918 0 001.523 6.573c-.732-.022-1.422-.224-2.02-.557v.056a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209-.005-.418-.014-.626a9.99 9.99 0 002.457-2.548z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.265.058-1.645.069-4.849.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-1.629.073-3.033.414-4.142 1.523-1.109 1.109-1.45 2.513-1.523 4.142-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.073 1.629.414 3.033 1.523 4.142 1.109 1.109 2.513 1.45 4.142 1.523 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.629-.073 3.033-.414 4.142-1.523 1.109-1.109 1.45-2.513 1.523-4.142.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.073-1.629-.414-3.033-1.523-4.142-1.109-1.109-2.513-1.45-4.142-1.523-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-gray-500">
          <p>&copy; Copyright Non Truong</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
