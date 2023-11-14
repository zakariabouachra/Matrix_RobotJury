import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import background from '../../assets/images/hero.jpg';

const ProgressBox = styled(Box)({
  marginTop: '16px',
  textAlign: 'left',
});

const AboutUs = () => {
  return (
    <Box
   
      sx={{
        display: 'flex',
        height: '600px',
        padding: '80px',
        textAlign: 'center',
        backgroundColor: 'white',
        alignItems: 'stretch',
        gap: '20px', // Ajout d'un espace entre les colonnes
      }}
    >
      {/* Colonne de gauche */}
      <Box sx={{ flex: '1', textAlign: 'center', pr: 2, height: '100%', overflowY: 'auto' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
          What is Matrix scientifique evaluation ?
        </Typography>
        <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
        Our scientific article submission platform epitomizes cutting-edge ease of use and user-friendliness. We provide comprehensive documentation and instructional videos to effortlessly guide you through the setup process. Pre-installed demos are at your disposal, importable with just a single click, streamlining the creation process. Moreover, every aspect, from theme options to page content, is editable directly from the user interface. This platform embodies the solution you are seeking to streamline and enhance the scientific article submission process.
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
          height: '400px', // Ajustement de la hauteur
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#000', fontFamily: 'cursive' }}>
          Who are we?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontFamily: 'cursive' }}>
          Let&rsquo;s work together and make awesome sites easily.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
