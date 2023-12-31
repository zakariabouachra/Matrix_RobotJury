import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Box } from '@mui/material';

const Step4 = ({ onPrev, onNext }) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('formDataStep4');
    return savedFormData ? JSON.parse(savedFormData) : { abstract: '' };
  });

  useEffect(() => {
    localStorage.setItem('formDataStep4', JSON.stringify(formData));
  }, [formData]);

  const isFormValid = () => {
    return formData.abstract.trim() !== '';
  };

  const handleChange = event => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNextStep = () => {
    if (isFormValid()) {
      onNext(formData);
      console.log(formData);
    } else {
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
