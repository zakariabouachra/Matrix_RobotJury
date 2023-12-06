import {
    Grid
  } from '@mui/material';
import ArticlesPage from './articlePage';

const Articles = () => {
    return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <ArticlesPage/>
        </Grid>
      </Grid>
    );
  };
  
  export default Articles;
  