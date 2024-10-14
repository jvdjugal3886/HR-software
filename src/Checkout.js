import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Checkout = ({ isOpen, onClose }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  const confirm = () => {
    // Here you would typically send the image to your server or process it
    console.log('Confirmed checkout image:', capturedImage);
    onClose();
  };

  const blackButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333', // A slightly lighter black for hover state
    },
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle align="center">Check Out</DialogTitle>
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
              {capturedImage ? 'Confirm your clock out' : 'Capture your Clock-Out Selfie'}
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
    </Dialog>
  );
};

export default Checkout;