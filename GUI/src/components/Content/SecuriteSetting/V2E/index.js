import React, { useState } from 'react';
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  List,
  Switch,
  FormControlLabel,
  Badge,
} from '@mui/material';
import { Grid } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import AppAuth from './appAuth';
import PhoneAuth from './phoneAuth';
import AppAuthVerified from './appAuthVerified';
import PhoneAuthVerified from './phoneAuthVerified';

function V2E() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isItemSelect, setIsItemSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [methodActivated, setMethodActivated] = useState({
    'App Authentication': false,
    'Phone Authentication': false,
  });

  const handleToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemSelect(true);
  };

  return (
    <Grid templateColumns="1fr" gap={4}>
      {!isItemSelect ? (
        <>
          <Grid>
            <FormControlLabel
              control={<Switch checked={twoFactorEnabled} onChange={handleToggle} />}
              label="Two-Factor Authentication"
            />
          </Grid>
          {twoFactorEnabled && (
            <Grid>
              <List sx={{ p: 2, maxWidth: 'sm', borderWidth: '1px', borderRadius: 'lg', overflow: 'hidden' }}>
                <ListItemButton
                  onClick={() => {
                    handleItemClick('App Authentication');
                    setMethodActivated((prevState) => ({
                      ...prevState,
                      'App Authentication': !prevState['App Authentication'],
                    }));
                  }}
                  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', p: 2 }}
                >
                  <ListItemText>App Authentication</ListItemText>
                  <ListItemIcon>
                    {methodActivated['App Authentication'] && (
                      <Badge colorScheme="green">Activée</Badge>
                    )}
                    <ChevronRightIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    handleItemClick('Phone Authentication');
                    setMethodActivated((prevState) => ({
                      ...prevState,
                      'Phone Authentication': !prevState['Phone Authentication'],
                    }));
                  }}
                  sx={{ p: 2 }}
                >
                  <ListItemText>Phone Authentication</ListItemText>
                  <ListItemIcon>
                    {methodActivated['Phone Authentication'] && (
                      <Badge colorScheme="green">Activée</Badge>
                    )}
                    <ChevronRightIcon />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            </Grid>
          )}
        </>
      ) : (
        <>
          <Grid>
            {selectedItem === 'App Authentication' ? (
              methodActivated[selectedItem] ? (
                <AppAuth setIsItemSelect={setIsItemSelect} />
              ) : (
                <AppAuthVerified setIsItemSelect={setIsItemSelect} />
              )
            ) : (
              methodActivated[selectedItem] ? (
                <PhoneAuth setIsItemSelect={setIsItemSelect} />
              ) : (
                <PhoneAuthVerified setIsItemSelect={setIsItemSelect} />
              )
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default V2E;
