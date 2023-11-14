import React, { useState } from 'react';
import {  Button, Grid, Box, Checkbox, FormControlLabel, TextField } from '@mui/material';

const Step6 = ({ onPrev, onFinish }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [robotVerification, setRobotVerification] = useState('');


  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleVerificationChange = (event) => {
    setRobotVerification(event.target.value);
  };

  const handleSubmit = () => {
    // Vérifiez si la case est cochée et effectuez la vérification anti-robot ici
    if (isChecked && robotVerification.toLowerCase() === '13') {
      // Logique pour vérification anti-robot réussie
      onFinish();
    } else {
      // Affichez un message d'erreur ou effectuez une action en cas de non-cochage ou de vérification incorrecte
      console.error("Veuillez cocher la case de vérification et résoudre l'énigme anti-robot avant de soumettre.");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Champ de vérification anti-robot */}
        <TextField
          id="robotVerification"
          label="Pour prouver que vous n'êtes pas un robot, résolvez 8 + 5 :"
          fullWidth
          value={robotVerification}
          onChange={handleVerificationChange}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Case à cocher pour la condition */}
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label="J'ai lu et accepté les termes et conditions."
        />
      </Grid>
      <Grid item xs={12}>
        {/* Bouton Submit */}
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onPrev}>
            Précédent
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Soumettre
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step6;
