


import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  return (
    
   
      <div>
        <div className="header">
          <br /><br />
          <h2>Welcome Admin Dashboard !</h2>
          <br /><br />
           <nav>
              <div className="nav nav-tabs" style={{width:"100%"}} id="nav-tab" role="tablist">
                  <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                  &emsp;&emsp; <button className="nav-link" onClick={()=> navigate('/Admin')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                  <button className="nav-link" onClick={()=> navigate('/userDetails')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-users" aria-hidden="true"></i>&emsp;Users</button>
                  <button className="nav-link" onClick={()=> navigate('/manager')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-users" aria-hidden="true"></i>&emsp;Managers</button>
                  <button className="nav-link" onClick={()=> navigate('')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-comments" aria-hidden="true"></i>&emsp;Feedback</button>
                  <button className="nav-link" onClick={()=> navigate('')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;Complain</button>
                  &emsp;<button className="nav-link" onClick={()=> navigate('/Admin')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
              </div>
          </nav>
       
        </div>
      </div>
      
    
  );
}
export default Admin;