import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (trigger) {
      const registerUser = async () => {
        try {
          const resp = await axios.post("http://localhost:5000/api/v1/signup", formData);
          console.log("Registered:", resp.data);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        } catch (error) {
          console.error(error);
        } finally {
          setTrigger(false); 
        }
      };
      registerUser(); 
    }
  }, [trigger]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-[#BDBCB8] transition hover:text-black"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
