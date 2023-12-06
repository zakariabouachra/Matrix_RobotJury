// material-ui
import { Grid , Typography} from '@mui/material';
import SoumissionForm from './formulaire'; 

const SoumettreArticles = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} sx={{ mb: 5 }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Soumettre un article</Typography>
        <SoumissionForm /> 
      </Grid>
    </Grid>
  );
};

export default SoumettreArticles;
