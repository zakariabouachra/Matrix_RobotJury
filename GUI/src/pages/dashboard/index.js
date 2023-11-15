
// material-ui
import {
  Box,
  Grid,
  Typography
} from '@mui/material';

// project import
import RecentArticle from './ArticleRecent';
import ArticleChart from './ArticleChart';
import MainCard from 'components/MainCard';
import AnalyticArticle from './AnalyticArticle';



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article publier" count="5" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article en cours de verification" count="4"  />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article verifier" count="2" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article refuser" count="1"  />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5"></Typography>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <ArticleChart />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Article Recent</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <RecentArticle />
        </MainCard>
      </Grid>

      </Grid>
  );
};

export default DashboardDefault;
