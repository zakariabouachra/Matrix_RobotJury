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

export default Step4;
