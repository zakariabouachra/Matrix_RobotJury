import React, { useState } from 'react';
import { Grid, Text, Stack, Box, IconButton, Modal,
   ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody,Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'; // Import des icônes de modification et de suppression
import RecupEmail from './recupEmail';

function RecupEmailVerified() {

  const verifiedEmailNumbers = 'zakaria@gmail.com';
  
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleDelete = (email) => {
    console.log(`Supprimer le numéro : ${email}`);
  };

  return (
    <Grid gap={4}>
        <Box borderWidth="1px" borderRadius="lg" p={4} position="relative">
          <Stack direction="column" spacing={2}>
            <Text fontWeight="bold">{verifiedEmailNumbers}</Text>
            <Text fontSize="sm" color="green.500">
              Validé.
            </Text>
            <Text fontSize="sm">Les codes sont envoyés par email.</Text>
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
              onClick={() => handleDelete(verifiedEmailNumbers)}
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
          <ModalHeader>Adresse e-mail de récupération</ModalHeader>
          <ModalCloseButton />
          <ModalBody><RecupEmail setIsOpen={setIsOpen}  /></ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
}

export default RecupEmailVerified;
