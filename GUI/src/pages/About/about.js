import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import background from '../../assets/Images/hero.jpg';

const ProgressBox = styled(Box)({
  marginTop: '16px',
  textAlign: 'left',
});

const AboutUs = () => {
  return (
    <Box
   
      sx={{
        display: 'flex',
        height: '500px',
        padding: '80px',
        textAlign: 'center',
        backgroundColor: 'linear-gradient(to right, #b3e0ff, #f0f0f0)',
        alignItems: 'stretch',
        gap: '20px', // Ajout d'un espace entre les colonnes
      }}
    >
      {/* Colonne de gauche */}
      <Box sx={{ flex: '1', textAlign: 'center', pr: 2, height: '100%', overflowY: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
          What is Minimal?
        </Typography>
        <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
          Our theme is the most advanced and user-friendly theme you will find on the market, we have documentation and video to help set your site really easily, pre-installed demos you can import in one click and everything from the theme options to page content can be edited from the front-end. This is the theme you are looking for.
        </Typography>
        {/* Zone des pourcentages */}
        <ProgressBox sx={{ width: '100%', color: '#000', fontSize: '14px', backgroundColor: '#fff', padding: '8px', borderRadius: '5px' }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'cursive' }}>Verification  90%</Typography>
          <LinearProgress variant="determinate"  color="success" value={90} sx={{ mb: 1, height: '5px', borderRadius: '5px' }} />
        </ProgressBox>

        <ProgressBox sx={{ width: '100%', color: '#000', fontSize: '14px', backgroundColor: '#fff', padding: '8px', borderRadius: '5px', marginTop: '16px' }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'cursive' }}>Analyse  70%</Typography>
          <LinearProgress variant="determinate" value={70} color="primary" sx={{ mb: 1, height: '5px', borderRadius: '5px' }} />
        </ProgressBox>

        <ProgressBox sx={{ width: '100%', color: '#000', fontSize: '14px', backgroundColor: '#fff', padding: '8px', borderRadius: '5px', marginTop: '16px' }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'cursive' }}>Soumission  100%</Typography>
          <LinearProgress variant="determinate" value={100} color="warning" sx={{ height: '5px', borderRadius: '5px' }} />
        </ProgressBox>
      </Box>

      {/* Colonne de droite */}
      <Box
        sx={{
          flex: '1',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: `url(${background})`,
          textAlign: 'left',
          color: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '20px',
          height: '450px', // Ajustement de la hauteur
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#000', fontFamily: 'cursive' }}>
          Who are we?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontFamily: 'cursive' }}>
          Let's work together and make awesome sites easily.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
