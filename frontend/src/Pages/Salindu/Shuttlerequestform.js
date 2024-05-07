import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headert from '../../Components/Salindu/Headert';

const Shuttlerequestform = () => {
  const [Remail, setRemail] = useState("");
  const [Employeename, setEmployeename] = useState("");
  const [Reason, setReason] = useState("");
  const [RvehicleType, setRVehicleType] = useState("");
  const [Work, setWork] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (Remail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Remail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(Remail)) {
      setEmailError("Invalid email address");
      return;
    }


    // Clear the email error when a valid email is entered
    setEmailError("");

    // Proceed with form submission
    alert("Insert");

    const newrequest = {
      Remail: Remail,
      Employeename: Employeename,
      Reason: Reason,
      RvehicleType: RvehicleType,
      Work: Work
    };

    axios
      .post("http://localhost:8070/createRequest", newrequest)
      .then(() => {
        // Navigate to RequestTable after successful submission
        
      })
      .catch((err) => {
        alert(err);
      });
      navigate('/ShuttleDetails')
  };

  return (
    <div className="body1">
      <Headert />
      <br/><br/>
    <form  style={{  display: "flex", flexDirection: "column", flexGrow: 0, alignItems: "center", justifyContent: "center", height: "100vh" ,backgroundColor:"hwb(0 89% 11% / 0.803)",width:"60%",marginLeft:"20%",borderRadius:"15px"}}>
      <h2 style={{ color: "#000", textAlign: "center",marginTop:"3%" }}>Vehicle Request Form</h2>

      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label" style={{ color: "#263238" }}>
          Email
        </label>
        <input
          type="text"
          className={`form-control ${emailError ? "is-invalid" : ""}`}
          id="email"
          placeholder="Enter Email"
          value={Remail}
          onChange={(e) => setRemail(e.target.value)}
          style={{ font: "18px Helvetica, Arial, sans-serif", boxSizing: "border-box", display: "block", border: "none", padding: "20px", width: "500px", marginBottom: "20px", fontSize: "18px", outline: "none", transition: "all 0.2s ease-in-out", backgroundColor: "#8d8b8a", color: "#fff" }}
        />
        {emailError && <div className="invalid-feedback">{emailError}</div>}
      </div>

      
      <div className="form-group mb-3">
        <label htmlFor="vehicleno" className="form-label" style={{ color: "#263238" }}>
        Employee Name
        </label>
        <input
          type="text"
          className="form-control"
          id="Employeename"
          placeholder="Enter Employee name"
          value={Employeename}
          onChange={(e) => setEmployeename(e.target.value)}fff
          style={{ font: "18px Helvetica, Arial, sans-serif", boxSizing: "border-box", display: "block", border: "none", padding: "20px", width: "500px", marginBottom: "20px", fontSize: "18px", outline: "none", transition: "all 0.2s ease-in-out", backgroundColor: "#8d8b8a", color: "#fff" }}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="Reason" className="form-label" style={{ color: "#263238" }}>
        Request Reason
        </label>
        <input
          type="text"
          className="form-control"
          id="Reason"
          placeholder="Enter Request Reason"
          value={Reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ font: "18px Helvetica, Arial, sans-serif", boxSizing: "border-box", display: "block", border: "none", padding: "20px", width: "500px", marginBottom: "20px", fontSize: "18px", outline: "none", transition: "all 0.2s ease-in-out", backgroundColor: "#8d8b8a", color: "#fff" }}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="vehicleType" className="form-label" style={{ color: "#263238" }}>
          Vehicle Type
        </label>
        <input
          type="text"
          className="form-control"
          id="vehicleType"
          placeholder="Enter Vehicle Type"
          value={RvehicleType}
          onChange={(e) => setRVehicleType(e.target.value)}
          style={{ font: "18px Helvetica, Arial, sans-serif", boxSizing: "border-box", display: "block", border: "none", padding: "20px", width: "500px", marginBottom: "20px", fontSize: "18px", outline: "none", transition: "all 0.2s ease-in-out", backgroundColor: "#8d8b8a", color: "#fff" }}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="works" className="form-label" style={{ color: "#263238" }}>
          Work
        </label>
        <input
          type="text"
          className="form-control"
          id="works"
          placeholder="Enter Works"
          value={Work}
          onChange={(e) => setWork(e.target.value)}
          style={{ font: "18px Helvetica, Arial, sans-serif", boxSizing: "border-box", display: "block", border: "none", padding: "20px", width: "500px", marginBottom: "20px", fontSize: "18px", outline: "none", transition: "all 0.2s ease-in-out", backgroundColor: "#8d8b8a", color: "#fff" }}
        />
      </div>

      <button type="button" className="btn btn-dark-orange" onClick={handleSubmit} style={{ backgroundColor: "#8b7962", border: "none", color: "white", padding: "14px 50px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "10px" }}>
        Submit
      </button>
      <br/>
    </form>
    <br/><br/><br/>
    </div>
  );
};

export default Shuttlerequestform;
