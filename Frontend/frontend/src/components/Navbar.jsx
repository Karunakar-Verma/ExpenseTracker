import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between h-16 w-full bg-[#BDBCB8]">
        <div>
          <Link to="/" className="text-5xl font-bold m-1 text-[black]">
            Expense Tracker
          </Link>
        </div>

        <div className="flex gap-4 p-2.5 text-xl items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="border-2 rounded-[10px] m-1 p-1.5 bg-black text-[#BDBCB8] hover:bg-[#BDBCB8] hover:text-black cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-2 rounded-[10px] m-1 p-1.5 bg-black text-[#BDBCB8] hover:bg-[#BDBCB8] hover:text-black cursor-pointer"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-black cursor-pointer text-[#BDBCB8] px-3 py-1 rounded hover:bg-[#BDBCB8] hover:text-black"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-10 text-2xl font-semibold m-1 p-1 h-16 w-full">
        <Link
          to="/dashboard"
          className="hover:bg-[#BDBCB8] rounded-[10px] p-2 cursor-pointer"
        >
          Dashboard
        </Link>
        <Link
          to="/addExpense"
          className="hover:bg-[#BDBCB8] rounded-[10px] p-2 cursor-pointer"
        >
          Add Expense
        </Link>
        <Link
          to="/update"
          className="hover:bg-[#BDBCB8] rounded-[10px] p-2 cursor-pointer"
        >
          Update
        </Link>
        <Link
          to="/delete"
          className="hover:bg-[#BDBCB8] rounded-[10px] p-2 cursor-pointer"
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
