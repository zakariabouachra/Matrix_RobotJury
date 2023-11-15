import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FaxIcon from '@mui/icons-material/Fax';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';

const AnimatedBox = styled(Box)({
  animation: 'fadeInUp 0.5s ease-in-out',
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

const SlideBox = styled(Slide)({
  transition: 'opacity 0.5s ease',
});

const Contact = () => {
  const location = [37.7749, -122.4194];

  return (
    <SlideBox direction="up" in={true}>
      <AnimatedBox>
        <Box
          sx={{
            background: '#fff',
            color: 'white',
            textAlign: 'center',
            py: 10,
            backgroundColor: 'rgb(28, 37, 54)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Contact Informations
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Feel free to reach out to us for any inquiries or assistance.
          </Typography>
          <Typography variant="body1">
            Whether you have questions about our services, need technical support,
            or simply want to connect, we are here to help. Please dont hesitate
            to contact us via the details provided below.
          </Typography>
        </Box>

        <Box sx={{ background: '#f0f0f0', p: 4 }}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SlideBox direction="left" in={true} timeout={500}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Contact Information
                  </Typography>
                </SlideBox>
                <SlideBox direction="left" in={true} timeout={500}>
                  <Card sx={{ mb: 2, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                      <PhoneIcon />
                      <Typography variant="body1">
                        Phone Number: (514) 456-8755
                      </Typography>
                    </CardContent>
                  </Card>
                </SlideBox>
                <SlideBox direction="left" in={true} timeout={1000}>
                  <Card sx={{ mb: 2, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                      <EmailIcon />
                      <Typography variant="body1">
                        Email: info_matrix@gmail.com
                      </Typography>
                    </CardContent>
                  </Card>
                </SlideBox>
                <SlideBox direction="left" in={true} timeout={1500}>
                  <Card sx={{ mb: 2, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                      <FaxIcon />
                      <Typography variant="body1">
                        Fax: (123) 456-7891
                      </Typography>
                    </CardContent>
                  </Card>
                </SlideBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SlideBox direction="right" in={true}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Contactez-nous
                  </Typography>
                </SlideBox>
                <SlideBox direction="right" in={true} timeout={500}>
                  <form
                    style={{
                      backgroundColor: '#fff',
                      padding: '30px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <TextField
                      label="Nom"
                      variant="outlined"
                      fullWidth
                      mb={2}
                      required
                    />
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      mb={2}
                      required
                    />
                    <TextField
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      mb={2}
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Envoyer
                    </Button>
                  </form>
                </SlideBox>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <SlideBox direction="up" in={true}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Find us on Leaflet Map
            </Typography>
          </SlideBox>
          <MapContainer
            center={location}
            zoom={15}
            style={{ width: '100%', height: '400px', alignContent: 'center' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location} />
          </MapContainer>
        </Box>
      </AnimatedBox>
    </SlideBox>
  );
};

export default Contact;
