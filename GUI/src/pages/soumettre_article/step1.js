import React from 'react';
import { Typography, TextField, Button, Grid, Box } from '@mui/material'; // Importez les composants nécessaires depuis Material-UI

const Step1 = ({ onNext }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Étape 1</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="firstName"
          label="Prénom"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="lastName"
          label="Nom"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionNumber"
          label="Numéro de contribution"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionTitle"
          label="Titre de la contribution"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="institution"
          label="Institution"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="streetAddress"
          label="Adresse"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="city" label="Ville" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="state" label="Région" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="postalCode"
          label="Code postal"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="country" label="Pays" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="phone"
          label="Téléphone"
          fullWidth
          required // Champ obligatoire
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="fax" label="Fax" fullWidth />
      </Grid>
      <Box mt={2} style={{ marginLeft: 'auto' }}>
            <Button variant="contained" color="primary" onClick={onNext}>
                Suivant
            </Button>
        </Box>
    </Grid>
  );
};

export default Step1;
