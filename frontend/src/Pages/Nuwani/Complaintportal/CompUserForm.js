import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header'; 
import '../App.css';

const CompUserForm = ({ addComps, updateComps, submitted, data, isEdit }) => {
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("Repairing"); 
    const [complaint, setComplaint] = useState("");
    const [submitButtonName, setSubmitButtonName] = useState("Submit My Complaint");

    useEffect(() => {
        if (!submitted) {
            setUname('');
            setEmail('');
            setCategory('');
            setComplaint('');
        }
    }, [submitted]);
  
    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setUname(data.uname);
            setEmail(data.email);
            setCategory(data.category);
            setComplaint(data.complaint);
        }
    }, [data]);
  
    useEffect(() => {
        if (isEdit) {
            setSubmitButtonName("Update My Complaint");
        } else {
            setSubmitButtonName("Submit My Complaint");
        }
    }, [isEdit]);

    const handleUnameChange = (event) => {
        setUname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCategoryChange = (event) => { 
        setCategory(event.target.value);
    };

    const handleComplaintChange = (event) => {
        setComplaint(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEdit) {
            updateComps({
                id: data.id,
                uname: uname,
                email: email,
                category: category,
                complaint: complaint,
            });
        } else {
            addComps({
                id: Date.now(),
                uname: uname,
                email: email,
                category: category,
                complaint: complaint,
            });
        }
        setUname("");
        setEmail("");
        setCategory("Repairing");
        setComplaint("");
    };

    return (
        <div>
            <Header /> 
            <div className="form-container">
                <div id="popupsmart-feedback">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="uname">Username:</label>
                        <input type="text" id="uname" name="uname" value={uname} onChange={handleUnameChange}/><br /><br />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange}/><br /><br />
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                            <option value="">Select a category</option>
                            <option value="Installation">Installation</option>
                            <option value="Repairing">Repairing</option>
                            <option value="Other">Other</option>
                        </select>
                        
                        <label htmlFor="complaint">Your Complaint:</label><br />
                        <textarea id="complaint" name="complaint" value={complaint} onChange={handleComplaintChange} placeholder="What can we do to improve your experience." maxLength={50}></textarea><br />
                        
                        <input type="submit" value={submitButtonName} />
                    </form>
                </div>
            </div><br></br><br></br>
        </div>
    );
}

export default CompUserForm;