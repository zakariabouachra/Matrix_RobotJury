import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Checkbox, FormControlLabel, TextField, CircularProgress, Modal, Backdrop,Typography } from '@mui/material';

const Step6 = ({ onPrev, onFinish }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [robotNumber1, setRobotNumber1] = useState(0);
  const [robotNumber2, setRobotNumber2] = useState(0);
  const [robotResult, setRobotResult] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Etat pour gérer l'affichage du spinner

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = () => {
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;
    setRobotNumber1(number1);
    setRobotNumber2(number2);
    setRobotResult(number1 + number2);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleVerificationChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (isChecked && parseInt(userAnswer, 10) === robotResult) {
      setLoading(true); 
      onFinish(setLoading); 
    } else {
      setErrorCount(errorCount + 1);
      if (errorCount >= 2) {
        localStorage.removeItem('formData');
        localStorage.removeItem('authors');
        localStorage.removeItem('formDataStep4');
        window.location.reload();
        return;
      }
      setSubmitted(true);
      console.error("Veuillez cocher la case de vérification et résoudre l'énigme anti-robot avant de soumettre.");
    }
  };

  const isInvalid = !isChecked || parseInt(userAnswer, 10) !== robotResult;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="robotVerification"
          label={`Pour prouver que vous n'êtes pas un robot, résolvez : ${robotNumber1} + ${robotNumber2}`}
          fullWidth
          value={userAnswer}
          onChange={handleVerificationChange}
          error={isInvalid && submitted}
          helperText={isInvalid && submitted && "Veuillez vérifier votre réponse."}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label="J'ai lu et accepté les termes et conditions.*"
          sx={{ color: submitted && !isChecked && '#f44336' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onPrev}>
            Précédent
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Soumettre
          </Button>
        </Box>
      </Grid>
      <Modal
        open={loading}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Fond semi-transparent
        }}
      >
       <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center', // Centre le contenu horizontalement
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff', // Fond blanc
          }}
        >
          <CircularProgress color="primary" size={80} /> {/* Augmente la taille du cercle */}
          <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
            Veuillez patienter en envoyant vos données à notre Robot...
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Step6;
