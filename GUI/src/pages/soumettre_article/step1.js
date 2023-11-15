import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Box } from '@mui/material';

const Step1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    contributionNumber: '',
    contributionTitle: '',
    institution: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleChange = event => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Étape 1</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionNumber"
          label="Numéro de contribution"
          fullWidth
          required
          value={formData.contributionNumber}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionTitle"
          label="Titre de la contribution"
          fullWidth
          required
          value={formData.contributionTitle}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="institution"
          label="Institution"
          fullWidth
          required
          value={formData.institution}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Box mt={2} style={{ marginLeft: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            disabled={!isFormValid()}
          >
            Suivant
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step1;
