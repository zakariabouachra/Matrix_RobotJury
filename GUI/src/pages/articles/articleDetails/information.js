import React from 'react';
import { Typography, Paper } from '@mui/material';

const InformationDisplay = ({ information }) => {
  const { volume, issue, page } = information;

  const hasInfo = volume || issue || page;

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Information
      </Typography>
      {hasInfo ? (
        <Typography variant="body1">
          {volume && <div>Volume: {volume}</div>}
          {issue && <div>Issue: {issue}</div>}
          {page && <div>Page: {page}</div>}
        </Typography>
      ) : (
        <Typography variant="body1">Pas d&apos;information disponible</Typography>
      )}
    </Paper>
  );
};

export default InformationDisplay;
