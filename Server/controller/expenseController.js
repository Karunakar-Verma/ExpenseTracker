import Expense from "../Models/expense.js";
import User from "../Models/user.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, expenseType } = req.body;

    if (!amount || !expenseType) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const expense = new Expense({
      title,
      amount,
      expenseType,
      user: req.user.id 
    });

    const savedExpense = await expense.save();

    return res.status(201).json({
      message: "Expense added successfully!",
      expense: savedExpense
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const getExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Expense.find({ user: userId });
    return res.status(200).json({ message: "Your expenses", result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, expenseType } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found!" });
    }

    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (expenseType) expense.expenseType = expenseType;

    const updatedExpense = await expense.save();

    return res
      .status(200)
      .json({ message: "Expense updated successfully!", updatedExpense });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const toDelete = await Expense.findByIdAndDelete(id);

    if (!toDelete) {
      return res.status(404).json({ message: "Expense not found!" });
    }

    return res
      .status(200)
      .json({
        message: "Expense deleted successfully!",
        deletedExpense: toDelete,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
