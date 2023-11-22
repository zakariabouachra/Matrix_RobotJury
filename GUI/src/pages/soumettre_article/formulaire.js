import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Container, Paper, Box } from '@mui/material';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';

const steps = ['Information Generale', 'Contribution', 'Author', 'Abstract', 'Upload File', 'Submit'];

const Formulaire = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (stepData) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    console.log(formData);
     // Envoyer les données au backend en utilisant fetch
     fetch('http://localhost:5000/article_information', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse du backend :', data);
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi des données au backend :', error);
      });
  };

 

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Step1 onNext={handleNext} />;
      case 1:
        return <Step2 onPrev={handleBack} onNext={handleNext} />;
      case 2:
        return <Step3 onPrev={handleBack} onNext={handleNext} />;
      case 3:
        return <Step4 onPrev={handleBack} onNext={handleNext} />;
      case 4:
        return <Step5 onPrev={handleBack} onNext={handleNext} />;
      case 5:
        return <Step6 onPrev={handleBack} onFinish={handleFinish} />;
      default:
        return 'Étape inconnue';
    }
  };

  return (
    <Container component="main" maxWidth="sm"> {/* Ajustez maxWidth ici */}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={3}>{getStepContent(activeStep)}</Box>
      </Paper>
    </Container>
  );
};

export default Formulaire;
