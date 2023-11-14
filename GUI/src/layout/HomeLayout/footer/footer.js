import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2c3e50', // Couleur bleu clair pour tout le fond du Footer
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
      }}
    >


      <Typography variant="body2">
        © 2023 Matrix scientifique evaluation. Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;
