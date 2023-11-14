import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/images/background-contact.jpg';
import Header from '../../layout/HomeLayout/header';
import Footer from '../../layout/HomeLayout/footer';
import Contact from '../contact/contact';
import About from '../about/about';
import Slide from '@mui/material/Slide'; // Import the Slide component
import { styled } from '@mui/system';

const AnimatedBackground = styled(Box)({
  transition: 'background-color 0.1s ease',
});

const AnimatedButton = styled(Button)({
  transition: 'background-color 0.1s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#0d47a1',
    transform: 'translateY(-2px)',
  },
});



function Accueil() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [contactvisible, setContactVisible] = useState(false);


  const handleScroll = () => {
    setScrollPosition(window.scrollY);

    // Adjust the scroll value as needed
    setAboutVisible(window.scrollY > 200);
    setContactVisible(window.scrollY > 700);

  };

  window.addEventListener('scroll', handleScroll);

  return (
    <Box>
      <AnimatedBackground
        sx={{
          position: 'relative',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          backgroundColor: scrollPosition < 300 ? '#1a237e' : '#0d47a1',
        }}
      >
        <Header />
        <Slide in={scrollPosition < 500} direction="up" timeout={500}>
          <Box
            sx={{
              mt: 'auto',
              p: 4,
              maxWidth: 600,
              textAlign: 'left',
            }}
          >
            <Typography
              variant="h1"
              fontWeight="bold"
              letterSpacing="2px"
              textTransform="uppercase"
              mb={2}
              textAlign="left"
            >
              Bienvenue sur notre plateforme de soumission d&rsquo;articles scientifiques
            </Typography>
            <Typography
              variant="h2"
              fontSize="1.2rem"
              lineHeight="1.6"
              mb={3}
              textAlign="left"
            >
              Ce projet vise à créer une plateforme web facilitant la soumission, la validation d&rsquo;articles scientifiques, et l&rsquo;enregistrement des chercheurs avec un système de paiement intégré après l&rsquo;acceptation de l&rsquo;article.
            </Typography>
            <AnimatedButton
              component={Link}
              to="/login"
              variant="contained"
              textAlign="left"
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                letterSpacing: '1px',
                fontSize: '1.2rem',
                padding: '12px 30px',
                backgroundColor: '#1a237e',
              }}
            >
              Soumettre un article
            </AnimatedButton>
          </Box>
        </Slide>
      </AnimatedBackground>
      <Slide in={aboutVisible} direction="up" timeout={700}>
        <Box>
          <About />
        </Box>
      </Slide>
      <Slide in={contactvisible} direction="left" timeout={700}>

      <Box>
        <Contact />
      </Box>
      </Slide>

      <Footer />
    </Box>
  );
}

export default Accueil;
