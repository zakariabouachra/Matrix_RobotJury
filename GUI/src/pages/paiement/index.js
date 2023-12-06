import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider
} from '@mui/material';
import Paypal from './Paypal';

const CheckoutPage = ({articleId}) => {
  const orderTotal = 42.00;

  
  const orderInfo = {
    subtotal: 38.00,
    tax: 4.00
  };

  // Rechercher les informations de l'article dans le localStorage
  const articlesData = JSON.parse(localStorage.getItem('articlesData'));
  const article = articlesData.find(a => a.id === articleId);

  return (
    <Container>
        <Grid item xs={12} >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h3">Titre: {article.title}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body">Numero de contribution: {article.nocontribution}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography>Subtotal: ${orderInfo.subtotal.toFixed(2)}</Typography>
              <Typography>Tax: ${orderInfo.tax.toFixed(2)}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5">Order Total: ${orderTotal.toFixed(2)}</Typography>
              <Divider sx={{ my: 2 }} />
              <Paypal/>
            </CardContent>
          </Card>
        </Grid>
    </Container>
  );
};

export default CheckoutPage;
