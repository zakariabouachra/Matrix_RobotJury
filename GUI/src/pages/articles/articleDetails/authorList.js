import React from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';

const AuteursList = ({ auteurs }) => {
  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Auteurs
      </Typography>
    <Grid container spacing={2}>
      {Object.entries(auteurs).map(([key, auteur]) => {
        const fullName = auteur.prenom ? `${auteur.prenom} ${auteur.nom}` : auteur.nom;
        return (
          <Grid item key={key} xs={12} sm={6} md={4}>
            <Box padding={2} border={1} borderRadius={2}>
              <Typography variant="h6">{fullName}</Typography>
              <Typography variant="body2">
                {auteur.ORCID ? `ORCID: ${auteur.ORCID}` : 'ORCID non disponible'}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
    </Paper>
  );
};

export default AuteursList;
