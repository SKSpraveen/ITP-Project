import React, { useState, useEffect } from "react";
import Header from '../../Components/Rasindu/Header'; // Assuming correct path to Header component
import '../../Components/Rasindu/css/flex.css';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function FinancialDashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    Axios.get('http://localhost:8070/expence')
      .then(response => {
        setExpenses(response.data || []);
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
  };

  const calculateTotal = () => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Income',
        data: [50, 30, 89],
        backgroundColor: 'black',
      },
      {
        label: 'Expense',
        data: [20, 60, 79],
        backgroundColor: '#fa730c',
      }
    ]
  };

  const options = {};

  return (
    <div>
      <Header />
      <div className="full">
      <div className="rflex-container">
      <div className="rflex-box" style={{ backgroundColor: "#2e2c2b", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ fontSize: "30px", marginTop: "20px", marginBottom: "10px", color: "#fa730c" }}>Total Incomes:</h1>
        <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>Rs.100</h2>
      </div>

        <div style={{ backgroundColor: "#2e2c2b", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }} className="rflex-box">
          <h1 style={{ fontSize: "30px", marginTop: "20px", marginBottom: "10px", color: "#fa730c" }}>Total Expenses:</h1>
          <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>Rs.{calculateTotal()}</h2>
        </div>
        <div  style={{ backgroundColor: "#2e2c2b", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }} className="rflex-box">
          <h1 style={{ fontSize: "30px", marginTop: "20px", marginBottom: "10px", color: "#fa730c" }}>Balance:</h1>
          <h2 style={{ fontSize: "70px", marginTop: "10px", marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>-Rs.100</h2>
        </div>
      </div>
      <div>
        <Bar
          style={{ padding: '100px', width: '50%' }}
          data={data}
          options={options}
        />
      </div>
    </div>
    </div>
  );
}

export default FinancialDashboard;
