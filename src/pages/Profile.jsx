import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import "../Styles/Profile.css";
import profile from "../assets/profile.png";
import { Col, Row, Table } from 'reactstrap';

export default function Profile() {
  const [activityTab, setActivityTab] = useState('Activity');

  const handleActivityTab = (tab) => {
    setActivityTab(tab);
  };

  return (
    <div className='profile-container'>
      <h5>Profile</h5>
      <div className='d-flex '>
        <div className='profile-card col-md-3'>
          <img src={profile} className="profile" alt="Profile" />
          <div className='adminprofile'>
            <h6>Admin</h6>
            <p style={{fontSize:"smaller"}}>User Experience Specialist 
            Kano Nigeria</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: '60%'}}>
            <span className='progress-text'>Your Profile is 60% complete</span>
            </div>
          </div>
          
          <div className='d-flex ' style={{justifyContent:"center"}}>
            <button className="btns btn-primary" style={{fontSize:"smaller"}}>Follow</button>
            <button className="btns btn-secondary" style={{fontSize:"smaller"}}>Message</button>
          </div>
         <hr></hr>
          <div className="about-section">
            <h5 className='heading'>About</h5>
            <p style={{ textAlign: "left" }}>Hi I'm Admin. Introduction about admin.</p>
          </div>
         <hr></hr>
          <div className="contact" style={{ textAlign: "left" }}>
            <h5 className='heading'>Contact Information</h5>
            <Table>
              <tr>Email
              <td>shatu@gmail.com</td>
              </tr>
                <tr>
                  Phone
                  <td>08028343839</td>
                </tr>
                <tr>
                  Address
                  <td>No.1037 gama A Brigade, Kano.</td>
                </tr>
             
            </Table>
          </div>
        </div>
        <div className='profile-card rightside col-md-9'>
          <div className="tabs">
            <button className={`tab ${activityTab === 'Activity' ? 'active' : ''}`} onClick={() => handleActivityTab('Activity')}>Activity</button>
            <button className={`tab ${activityTab === 'Messages' ? 'active' : ''}`} onClick={() => handleActivityTab('Messages')}>Messages</button>
            <button className={`tab ${activityTab === 'Orders' ? 'active' : ''}`} onClick={() => handleActivityTab('Orders')}>Orders</button>
            <button className={`tab ${activityTab === 'Payments' ? 'active' : ''}`} onClick={() => handleActivityTab('Payments')}>Payments</button>
            <button className={`tab ${activityTab === 'Deliveries' ? 'active' : ''}`} onClick={() => handleActivityTab('Deliveries')}>Deliveries</button>
          </div>
          <div className="activity-section">
            {activityTab === 'Activity' && (
              <>
                <h6>This Week</h6>
                <div className="activity-item">
                  <p className="time">02 hours ago</p>
                  <p className="activity-description">Designing Shreyu Admin</p>
                </div>
                <div className="activity-item">
                  <p className="time">21 hours ago</p>
                  <p className="activity-description">UX and UI for Ubold Admin</p>
                </div>
                <div className="activity-item">
                  <p className="time">22 hours ago</p>
                  <p className="activity-description">UX and UI for Hyper Admin</p>
                </div>
                <h6>Last Week</h6>
                <div className="activity-item">
                  <p className="time">02 hours ago</p>
                  <p className="activity-description">Designing Shreyu Admin</p>
                </div>
              </>
            )}
            {activityTab === 'Messages' && (
              <div>
                <h6>Messages</h6>
                <p>No new messages.</p>
              </div>
            )}
            {activityTab === 'Orders' && (
              <div>
                <h6>Orders</h6>
                <p>No new orders.</p>
              </div>
            )}
            {activityTab === 'Payments' && (
              <div>
                <h6>Payments</h6>
                <p>No new payments.</p>
              </div>
            )}
            {activityTab === 'Deliveries' && (
              <div>
                <h6>Deliveries</h6>
                <p>No new deliveries.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
