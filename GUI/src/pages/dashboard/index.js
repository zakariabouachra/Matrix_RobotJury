import React, { useState, useEffect } from 'react';

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

  const [articlesData, setArticlesData] = useState([]);


  const fetchArticlesData = async () => {
    try {
      const requestOptions = {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
  
      const response = await fetch('http://localhost:5000/articles', requestOptions);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles');
      }
      const data = await response.json();
      setArticlesData(data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticlesData();
  }, []);

  const publishedArticles = articlesData.filter(article => article.status === 'Published').length;
  const verifyingArticles = articlesData.filter(article => article.status === 'Verified').length;
  const rejectedArticles = articlesData.filter(article => article.status === 'Rejected').length;
  const inProgressArticles = articlesData.filter(article => article.status === 'In process').length;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article Published" count={publishedArticles.toString()} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article In process" count={inProgressArticles.toString()}  />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article Verified" count={verifyingArticles.toString()} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticArticle title="Total article Rejected" count={rejectedArticles.toString()}  />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={7}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5"></Typography>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <ArticleChart articlesData={articlesData}/>
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={5}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Article Recent</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <RecentArticle articlesData={articlesData}/>
        </MainCard>
      </Grid>

      </Grid>
  );
};

export default DashboardDefault;
