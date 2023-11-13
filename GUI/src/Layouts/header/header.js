import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import the Button component from MUI
import AdbIcon from '@mui/icons-material/Adb';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', color: 'white' }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
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
