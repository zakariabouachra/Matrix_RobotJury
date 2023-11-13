import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'; // Import the Button component from MUI
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'components/Logo'

function Header() {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', color: 'white' }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>

        {/* Use MUI Button for the "Se connecter" link styled as a button */}
        <Button component={RouterLink} to="/login" color="inherit" variant="text">
          Se connecter
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
