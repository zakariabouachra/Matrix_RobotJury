import React from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box } from '@mui/material'; // Importez les composants nécessaires depuis Material-UI

const Step2 = ({ onPrev, onNext }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Étape 2</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionTitle"
          label="Titre de la contribution"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="trackPreference"
          select
          label="Track preference"
          fullWidth
          required
        >
          {/* Options pour Track preference */}
          <MenuItem value="IARIA Congress 2023 - General event track">
            IARIA Congress 2023 - General event track
          </MenuItem>
          {/* Ajoutez d'autres options au besoin */}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="mainTopic"
          select
          label="Main topic"
          fullWidth
          required
        >
          {/* Options pour Main topic */}
          <MenuItem value="">Please select...</MenuItem>
          {/* Ajoutez d'autres options au besoin */}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionType"
          select
          label="Contribution type"
          fullWidth
          required
        >
          {/* Options pour Contribution type */}
          <MenuItem value="">Please select...</MenuItem>
          {/* Ajoutez d'autres options au besoin */}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contentType"
          select
          label="Content type"
          fullWidth
          required
        >
          {/* Options pour Content type */}
          <MenuItem value="">Please select...</MenuItem>
          {/* Ajoutez d'autres options au besoin */}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        {/* Champ de calcul pour prouver que l'utilisateur n'est pas un robot */}
        <TextField
          id="robotVerification"
          label="To prove you are not a robot, solve 8 + 5 ="
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

export default Step2;
