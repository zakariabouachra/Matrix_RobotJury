import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box } from '@mui/material';

const Step2 = ({ onPrev, onNext }) => {
  const [trackPreference, setTrackPreference] = useState('');
  const [mainTopic, setMainTopic] = useState('');
  const [contributionType, setContributionType] = useState('');
  const [contentType, setContentType] = useState('');

  const isFormValid = () => {

    return trackPreference !== '' && mainTopic !== '' && contributionType !== '' && contentType !== '';

  };

  const handleTrackPreferenceChange = event => {
    setTrackPreference(event.target.value);
  };

  const handleMainTopicChange = event => {
    setMainTopic(event.target.value);
  };

  const handleContributionTypeChange = event => {
    setContributionType(event.target.value);
  };

  const handleContentTypeChange = event => {
    setContentType(event.target.value);
  };
  const handleNextStep = () => {
    if (isFormValid()) {
       // Créer un objet formData avec les valeurs actuelles
       const formData = {
        trackPreference,
        mainTopic,
        contributionType,
        contentType,
      };
      // Appeler la fonction onNext du composant supérieur (WizardForm) avec les données du formulaire de cette étape
      onNext(formData);
      console.log(formData)
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Étape 2</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="trackPreference"
          select
          label="Track preference"
          fullWidth
          required
          value={trackPreference}
          onChange={handleTrackPreferenceChange}
        >
           <MenuItem value="General event track">
            Matrix Scientifique Evolution - General event track
          </MenuItem>

        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="mainTopic"
          select
          label="Main topic"
          fullWidth
          required
          value={mainTopic}
          onChange={handleMainTopicChange}
        >
          <MenuItem value="Cloud">Matrix Scientifique Evolution: Cloud </MenuItem>
          <MenuItem value="Data">Matrix Scientifique Evolution: Data </MenuItem>
          <MenuItem value="Energy">Matrix Scientifique Evolution: Energy </MenuItem>
          <MenuItem value="Health">Matrix Scientifique Evolution: Health </MenuItem>
          <MenuItem value="Human-machin">Matrix Scientifique Evolution: Human-machine </MenuItem>
          <MenuItem value="Intelligence">Matrix Scientifique Evolution: Intelligence</MenuItem>
          <MenuItem value="Internet">Matrix Scientifique Evolution: Internet</MenuItem>
          <MenuItem value="Iot">Matrix Scientifique Evolution: Iot </MenuItem>
          <MenuItem value="Learning">Matrix Scientifique Evolution: Learning </MenuItem>
          <MenuItem value="Metaverse">Matrix Scientifique Evolution: Metaverse </MenuItem>
          <MenuItem value="Mobility">Matrix Scientifique Evolution: Mobility </MenuItem>
          <MenuItem value="Multimedia">Matrix Scientifique Evolution: Multimedia</MenuItem>
          <MenuItem value="Networks">Matrix Scientifique Evolution: Networks </MenuItem>
          <MenuItem value="Robotics">Matrix Scientifique Evolution: Robotics</MenuItem>
          <MenuItem value="Security">Matrix Scientifique Evolution: Security </MenuItem>
          <MenuItem value="Sensors">Matrix Scientifique Evolution:Sensors</MenuItem>
          <MenuItem value="Signal">Matrix Scientifique Evolution: Signal</MenuItem>
          <MenuItem value="Smart Cities">Matrix Scientifique Evolution: Smart Cities </MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contributionType"
          select
          label="Contribution type"
          fullWidth
          required
          value={contributionType}
          onChange={handleContributionTypeChange}
        >
          <MenuItem value="regular paper">regular paper [in the proceedings, digital library]</MenuItem>
          <MenuItem value="short paper">short paper (work in progress) [in the proceedings, digital library]</MenuItem>
          <MenuItem value="idea: two pages">idea: two pages [in the proceedings, digital library]</MenuItem>
          <MenuItem value="extended abstract">extended abstract: two pages [in the proceedings, digital library]</MenuItem>
          <MenuItem value="poster! two pages">poster! two pages [in the proceedings, digital library]</MenuItem>
          <MenuItem value="poster: slide only">poster: slide only [slide-deck posted on www.iaria.org]</MenuItem>
          <MenuItem value="presentation: slide only">presentation: slide only [slide-deck posted on www.iaria.org]</MenuItem>
          <MenuItem value="demo: two pages">demo: two pages [posted on www.iaria.org]</MenuItem>

        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="contentType"
          select
          label="Content type"
          fullWidth
          required
          value={contentType}
          onChange={handleContentTypeChange}
        >
          <MenuItem value="academic research">academic research</MenuItem>
          <MenuItem value="implementations and benchmarks industry report industry researc">implementations and benchmarks industry report industry research</MenuItem>
          <MenuItem value="state of the art">state of the art (surveys, studies, etc.)</MenuItem>

        </TextField>
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

export default Step2;
