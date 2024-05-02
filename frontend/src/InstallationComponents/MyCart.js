import React, { useEffect, useState } from "react";
import axios from "axios";
import "../StockManager.css";
import { useNavigate, useParams } from "react-router-dom";

function MyCart() {

    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();

  

    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Cart");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.cart);
            } else {
                alert("Failed to fetch my items");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch my item");
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/Cart/delete/${id}`)
            .then((res) => {
                alert("Delete Successfully");
                setDataList(dataList.filter(cart => cart._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting cart:", error);
                alert("Failed to delete cart");
            });
    };

    const handleQuantityUpdate = (id, newQuantity) => {
        axios.put(`http://localhost:8070/Cart/update/${id}`, { orderQuantity: newQuantity })
            .then((res) => {
               
                // Refresh the cart data after update
                getFetchData();
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
                alert("Failed to update quantity");
            });
    };

    return (
        <div>
            <br /> <br />
            <div className="containerSM" style={{ width: "90%" }}>
                <h1 style={{ fontSize: "28px", marginLeft: "1%" }}><i>My cart</i></h1>
            </div>
            <br /><br />
            <div class="card" style={{width: "30%",marginLeft:"65%"}}>
                <div class="card-body">
                    <h5 class="card-title"><i class="fa fa-calculator" aria-hidden="true"></i>&emsp;Cart totals</h5><hr /><br />
                    <p class="card-text" style={{marginLeft:"18px"}}>Total amount</p>
                    <button className="checkout" onClick={() => navigate('/payments')} ><a href="#" style={{textDecoration:"none",color:"white"}}>Checkout</a></button>
                </div>
            </div>
            <br /> <br />
            <table className="ads-table table table-hover">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((cart) => (
                        <tr key={cart.id}>
                            <td>
                            <button type="button" onClick={() => handleDelete(cart._id)} className=""><i class="fa fa-minus" aria-hidden="true"></i></button>
                            </td>
                            <td>{cart.product}</td>
                            <td style={{ textAlign: "center" }}>
                                <input
                                    type="number"
                                    value={cart.orderQuantity}
                                    min="1"
                                    max="8"
                                    style={{
                                        width: "60px",
                                        padding: "5px",
                                        border: "2px solid #ccc",
                                        borderRadius: "30px",
                                        boxSizing: "border-box",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        marginLeft: "10px"
                                    }}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value);
                                        handleQuantityUpdate(cart._id, newQuantity);
                                    }}
                                />
                            </td>
                            <td style={{ textAlign: "center" }}>{cart.amount}</td>
                            <td style={{ textAlign: "center" }}>{cart.amount*cart.orderQuantity}</td>
                            <td>
                            <button type="button" onClick={() => handleDelete(cart._id)} className="btnAction2">Pay</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br /><br />
        </div>
    )
}

export default MyCart;
