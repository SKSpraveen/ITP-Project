import React, { useState, useEffect } from "react";
import Header from '../../Components/Rasindu/Header'; // Assuming correct path to Header component
import '../../Components/Rasindu/css/flex.css';
import Axios from 'axios';
import Chart from 'chart.js/auto';

function FinancialDashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [chartInstance, setChartInstance] = useState(null); // State to store chart instance

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bankIncomeResponse = await Axios.get('http://localhost:8070/api/bpayment');
      const creditIncomeResponse = await Axios.get('http://localhost:8070/api/cards');
      const directIncomeResponse = await Axios.get('http://localhost:8070/api/dpayment');
      const expenseResponse = await Axios.get('http://localhost:8070/expence');

      const bankIncome = bankIncomeResponse.data || [];
      const creditIncome = creditIncomeResponse.data || [];
      const directIncome = directIncomeResponse.data || [];
      const expenses = expenseResponse.data || [];

      const totalBankIncome = bankIncome.reduce((acc, income) => acc + income.amount, 0);
      const totalCreditIncome = creditIncome.reduce((acc, income) => acc + income.amount, 0);
      const totalDirectIncome = directIncome.reduce((acc, income) => acc + income.amount, 0);
      const totalIncome = totalBankIncome + totalCreditIncome + totalDirectIncome;
      const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      const profit = totalIncome - totalExpenses;

      setTotalIncome(totalIncome);
      setTotalExpenses(totalExpenses);
      setProfit(profit);

      createPieChart(totalIncome, totalExpenses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (totalIncome !== 0) {
      createPieChart(totalIncome, totalExpenses);
    }
  }, [totalIncome, totalExpenses]);

  const createPieChart = (income, expenses) => {
    const ctx = document.getElementById('pieChart');

    // Destroy previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Income', 'Total Expenses'],
        datasets: [{
          label: 'Financial Data',
          data: [income, expenses],
          backgroundColor: [
            '#28a307',
            '#eb4034',
          ],
          hoverOffset: 4
        }]
      }
    });

    setChartInstance(newChartInstance); // Store new chart instance
  };

  return (
    <div className="body1">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="full">
        <div className="rflex-container">
          <div className="rflex-box" style={{ backgroundColor: "#2e2c2b", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ fontSize: "30px", marginTop: "20px", marginBottom: "10px", color: "#fa730c" }}>Total Income:</h1>
            <h2 style={{ fontSize: "40px", marginTop: "10px", marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>Rs.{totalIncome}</h2>
          </div>

          <div style={{ backgroundColor: "#2e2c2b", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }} className="rflex-box">
            <h1 style={{ fontSize: "30px", marginTop: "20px", marginBottom: "10px", color: "#fa730c" }}>Total Expenses:</h1>
            <h2 style={{ fontSize: "40px", marginTop: "10px", marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>Rs.{totalExpenses}</h2>
          </div>
          <div style={{ backgroundColor: "#2e2c2b", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }} className="rflex-box">
            <h1 style={{ fontSize: "30px", marginTop: "20px", marginBottom: "10px", color: "#fa730c" }}>Profit:</h1>
            <h2 style={{ fontSize: "40px", marginTop: "10px", marginBottom: "20px", color: "#fff", fontWeight: "bold" }}>Rs.{profit}</h2>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center", width: "600px", height: "600px" ,marginLeft:"30%"}}>
      <h2 style={{ color: "#fa730c" }}>Financial Overview</h2>
      <canvas id="pieChart" width="300" height="300"></canvas>
    </div>
    </div>
  );
}

export default FinancialDashboard;
