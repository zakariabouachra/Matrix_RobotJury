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
import {
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import AppAuth from './appAuth';
import PhoneAuth from './phoneAuth';
import AppAuthVerified from './appAuthVerified';
import PhoneAuthVerified from './phoneAuthVerified';

function V2E() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalV2EOpen, setIsModalV2EOpen] = useState(false);
  const [methodActivated, setMethodActivated] = useState({
    'App Authentication': false,
    'Phone Authentication': false,
  });

  const handleToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalV2EOpen(true);
  };

  const closeModal = () => {
    setSelectedItem('');
    setIsModalV2EOpen(false);
  };

  const modalContent = {
    'App Authentication': methodActivated['App Authentication'] ? (
      <AppAuth setIsModalV2EOpen={setIsModalV2EOpen} />
    ) : (
      <AppAuthVerified setIsModalV2EOpen={setIsModalV2EOpen} />
    ),
    'Phone Authentication': methodActivated['Phone Authentication'] ? (
      <PhoneAuth setIsModalV2EOpen={setIsModalV2EOpen} />
    ) : (
      <PhoneAuthVerified setIsModalV2EOpen={setIsModalV2EOpen} />
    ),
  };

  return (
    <Grid templateColumns="1fr" gap={4}>
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

          <Modal isOpen={isModalV2EOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedItem}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{modalContent[selectedItem]}</ModalBody>
            </ModalContent>
          </Modal>
        </Grid>
      )}
    </Grid>
  );
}

export default V2E;
