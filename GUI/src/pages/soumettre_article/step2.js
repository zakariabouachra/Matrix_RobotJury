import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box } from '@mui/material';

const Step2 = ({ onPrev, onNext }) => {
  const [formData, setFormData] = useState({
    contributionTitle: '',
    trackPreference: '',
    mainTopic: '',
    contributionType: '',
    contentType: '',
    robotVerification: '',
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
        <Typography variant="h6">Étape 2</Typography>
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
          id="trackPreference"
          select
          label="Track preference"
          fullWidth
          required
          value={formData.trackPreference}
          onChange={handleChange}
        >
          <MenuItem value="0">
            IARIA Congress 2023 - General event track
          </MenuItem>

          {/* Ajoutez d'autres options au besoin */}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="mainTopic"
          select
          label="Main topic"
          fullWidth
          required
          value={formData.mainTopic}
          onChange={handleChange}
        >
          <MenuItem value="1">IARIA Congress 2023: Cloud </MenuItem>
          <MenuItem value="2">IARIA Congress 2023: Data </MenuItem>
          <MenuItem value="3">IARIA Congress 2023: Energy </MenuItem>
          <MenuItem value="4">IARIA Congress 2023: Health </MenuItem>
          <MenuItem value="5">IARIA Congress 2023: Human-machine </MenuItem>
          <MenuItem value="6">IARIA Congress 2023: Intelligence</MenuItem>
          <MenuItem value="7">IARIA Congress 2023: Internet</MenuItem>
          <MenuItem value="8">IARIA Congress 2023: Iot </MenuItem>
          <MenuItem value="9">IARIA Congress 2023: Learning </MenuItem>
          <MenuItem value="10">IARIA Congress 2023: Metaverse </MenuItem>
          <MenuItem value="11">IARIA Congress 2023: Mobility </MenuItem>
          <MenuItem value="12">IARIA Congress 2023: Multimedia</MenuItem>
          <MenuItem value="13">IARIA Congress 2023: Networks </MenuItem>
          <MenuItem value="14">IARIA Congress 2023: Robotics</MenuItem>
          <MenuItem value="15">IARIA Congress 2023: Security </MenuItem>
          <MenuItem value="16">IARIA Congress 2023:Sensors</MenuItem>
          <MenuItem value="17">IARIA Congress 2023: Signal</MenuItem>
          <MenuItem value="18">IARIA Congress 2023: Smart Cities </MenuItem>

        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionType"
          select
          label="Contribution type"
          fullWidth
          required
          value={formData.contributionType}
          onChange={handleChange}
        >
          <MenuItem value="1">regular paper [in the proceedings, digital library]</MenuItem>
          <MenuItem value="2">short paper (work in progress) [in the proceedings, digital library]</MenuItem>
          <MenuItem value="3">idea: two pages [in the proceedings, digital library]</MenuItem>
          <MenuItem value="4">extended abstract: two pages [in the proceedings, digital library]</MenuItem>
          <MenuItem value="5">poster! two pages [in the proceedings, digital library]</MenuItem>
          <MenuItem value="6">poster: slide only [slide-deck posted on www.iaria.org]</MenuItem>
          <MenuItem value="7">presentation: slide only [slide-deck posted on www.iaria.org]</MenuItem>
          <MenuItem value="8">demo: two pages [posted on www.iaria.org]</MenuItem>

        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contentType"
          select
          label="Content type"
          fullWidth
          required
          value={formData.contentType}
          onChange={handleChange}
        >
          <MenuItem value="1">Please select .</MenuItem>
          <MenuItem value="2">academic research</MenuItem>
          <MenuItem value="3">implementations and benchmarks industry report industry research</MenuItem>
          <MenuItem value="4">state of the art (surveys, studies, etc.)</MenuItem>

        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="robotVerification"
          label="To prove you are not a robot, solve 8 + 5 ="
          fullWidth
          required
          value={formData.robotVerification}
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

export default Step2;
