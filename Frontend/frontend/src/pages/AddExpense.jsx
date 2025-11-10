import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseManager() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    expenseType: "",
  });

  // ✅ Check login status when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      title: expenseData.title,
      amount: expenseData.amount,
      expenseType: expenseData.expenseType,
    };

    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        "http://localhost:5000/api/v1/addexpense",
        expense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("AddExpense:", resp.data);

      alert("✅ Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("❌ Failed to add expense!");
    }

    setShowModal(false);
    setExpenseData({ title: "", amount: "", expenseType: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Add Expense Button */}
      <button
        onClick={() => isLoggedIn && setShowModal(true)}
        disabled={!isLoggedIn}
        title={!isLoggedIn ? "Please login to add expenses" : ""}
        className={`px-5 py-2 rounded-lg font-semibold transition ${
          isLoggedIn
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        + Add Expense
      </button>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
            <h2 className="text-xl font-bold mb-4 text-center">
              Add New Expense
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={expenseData.title}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={expenseData.amount}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">
                  Expense Type
                </label>
                <select
                  name="expenseType"
                  value={expenseData.expenseType}
                  onChange={handleChange}
                  className="w-full border rounded p-2 focus:outline-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="salary">Salary</option>
                  <option value="expenditure">Expenditure</option>
                  {/* <option value="Bills">Bills</option>
                  <option value="Shopping">Shopping</option> */}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
