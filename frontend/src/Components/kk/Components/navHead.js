import React from "react"
import {useNavigate} from 'react-router-dom';




const NavHead =({}) =>{
    const navigate = useNavigate();

    const handleEmployeeClick1 = () => {
        navigate('/empTable');
    };

    const handleEmployeeClick2 = () => {
        navigate('/dashboard');
    };

    const handleEmployeeClick3 = () => {
        navigate('/salTable');
    };
    const handleEmployeeClick4 = () => {
        navigate('/finReport');
    };

    
    return(
        <div>
    <div className="h1_kk">Employee and Salary Mangement</div>
    <nav>
              <div className="nav nav-tabs" style={{width:"60%"}} id="nav-tab" role="tablist">
                <button className="nav-link" onClick={handleEmployeeClick2} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Dashboard</button>
                <button className="nav-link" onClick={handleEmployeeClick1} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Employee</button>
                <button className="nav-link" onClick={handleEmployeeClick3} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Salary</button>
                <button className="nav-link" onClick={handleEmployeeClick4} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Report</button>
              </div>
          </nav>
    
</div>
    )
}

export default NavHead;