import { Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '804px',
    height: '772px',
    borderRadius: '4px 0px 0px 0px',
    overflow: 'hidden',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '-0.02em',
  textAlign: 'left',
  padding: '20px 62px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: '0 62px',
  height: 'calc(100% - 60px)', // Adjust for title height
  display: 'flex',
  flexDirection: 'column',
}));

const ApplyLeavePopup = ({ isOpen, onClose }) => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startHalf, setStartHalf] = useState('first');
  const [reason, setReason] = useState('');

  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        Apply Leave
        <Button onClick={onClose}>&times;</Button>
      </StyledDialogTitle>
      <DialogContent sx={{ padding: 0, overflow: 'hidden' }}>
        <StyledBox>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
            <Box sx={{ width: '274px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>Leave Type*</Typography>
                <Select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  fullWidth
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="" disabled>Select Leave</MenuItem>
                  <MenuItem value="casual">Casual Leave</MenuItem>
                  <MenuItem value="sick">Sick Leave</MenuItem>
                </Select>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Start Date*</Typography>
                  <TextField
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                  <RadioGroup
                    value={startHalf}
                    onChange={(e) => setStartHalf(e.target.value)}
                    row
                  >
                    <FormControlLabel value="first" control={<Radio size="small" />} label="First half" />
                    <FormControlLabel value="second" control={<Radio size="small" />} label="Second half" />
                  </RadioGroup>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>End Date*</Typography>
                  <TextField
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Reason</Typography>
                  <TextField
                    multiline
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="Type here"
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button variant="text" startIcon={<span>📎</span>} size="small">
                  Upload Document
                </Button>
              </Box>
            </Box>

            <Box sx={{ width: '321px' }}>
              <Typography variant="subtitle2" gutterBottom>Available Leaves (Yearly)</Typography>
              <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Casual Leave</Typography>
                  <Typography variant="body2">12</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Sick Leave</Typography>
                  <Typography variant="body2">12</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">LOP</Typography>
                  <Typography variant="body2">--</Typography>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                Pending and approved leaves can be edited within 7 days
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto', pb: 2 }}>
            <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button variant="contained" color="black">Apply Leave</Button>
          </Box>
        </StyledBox>
      </DialogContent>
    </StyledDialog>
  );
};

export default ApplyLeavePopup;