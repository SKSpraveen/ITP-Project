import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../../../Pages/Samidi/OrderManager.css";

function OM_Dashboard_Header() {
    const navigate = useNavigate();
    return (
        <div className="header">
            <h2>Welcome Payment Manager Dashboard!</h2>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" onClick={() => navigate('/omdashboard')} id="nav-home-tab" aria-selected="true">Dashboard</button>
                    <button className="nav-link" onClick={() => navigate('/viewTable')} id="nav-profile-tab" aria-selected="false">Repair</button>
                    <button className="nav-link" onClick={() => navigate('/orders')} id="nav-orders-tab" aria-selected="false">Orders</button>
                    <button className="nav-link" onClick={() => navigate('/payment')} id="nav-payment-tab" aria-selected="false">Payment</button>
                    <button className="nav-link" onClick={() => navigate('/logout')} id="nav-logout-tab" aria-selected="false">Logout</button>
                </div>
            </nav>
        </div>
    );
}

function PaymentManagerDashboard() {
    const [totals, setTotals] = useState({ cardTotal: 40000, directTotal: 35000, bankTotal: 12000 });
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        if (selectedMonth === "2024-04") {
            fetchTotals();
        } else {
            setTotals({ cardTotal: 0, directTotal: 0, bankTotal: 0 }); // Correctly reset totals to zero
        }
    }, [selectedMonth]);

    useEffect(() => {
        // This will ensure finalTotal is calculated correctly after totals are updated
        setFinalTotal(totals.cardTotal + totals.directTotal + totals.bankTotal);
    }, [totals]);

    const fetchTotals = async () => {
        try {
            const response = await fetch(`/api/payments/total?month=${selectedMonth}`);
            const data = await response.json();
            setTotals({
                cardTotal: data.cardTotal || 40000,
                directTotal: data.directTotal || 35000,
                bankTotal: data.bankTotal || 12000
            });
        } catch (error) {
            console.error('Error fetching totals:', error);
            setTotals({ cardTotal: 40000, directTotal: 35000, bankTotal: 12000 }); // Reset totals on error
        }
    };

    const handleDownloadReport = () => {
        const csvContent = `Payment Type,Total Amount\nCard Payments,${totals.cardTotal}\nDirect Payments,${totals.directTotal}\nBank Transfers,${totals.bankTotal}\nFinal Total,${finalTotal}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Payment_Report_${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    return (
        <div>
            <OM_Dashboard_Header />
            <div style={{ margin: "20px" }}>
                <label htmlFor="monthSelect">Select Month: </label>
                <input
                    id="monthSelect"
                    type="month"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                />
                <button onClick={handleDownloadReport} style={{ marginLeft: "10px" }}>Download Report</button>
            </div>
            <h2>Total Amounts for {selectedMonth}</h2>
            {selectedMonth === "2024-04" ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <table style={{ width: '60%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Payment Type</th>
                                <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Card Payments</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>{totals.cardTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Direct Payments</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>{totals.directTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Bank Transfers</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>{totals.bankTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Final Total</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>{finalTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available for {selectedMonth}.</p>
            )}
        </div>
    );
}

export default PaymentManagerDashboard;
