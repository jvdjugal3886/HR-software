import { Button, Dialog, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const SelfieCapturePopup = ({ isOpen, onClose }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
    setLocation(null);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Failed to get location. Please ensure location services are enabled.");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const confirm = () => {
    if (!location) {
      getLocation();
    }
    if (capturedImage && location) {
      // Here you would typically send the image and location to your server
      console.log('Confirmed image:', capturedImage);
      console.log('Location:', location);
      
      // Example of sending data to server (uncomment and adjust as needed)
      // axios.post('http://your-api-endpoint/check-in', {
      //   image: capturedImage,
      //   location: location
      // })
      // .then(response => {
      //   console.log('Check-in successful:', response.data);
      //   onClose();
      // })
      // .catch(error => {
      //   console.error('Check-in failed:', error);
      //   setError('Failed to check in. Please try again.');
      // });

      onClose();
    } else if (!location) {
      setError("Please wait, getting your location...");
    }
  };

  const blackButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333',
    },
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle align="center">Check In</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '700px' }}>
          <div style={{ width: '626px', height: '528px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
            {capturedImage ? (
              <img src={capturedImage} alt="captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 626, height: 528 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
          <div style={{ width: '352px', textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontSize: '22px', fontWeight: 500, marginBottom: '16px' }}>
              {capturedImage ? 'Confirm your clock in' : 'Capture your Clock-In Selfie'}
            </p>
            {!capturedImage && (
              <Button variant="contained" size="large" onClick={capture} style={blackButtonStyle}>
                Capture
              </Button>
            )}
          </div>
          {capturedImage && (
            <div style={{ display: 'flex', gap: '24px' }}>
              <Button variant="outlined" style={{ width: '221px', height: '47.93px' }} onClick={retake}>
                Retake
              </Button>
              <Button variant="contained" style={{ width: '221px', height: '47.93px', ...blackButtonStyle }} onClick={confirm}>
                Confirm
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Dialog>
  );
};

export default SelfieCapturePopup;