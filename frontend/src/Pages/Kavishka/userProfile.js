import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:8070/api/auth/profile/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          setUserData(res.data);
          setNewData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `http://localhost:8070/api/auth/update/${user.email}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserData(newData);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(
        `http://localhost:8070/api/auth/delete/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      logout();
      navigate("/login");
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        className="sidebar"
        style={{
          backgroundColor: "#242424",
          color: "white",
          width: "250px",
          padding: "20px",
        }}
      >
        <ul className="menu" style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>
              Feedback
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>
              Complain
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>
              My Order
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>
              My Services
            </a>
          </li>
          <li>
            <button
              className="logout-button"
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="profile-container" style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          User Profile
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="name" style={{ fontWeight: "bold" }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newData.email}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="address" style={{ fontWeight: "bold" }}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={newData.address}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="phoneNumber" style={{ fontWeight: "bold" }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={newData.phoneNumber}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="button-group" style={{ textAlign: "right" }}>
            <button
              type="submit"
              className="update-button"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Update
            </button>
            <button
              className="delete-button"
              onClick={handleDelete}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserProfile;