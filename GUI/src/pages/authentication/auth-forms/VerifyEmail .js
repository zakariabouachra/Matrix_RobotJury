import React from 'react';
import {Typography, Button, Grid} from '@mui/material';
import AuthWrapper from '../AuthWrapper';

const VerifyEmail = () => {
  return (
    <AuthWrapper>
        <Grid container spacing={3}>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Please verify your email.
            </Typography>
            <Typography variant="body1" gutterBottom>
                You&apos;re almost there! We have sent you an activation link.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Could you help us out and verify your email to be sure you&apos;re human.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Having trouble? Contact support.
            </Typography>
            <Button variant="contained" color="primary">
                Contact Support
            </Button>
            </div>
        </Grid>
    </AuthWrapper>
  );
};

export default VerifyEmail;
