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
import CardPayment from './cardPayment'
import Paypal from './Paypal'



function PaiementSetting() {
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
    'Card Payment': (
      <CardPayment/>
    ),
    'Paypal Payment': (
        <Paypal/>
      )
 };

 return (
    <Grid>
        <List sx={{ p: 3, maxWidth: 'sm', borderWidth: '1px', borderRadius: 'lg', overflow: 'hidden' }}>
            <ListItemButton
            onClick={() => handleItemClick('Card Payment')}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', p: 2 }}          >
            <ListItemText>Card Payment</ListItemText>
            <ListItemIcon sx={{ fontWeight: 'bold', fontSize: '1.2em' }} >
                <ChevronRightIcon />
            </ListItemIcon>
            </ListItemButton>
            <ListItemButton
            onClick={() => handleItemClick('Paypal Payment')}
            sx={{p: 2 }}          >
            <ListItemText>Paypal Payment</ListItemText>
            <ListItemIcon sx={{ fontWeight: 'bold', fontSize: '1.2em' }} >
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

export default PaiementSetting;