import React, { useRef } from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';

const Step5 = ({ onPrev, onNext }) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    // Gérez le fichier sélectionné ici si nécessaire
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Informations sur le fichier */}
        <Typography variant="subtitle1">Téléchargez votre article (PDF) :</Typography>
      </Grid>
      <Grid item xs={12}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <Button variant="contained" onClick={() => fileInputRef.current.click()}>
          Sélectionner un fichier PDF
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onPrev}>
            Précédent
          </Button>
          <Button variant="contained" color="primary" onClick={onNext}>
            Suivant
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step5;
