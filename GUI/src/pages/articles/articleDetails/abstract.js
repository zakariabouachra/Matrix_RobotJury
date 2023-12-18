import React from 'react';
import { Typography, Paper } from '@mui/material';

const AbstractDisplay = ({ abstract }) => {
  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Abstract
      </Typography>
      <Typography variant="body1" component="p">
        {abstract}
      </Typography>
    </Paper>
  );
};

export default AbstractDisplay;
