import React, { useState } from 'react';
import { Grid, Text, Stack, Box, IconButton,Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'; // Import des icônes de modification et de suppression
import RecupEmail from './recupEmail';

function RecupEmailVerified() {

  const verifiedEmailNumbers = 'zakaria@gmail.com';
  
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleEdit = () => {
    setIsButtonClicked(true);
  };

  const handleDelete = (email) => {
    console.log(`Supprimer le numéro : ${email}`);
  };

  return (
    <Grid gap={4}>
      {!isButtonClicked ? (
        <>
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
        </>
      ):(
        <><RecupEmail setIsButtonClicked={setIsButtonClicked} /></>
      )}
    </Grid>
      
  );
}

export default RecupEmailVerified;
