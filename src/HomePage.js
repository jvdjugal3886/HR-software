import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplyLeavePopup from './ApplyLeavePopup';
import Checkout from './Checkout';
import SelfieCapturePopup from './SelfieCapturePopup';

const HomePage = () => {
  const [isSelfiePopupOpen, setSelfiePopupOpen] = useState(false);
  const [isLeavePopupOpen, setLeavePopupOpen] = useState(false);
  const [isCheckoutPopupOpen, setCheckoutPopupOpen] = useState(false);
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const buttonStyle = {
    width: '208px',
    height: '40px',
    marginRight: '12px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '8px',
  };

  const handleLogout = () => {
    // Here you would typically clear any authentication tokens or user data
    // For now, we'll just redirect to the login page
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <Button 
        variant="contained" 
        style={buttonStyle}
        onClick={() => setSelfiePopupOpen(true)}
      >
        Check In
      </Button>
      <Button 
        variant="contained" 
        style={buttonStyle}
        onClick={() => setLeavePopupOpen(true)}
      >
        Apply Leave
      </Button>
      <Button 
        variant="contained" 
        style={buttonStyle}
        onClick={() => setCheckoutPopupOpen(true)}
      >
        Clock out
      </Button>
      <Button 
        variant="contained" 
        style={buttonStyle}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <SelfieCapturePopup isOpen={isSelfiePopupOpen} onClose={() => setSelfiePopupOpen(false)} />
      <ApplyLeavePopup isOpen={isLeavePopupOpen} onClose={() => setLeavePopupOpen(false)} />
      <Checkout isOpen={isCheckoutPopupOpen} onClose={() => setCheckoutPopupOpen(false)} />
    </div>
  );
};

export default HomePage;