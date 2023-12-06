import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const Step1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    contributionTitle: '',
    institution: '',
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleChange = event => {
    const { id, value } = event.target;
    const updatedFormData = {
      ...formData,
      [id]: value,
    };
    setFormData(updatedFormData);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const checkTitleExists = () => {
    const articlesData = JSON.parse(localStorage.getItem('articlesData') || '[]');
    const titleExists = articlesData.some(article => article.title === formData.contributionTitle);

    if (titleExists) {
      setShowDialog(true);
    } else {
      handleNextStep();
    }
  };

  const handleDialogClose = (continueAnyway) => {
    setShowDialog(false);
    if (continueAnyway) {
      handleNextStep();
    }
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
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Étape 1</Typography>
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
              onClick={checkTitleExists}
              disabled={!isFormValid()}
            >
              Suivant
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={showDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <IconButton color="secondary" aria-label="warning">
            <WarningIcon />
          </IconButton>
          {" Avertissement"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ce titre existe déjà. Voulez-vous continuer quand même ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Non
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="error" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Step1;
