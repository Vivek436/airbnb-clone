import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { showSuccess, showError } from "../utils/showToast";

const Login = () => {
  const [show, setshow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {loading, setLoading} = useContext(authDataContext)

  const { serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUserData(result.data);
      showSuccess("Login successful Welcome back!");
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else {
        showError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaLongArrowAltLeft className="h-[25px] text-[white] w-[25px]" />
      </div>

      <form
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-[30px] text-[black]">Welcome to Airbnb</h1>

        <div className="w-[90%] flex flex-col gap-[10px]">
          <label className="text-[20px]">Email</label>
          <input
            type="text"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="relative w-[90%] flex flex-col gap-[10px]">
          <label className="text-[20px]">Password</label>
          <input
            type={show ? "text" : "password"}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {!show ? (
            <IoMdEye
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <IoEyeOff
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>

        <button className="px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-[18px]">
          Create new Account{" "}
          <span
            className="text-[19px] text-[red] cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;