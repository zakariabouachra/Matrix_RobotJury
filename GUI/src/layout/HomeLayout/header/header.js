import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from 'components/Logo';

function Header() {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>

        <Box sx={{ marginRight: '27px' }}>
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            variant="outlined"
            startIcon={<LockOutlinedIcon />}
            sx={{
              fontSize: '16px',
              borderRadius: '20px',
              borderColor: '#2196F3',
              '&:hover': {
                borderColor: '#1565C0',
              },
            }}
          >
            Se connecter
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
