import React, { useRef, useState } from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';

const Step5 = ({ onPrev, onNext }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const isFormValid = () => {
    return selectedFile !== null;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Téléchargez votre article (PDF) :</Typography>
      </Grid>
      <Grid item xs={12}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <Button variant="contained" onClick={() => fileInputRef.current.click()}>
          Sélectionner un fichier PDF
        </Button>
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

export default Step5;
