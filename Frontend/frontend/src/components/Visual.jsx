import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart } from '@mui/x-charts/BarChart';

const Visual = () => {
  const [salary, setSalary] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get("http://localhost:5000/api/v1/getExpense", {
          headers: { Authorization: `Bearer ${token}` },
        });

  
        const expenses = resp.data.result;

        const totalSalary = expenses
          .filter((e) => e.expenseType === "salary")
          .reduce((sum, curr) => sum + curr.amount, 0);

        const totalExpenditure = expenses
          .filter((e) => e.expenseType === "expenditure")
          .reduce((sum, curr) => sum + curr.amount, 0);

        setSalary(totalSalary);
        setExpenditure(totalExpenditure);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

   return (
    <div className="flex justify-center items-center ">
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['Salary', 'Expenditure'],
          },
        ]}
        series={[
          {
            data: [salary, expenditure],
            color: 'black', 
          },
        ]}
        height={300}
        width={500}
      />
    </div>
  );
};

export default Visual;
