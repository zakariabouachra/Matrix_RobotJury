import React, { useState } from 'react';
import { Grid, Text, Stack, Box, IconButton, Modal,
   ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody,Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'; // Import des icônes de modification et de suppression
import  RecupTel  from './recupTelephone'; // Assurez-vous que votre composant est correctement importé

function RecupTelVerified() {

  const verifiedPhoneNumbers = '(+1)5144356000';
  
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleDelete = (phoneNumber) => {
    console.log(`Supprimer le numéro : ${phoneNumber}`);
  };

  return (
    <Grid gap={4}>
        <Box borderWidth="1px" borderRadius="lg" p={4} position="relative">
          <Stack direction="column" spacing={2}>
            <Text fontWeight="bold">{verifiedPhoneNumbers}</Text>
            <Text fontSize="sm" color="green.500">
              Validé.
            </Text>
            <Text fontSize="sm">Les codes sont envoyés par SMS.</Text>
          </Stack>
          <Flex position="absolute" top="5px" right="5px">
            <IconButton
              aria-label="Modifier"
              icon={<EditIcon />}
              onClick={handleEdit}
              variant="ghost"
              colorScheme="blue"
              bg="white"
              color="black"
              _hover={{ bg: "white", color: "blue" }}
            />
            <IconButton
              aria-label="Supprimer"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(verifiedPhoneNumbers)}
              variant="ghost"
              colorScheme="red"
              bg="white"
              color="black"
              _hover={{ bg: "white", color: "red" }}
            />
          </Flex>
        </Box>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Numéro de téléphone de récupération</ModalHeader>
          <ModalCloseButton />
          <ModalBody><RecupTel setIsOpen={setIsOpen}  /></ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
}

export default RecupTelVerified;
