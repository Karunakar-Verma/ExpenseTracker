import dotenv from "dotenv";
dotenv.config({ path: "./utils/.env" }); 
import {loginController} from './controller/userController.js'
import {signupController} from './controller/userController.js'
import {addExpense,getExpense,updateExpense,deleteExpense} from './controller/expenseController.js' 
import express from "express";
import connectDb from "./config/df.js";
import verifyToken from "./authentication/authMiddleware.js";
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.send("Hello Backend!"));

// UserRoute
app.post('/api/v1/login',loginController)
app.post('/api/v1/signup',signupController)

// ExpenseRoute
app.post('/api/v1/addexpense',verifyToken,addExpense)
app.get('/api/v1/getExpense/',verifyToken,getExpense)
app.patch('/api/v1/updateExpense/:id',updateExpense)
app.delete('/api/v1/deleteExpense/:id',deleteExpense)

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
