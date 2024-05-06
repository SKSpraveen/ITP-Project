import React from 'react';
import userImage from '../../Images/user.png';
//import Header from './include/_header';
import Footer from '../../Components/Footer';
import './userTable.css';

const Usertableuser = ({ rows, selectedUser, deleteUser }) => {

  const renderStars = (count) => {
    let stars = [];
    for (let index = 0; index < 5; index++) {
      stars.push(<span key={index} className={index < count ? 'selected' : ''}>&#9733;</span>);
    }
    return stars;
  };

 

  return (
    <div>
     
      <div className="card-container">
        {rows.map((row, index) => (
          <div className="card" key={index}>
            <div className="user-details">
              <img src={userImage} alt="User" />
              <div className="username">
                <h5><b>{row.fname}</b></h5>
              </div>
            </div>
            <div className="card-content">   
              <p className="service">Service Type: {row.service}</p><br></br>

              <div className="rating">
                {renderStars(row.selectedStarCount)}
              </div>

              <div className="feedback">
                <p className="feed">{row.feedback}</p>
              </div><br></br>
            </div>
           
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Usertableuser;