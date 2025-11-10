import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  useEffect(() => {
    if (trigger) {
      const loginInfo = async () => {
        try {
          const resp = await axios.post("http://localhost:5000/api/v1/login", {
            email,
            password,
          });
          console.log("LoginInfo:", resp.data);

          localStorage.setItem("token", resp.data.token); // token set kiya
          console.log("Saved Token:", localStorage.getItem("token"));


          setPassword("");
          setEmail("");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };


      loginInfo();
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-[#BDBCB8] py-2 rounded-lg hover:bg-[#BDBCB8] transition hover:text-black cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-red-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
