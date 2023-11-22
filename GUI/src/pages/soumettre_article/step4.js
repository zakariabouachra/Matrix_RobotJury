import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Box } from '@mui/material';

const Step4 = ({ onPrev, onNext }) => {
  const [formData, setFormData] = useState({
    abstract: '',
  });

  const isFormValid = () => {
    return formData.abstract !== '';
  };

  const handleChange = event => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleNextStep = () => {
    // Vérifiez si le formulaire de l'étape est valide avant de passer à l'étape suivante
    if (isFormValid()) {
      // Appeler la fonction onNext du composant supérieur (WizardForm) avec les données du formulaire de cette étape
      onNext(formData);
    } else {
      // Gérer le cas où le formulaire n'est pas valide (par exemple, afficher un message d'erreur)
      console.error('Le formulaire n\'est pas valide.');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Abstract:</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="abstract"
          label="Abstract"
          multiline
          rows={4}
          fullWidth
          required
          value={formData.abstract}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onPrev}>
            Précédent
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            disabled={!isFormValid()}
          >
            Suivant
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step4;
