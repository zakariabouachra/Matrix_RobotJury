import { useState } from 'react';
import {
 Grid,
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalBody,
 ModalCloseButton,
} from '@chakra-ui/react';
import { ListItemButton, ListItemText, ListItemIcon, List } from '@mui/material';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Mots2passe from './mots2passe'
import V2E from './V2E'
import RecupEmail from './recupAdresse'
import RecupTel from './recupTelephone'



function SecuriteSetting() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedItem, setSelectedItem] = useState('');

 const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
 };

 const closeModal = () => {
    setSelectedItem('');
    setIsModalOpen(false);
 };

 const modalContent = {
    'Mot de passe': (
      <Mots2passe setIsModalOpen={setIsModalOpen}/>
    ),
    'Validation en deux étapes': (
      <V2E setIsModalOpen={setIsModalOpen}/>
    ),
    'Numéro de téléphone de récupération': (
      <RecupTel setIsModalOpen={setIsModalOpen}/>
    ),
    'Adresse e-mail de récupération': (
      <RecupEmail setIsModalOpen={setIsModalOpen}/>
    ),
 };

 return (
    <Grid>
        <List sx={{ p: 3, maxWidth: 'sm', borderWidth: '1px', borderRadius: 'lg', overflow: 'hidden' }}>
            <ListItemButton
            onClick={() => handleItemClick('Mot de passe')}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', p: 2 }}          >
            <ListItemText>Mot de passe</ListItemText>
            <ListItemIcon sx={{ fontWeight: 'bold', fontSize: '1.2em' }} >
                <ChevronRightIcon />
            </ListItemIcon>
            </ListItemButton>
            <ListItemButton
            onClick={() => handleItemClick('Validation en deux étapes')}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', p: 2 }}
            >
            <ListItemText>Validation en deux étapes</ListItemText>
            <ListItemIcon sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                <ChevronRightIcon />
            </ListItemIcon>
            </ListItemButton>
            <ListItemButton
            onClick={() => handleItemClick('Numéro de téléphone de récupération')}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', p: 2 }}
            >
                <ListItemText>Numéro de téléphone de récupération</ListItemText>
                <ListItemIcon sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                    <ChevronRightIcon />
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton
            onClick={() => handleItemClick('Adresse e-mail de récupération')}
            sx={{ p: 2}}

            >
                <ListItemText>Adresse e-mail de récupération</ListItemText>
                <ListItemIcon sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                    <ChevronRightIcon />
                </ListItemIcon>
            </ListItemButton>
        </List>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedItem}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalContent[selectedItem]}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
 );
}

export default SecuriteSetting;