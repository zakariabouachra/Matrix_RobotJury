import React, { useRef, useState } from 'react';
import { Typography, Button, Grid, Box, IconButton  } from '@mui/material';
import ClearIcon  from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Step5 = ({ onPrev, onNext }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    fileInputRef.current.value = null;
    setSelectedFile(null);
  };

  const isFormValid = () => {
    return selectedFile !== null;
  };

  const handleNextStep = () => {
    if (isFormValid()) {
      const formData = { selectedFile };
      onNext(formData);
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  };

  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Téléchargez votre article (PDF) :</Typography>
        </Grid>
        <Grid item xs={12}>
          {selectedFile && (
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <Typography style={{ marginRight: 'auto' }}>{selectedFile.name}</Typography>
              <IconButton onClick={handleRemoveFile} color="secondary">
                <ClearIcon />
              </IconButton>
            </div>
          )}
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            onClick={() => fileInputRef.current.click()}
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginRight: '10px' }}
          >
            Sélectionner
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
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

export default Step5;
