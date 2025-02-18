import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { Link } from "react-router-dom";
const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div>
        <MuiOtpInput
          sx={{ width: "300px", height: "50px" }}
          value={otp}
          onChange={handleChange}
        />
      </div>
      <p className="mt-4">
        Didn&apos;t get the code?
        <Link to="/register" className="font-bold text-dark-100">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default OtpVerify;
