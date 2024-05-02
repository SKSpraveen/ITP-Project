import React from "react";
import '../../Components/Rasindu/css/table.css';

function incomeTabale(){
    return(
        <div>
            <div className="rtable-possition">
            <table className="rtable-fill">
            <thead>
            <tr className="rtrTable">
            <th className="rthTable">Income Title</th>
            <th className="rthTable">Amount(Rs.)</th>
            <th className="rthTable">Date</th>
            <th className="rthTable">Category</th>
            
            </tr>
            </thead>
            <tbody className="table-hover">
            <tr className="rtrTable">
            <td className="rtdTable">sell item</td>
            <td className="rtdTable">23500</td>
            <td className="rtdTable">09/03/2024</td>
            <td className="rtdTable">Cash</td>
            </tr>
            
            
            </tbody>
            </table>
  

            </div>

        </div>
    )

}
export default incomeTabale;