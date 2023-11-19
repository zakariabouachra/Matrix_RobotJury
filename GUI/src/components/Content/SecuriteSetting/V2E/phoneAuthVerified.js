import React, {useState} from 'react';
import { Grid, Text, Stack, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'; // Import de l'icône de poubelle
import {Button} from '@mui/material';

import PhoneAuth from './phoneAuth';


function PhoneAuthVerified() {
  const verifiedPhoneNumbers = ['+1234567890', '+9876543210'];
  const [isButtonClicked, setIsButtonClicked] = useState(false);


 
  const handleAddAnother = () => {
    setIsButtonClicked(true);
  };

  const handleDelete = (phoneNumber) => {
    // Logique pour supprimer le numéro
    console.log(`Supprimer le numéro : ${phoneNumber}`);
  };

  return (
    
    <Grid gap={4}>
    {!isButtonClicked ? (
        <>
      {verifiedPhoneNumbers.map((number) => (
        <Box key={number} borderWidth="1px" borderRadius="lg" p={4} position="relative">
          <Stack direction="column" spacing={2}>
            <Text fontWeight="bold">{number}</Text>
            <Text fontSize="sm" color="green.500">
              Validé.
            </Text>
            <Text fontSize="sm">Les codes sont envoyés par SMS.</Text>
          </Stack>
          <IconButton
            aria-label="Supprimer"
            icon={<DeleteIcon />}
            onClick={() => handleDelete(number)}
            position="absolute"
            top="5px"
            right="5px"
            variant="ghost"
            colorScheme="red"
            bg="white" 
            color="black" 
            _hover={{bg:"white",color:"red"}}
          />
        </Box>
      ))}
      <Box mt={4}>
      <Button
        onClick={handleAddAnother}
        variant="contained"
        color="primary"
        style={{
          borderRadius: '20px', 
        }}
      >
        + Ajouter un téléphone secondaire
      </Button>
      </Box>
      </>
    ):(
        <><PhoneAuth setIsButtonClicked={setIsButtonClicked} /></>
    )}
    </Grid>
  );
}

export default PhoneAuthVerified;
