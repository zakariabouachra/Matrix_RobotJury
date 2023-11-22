import React, { useRef, useState } from 'react';
import { Typography, Button, Grid, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Step5 = ({ onPrev, onNext }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const isFormValid = () => {
    return selectedFile !== null;
  };

  const handleNextStep = () => {
    // Vérifiez si le formulaire de l'étape est valide avant de passer à l'étape suivante
    if (isFormValid()) {
      // Créer un objet formData avec les données du fichier
      const formData = { selectedFile };

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
        <Typography variant="subtitle1">Téléchargez votre article (PDF) :</Typography>
      </Grid>
      <Grid item container alignItems="center" xs={12}>
        <Grid item xs={11}>
          {selectedFile && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography>{selectedFile.name}</Typography>
              <IconButton onClick={handleRemoveFile} color="secondary">
                <ClearIcon />
              </IconButton>
            </div>
          )}
        </Grid>
        <Grid item xs={1}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
          <IconButton onClick={() => fileInputRef.current.click()} color="primary">
            <Typography>Sélectionner</Typography>
          </IconButton>
        </Grid>
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

export default Step5;
