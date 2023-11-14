import React from 'react';
import { Typography, TextField, Button, Grid, Box } from '@mui/material'; // Importez les composants nécessaires depuis Material-UI

const Step4 = ({ onPrev, onNext }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Informations sur les auteurs */}
        <Typography variant="subtitle1">Abstract:</Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Champ pour l'abstract */}
        <TextField
          id="abstract"
          label="Abstract"
          multiline
          rows={4}
          fullWidth
          required
        />
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

export default Step4;
