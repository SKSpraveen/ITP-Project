import React, { useEffect, useState } from "react";
import axios from "axios";
import  "../../.././Pages/Sasindu/StockManager.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

function SM_Dashboard_Content(){

  const navigate=useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8070/stock");
                if (response.data.success) {
                    const stocks = response.data.stocks;

                    // Group stocks by product code and sum their quantities
                    const inventory = {};
                    stocks.forEach(stock => {
                        if (inventory.hasOwnProperty(stock.productCode)) {
                            inventory[stock.productCode].quantity += stock.quantity;
                        } else {
                            inventory[stock.productCode] = { ...stock };
                        }
                    });

                    // Filter low stock products (quantity < 5)
                    const lowStock = Object.values(inventory).filter(item => item.quantity < 5);

                    setLowStockProducts(lowStock);
                    alert("Stocks fetched successfully");
                } else {
                    alert("Failed to fetch stocks");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch stocks");
            }
        };

        fetchData();
    }, []);
    return(
      <div>
        <div className="row" style={{width:"100%"}}>
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card" style={{marginLeft:"3%"}}>
                    <div className="card-body" style={{border:"1px solid"}}>
                        <h5 className="card-title" style={{fontWeight:"bold"}}>Low Stock </h5>
                        <table className="ads-table table table-hover">
                                <thead>
                                    <tr style={{ textAlign: "center" }}>
                                        <th scope="col">Product Code</th>
                                        <th scope="col">Total Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockProducts.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.productCode}</td>
                                            <td>
                                                <span style={{ color: "red" }}>Low Stock: {item.quantity}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card" style={{border:"1px solid"}}>
                    <div className="card-body">
                        <h5 className="card-title" style={{marginLeft:"3%",fontWeight:"bold"}}>Quick Actions</h5>
                        <br />
                        <div className="d-grid gap-2 d-md-block">
                            <button className="Quickbtn" type="button" style={{marginLeft:"4%"}}><i className="fa fa-plus" aria-hidden="true"></i> Sales</button>
                            <button className="Quickbtn" type="button" style={{marginLeft:"8%"}} onClick={()=> navigate('/addstock')}><i className="fa fa-plus" aria-hidden="true"></i> Stock</button>
                        </div>
                        <br />
                        <div className="d-grid gap-2 d-md-block">
                            <button className="Quickbtn" type="button" style={{marginLeft:"4%"}} onClick={()=> navigate('/ads')}><i className="fa fa-plus" aria-hidden="true"></i> Advertisement</button>
                            <button className="Quickbtn" type="button" style={{marginLeft:"8%"}} >Selling Price</button>
                         </div>
                         <br />
                    </div>
                    </div>
                </div>
            </div>
            <br /> <br />
            <div className="card" style={{width:"80%",marginLeft:"10%"}}>
                
                <div className="card-body cbody">
                <h5 className="card-header chead">Quick Views</h5><br />
                    <div class="d-grid gap-2 d-md-block">
                        <button className=" QuickViewbtn" style={{marginLeft:"5%"}} onClick={()=> navigate('/viewAllStock')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> All Stock</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"6%"}} onClick={()=> navigate('/ads')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> All Sales</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"6%"}} onClick={()=> navigate('/viewAllAds')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> All Advertisement</button>
                        <button className=" QuickViewbtn" style={{marginLeft:"6%"}} onClick={()=> navigate('/sellingPrice')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> Price List</button>
                    </div>
                </div>
            </div>
            <br /><br /><br />
      </div>
      
    )
}
export default SM_Dashboard_Content;