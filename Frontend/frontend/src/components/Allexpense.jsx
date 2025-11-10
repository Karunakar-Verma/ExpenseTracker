import React, { useEffect, useState } from "react";
import axios from "axios";
import Visual from "./Visual";
import img2 from "../assets/img2.jpg"

const AllExpense = () => {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if(token){
          setLoggedIn(true);
        }

        const resp = await axios.get("http://localhost:5000/api/v1/getExpense", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ All Expense:", resp.data);
        setData(resp.data.result);
      } catch (error) {
        console.error("❌ Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="flex justify-between  min-h-screen  p-5">
      <div className="flex flex-col items-center border w-[30%] rounded-2xl  p-3">
        <p className="text-xl font-semibold mb-4">All Expenses</p>

        {/* ✅ Data show karne ke liye map */}
        {data && data.length > 0 ? (
          data.map((exp) => (
            <div
              key={exp._id}
              className="w-full border rounded-lg p-2 mb-2 shadow-sm"
            >
              <p>
                <strong>Title:</strong> {exp.title}
              </p>
              <p>
                <strong>Amount:</strong> ₹{exp.amount}
              </p>
              <p>
                <strong>Type:</strong> {exp.expenseType}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No expenses found.</p>
        )}
      </div>

      <div className="flex justify-center border w-[60%] rounded-2xl  p-3">
        <p className="text-xl font-semibold">
          <h1 className="flex justify-center pb-4">Visuals</h1>
          {loggedIn ? <Visual/> : <img src={img2} alt="Log in to visualize !"/>}
        </p>
      </div>
    </div>
  );
};

export default AllExpense;
