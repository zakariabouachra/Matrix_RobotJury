import React, { useState } from 'react';
import { Grid, Text, Stack, Box, IconButton,Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ArrowBackIcon  } from '@chakra-ui/icons'; // Import des icônes de modification et de suppression
import  AppAuth  from './appAuth'; // Assurez-vous que votre composant est correctement importé

function AppAuthVerified({setIsItemSelect}) {

  const verifiedApp = 'Google Authentificator';

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleEdit = () => {
    setIsButtonClicked(true);
  };

  const handleDelete = (verifiedApp) => {
    console.log(`Supprimer le numéro : ${verifiedApp}`);
  };

  const handleGoBack = () => {
    setIsItemSelect(false);
  };

  return (
    <Grid gap={4}>
      {!isButtonClicked ? (
        <>
        <Box borderWidth="1px" borderRadius="lg" p={4} position="relative">
          <Stack direction="column" spacing={2}>
            <Text fontWeight="bold">{verifiedApp}</Text>
            <Text fontSize="sm" color="green.500">
              Validé.
            </Text>
            <Text fontSize="sm">Plutôt qu&apos;un SMS, recevez un code de validation via une appli d&apos;authentification, même si votre téléphone est hors connexion.</Text>
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
              onClick={() => handleDelete(verifiedApp)}
              variant="ghost"
              colorScheme="red"
              bg="white"
              color="black"
              _hover={{ bg: "white", color: "red" }}
            />
          </Flex>
        </Box>
        <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
        <IconButton
          aria-label="Retour"
          icon={<ArrowBackIcon />}
          onClick={handleGoBack}
          variant="ghost"
          colorScheme="gray"
          bg="white" 
          color="black" 
        />
        </Box>
        </>
    ):(
        <><AppAuth setIsButtonClicked={setIsButtonClicked}  /></>
        )}
    </Grid>
  );
}

export default AppAuthVerified;
