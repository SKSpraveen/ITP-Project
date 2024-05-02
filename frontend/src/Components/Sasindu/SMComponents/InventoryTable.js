import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../.././Pages/Sasindu/StockManager.css";

function InventoryTable() {
    const [inventoryData, setInventoryData] = useState([]);
    const [dataList, setDataList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/stock");
            if (response.data.success) {
                const stocks = response.data.stocks;
                const inventory = {};
                stocks.forEach(stock => {
                    if (inventory.hasOwnProperty(stock.productCode)) {
                        inventory[stock.productCode].quantity += stock.quantity;
                    } else {
                        inventory[stock.productCode] = { ...stock };
                    }
                });

                // Convert inventory object to array for rendering
                const aggregatedData = Object.values(inventory);
                setInventoryData(aggregatedData);
                alert("Stocks fetched successfully");
            } else {
                alert("Failed to fetch stocks");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch stocks");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchArea = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            fetchData(); // Now this will work since fetchData is defined in the outer scope
        } else {
            const filteredInventory = inventoryData.filter(item => {
                return (
                    item.product.toLowerCase().includes(searchQuery) ||
                    item.productCode.toLowerCase().includes(searchQuery)
                );
            });
            setDataList(filteredInventory);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-lg-3 mt-2 mb-2" style={{marginLeft:"69%"}}>
                    <input 
                        className="form-control-search"
                        type="search"
                        placeholder="Search products"
                        name="searchQuery"
                        onChange={handleSearchArea}
                    />
                </div>
            </div>
            <br />
            <table className="ads-table table table-hover">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">Product Code</th>
                        <th scope="col">Product</th>
                        <th scope="col">Add Quantity</th>
                        <th scope="col">Total Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {(dataList.length ? dataList : inventoryData).map((item, index) => (
                        <tr key={index}>
                            <td>{item.productCode}</td>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>
                                {item.quantity < 5 ? (
                                    <span style={{ color: "red" }}>Low Stock: {item.quantity}</span>
                                ) : (
                                    item.quantity
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
        </div>
    );
}

export default InventoryTable;
