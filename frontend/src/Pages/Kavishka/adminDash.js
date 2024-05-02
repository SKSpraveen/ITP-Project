// Import necessary modules and functions
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Axios from 'axios'; // Import Axios instead of { Axios }

function AdminPanel() {
    
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);

    // Fetch user data when the component mounts
    useEffect(() => {
        // Check if user is available
        if (user) {
            // Fetch user profile data
            fetch(`http://localhost:8070/api/auth/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
            })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    const deleteuser = async (id) => {
        try {
            await Axios.delete(`http://localhost:8070/api/auth//delete/${user.email}`);
            alert("User deleted successfully.");
            navigate("/home");
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert("Failed to delete user. Please try again.");
              }
          };
    

    // Render the component
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="sidebar" style={{ backgroundColor: '#242424', color: '#fff', width: '250px', height: '100vh' }}>
                {/* User info */}
                <div className="user-info" style={{ padding: '20px', textAlign: 'center' }}>
                    <img src="user-icon.png" alt="User Icon" style={{ width: '80px', borderRadius: '50%', marginBottom: '10px' }} />
                    <p className="user-details">XXXXXXXXXXXXX</p>
                </div>
                {/* Menu */}
                <ul className="menu" style={{ listStyle: 'none' }}>
                    <li><a href="#" style={{ display: 'block', padding: '15px', color: '#fff', textDecoration: 'none', transition: 'background-color 0.3s' }}>Feedback</a></li>
                    <li><a href="#" style={{ display: 'block', padding: '15px', color: '#fff', textDecoration: 'none', transition: 'background-color 0.3s' }}>Complain</a></li>
                    <li><a href="#" style={{ display: 'block', padding: '15px', color: '#fff', textDecoration: 'none', transition: 'background-color 0.3s' }}>My Order</a></li>
                    <li><a href="#" style={{ display: 'block', padding: '15px', color: '#fff', textDecoration: 'none', transition: 'background-color 0.3s' }}>My Services</a></li>
                    <li><a href="#" style={{ display: 'block', padding: '15px', color: '#fff', textDecoration: 'none', transition: 'background-color 0.3s' }}>Logout</a></li>
                </ul>
            </div>
            {/* Admin container */}
            <div className="admin-container" style={{ flexGrow: '1', background: '#f0f0f0', marginLeft: '130px', marginTop: '30px' }}>
                {/* Admin header */}
                <header className="admin-header" style={{ backgroundColor: '#FF8C00', color: 'black', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ color: 'black' }}>Administrator</h1>
                    {/* Generate report button */}
                    <button id="generateReport" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s' }}>Generate Report</button>
                </header>
                {/* User table */}
                <div className="custom-table" style={{ overflowX: 'auto', maxWidth: '80%', margin: '0 auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over users array and render each user's details */}
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        {/* Delete button */}
                                        <button className="delete-btn" onClick={deleteuser}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Export the AdminPanel component as default
export default AdminPanel;
