// material-ui
import { Grid } from '@mui/material';
import SoumissionForm from './formulaire'; 

const SoumettreArticles = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} sx={{ mb: 5 }}>
        <SoumissionForm /> 
      </Grid>
    </Grid>
  );
};

export default SoumettreArticles;
