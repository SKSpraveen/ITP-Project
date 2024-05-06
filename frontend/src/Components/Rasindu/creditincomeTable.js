import React from "react";

import '../../Components/Rasindu/css/table.css';

function creditincomeTabale({ rows }){
    // Function to calculate total amount
    const calculateTotalC = () => {
        let total = 0;
        rows.forEach(Creditincome => {
            total += Creditincome.amount;
        });
        return total;
    };

    
    return(
        <div>
            <div className="rtable-possition">
            <table className="rtable-fill">
            <thead>
            <tr className="rtrTable">
            <th className="rthTable">Product Name</th>
            <th className="rthTable">Amount(Rs.)</th>
            
            
            </tr>
            </thead>
            <tbody className="table-hover">
            {rows && rows.length > 0 ? (
                            rows.map((Creditincome, index) => (
                                <tr className="rtrTable" key={index}>
                                    <td className="rtdTable">{Creditincome.product}</td>
                                    <td className="rtdTable">{Creditincome.amount}</td>
                                    
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No Data found</td>
                            </tr>
                        )}
                        {/* Display total */}
                        <tr>
                            <td colSpan="4" className="text-right">Total Credit Incomes(Rs):</td>
                            <td className="rtdTable">{calculateTotalC()}</td>
                        </tr>
            
            
            </tbody>
            </table>
  

            </div>

        </div>
    )

}
export default creditincomeTabale;