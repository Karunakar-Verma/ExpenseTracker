import React from "react";
import Navbar from "./components/Navbar";
import one from "./assets/one.jpg";
import Allexpense from "./components/Allexpense";
import Dashboard from "./pages/Dashboard"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddExpense from "./pages/AddExpense";
import { Routes,Route } from "react-router-dom";


const App = () => {
  return (
   
      <div
        className="min-h-screen bg-cover "
        style={{ backgroundImage: `url(${one})` }}>
        <Navbar />
        {/* <hr /> */}

        <Routes>
          <Route path="/" element = {<Allexpense/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/addExpense" element={<AddExpense/>}/>
        </Routes>
      </div>
     
  );
};

export default App;
