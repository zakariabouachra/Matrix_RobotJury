import React, { useState } from 'react';
import {
  Input,
  Box,
  Text,
  Link
} from '@chakra-ui/react';

import {Button} from '@mui/material';



function VerifyPhone({phoneNumber}) {
    const [code, setCode] = useState('');

    const handleCodeChange = (event) => {
        setCode(event.target.value);
      };

    const handleVerifyCode = () => {
    alert('Code validated!');
    };
    

    return(
    <Box>
        <Text>
            Saisissez le code à six chiffres envoyé au numéro de téléphone {phoneNumber}.
            Vous ne trouvez pas le numéro de téléphone ?{' '}
            <Link
            color="blue.500"
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
            >
            Envoyer un nouveau code
            </Link>
        </Text>
        <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Code de validation"
            value={code}
            onChange={handleCodeChange}
        />
        <Box mt={4} display="flex" alignItems="center" justifyContent="flex-end">
        <Button
            onClick={handleVerifyCode}
            variant="contained"
            disableElevation
            disabled={code.trim() === ''}
            sx={{
                borderRadius: '50px', // Pour obtenir une forme arrondie similaire à 'borderRadius="full"'
                color:'white',
                width: 'auto',
                '&:hover': {
                bgcolor: 'brand.blue', // Couleur d'arrière-plan au survol
                },
                '&:active': {
                bgcolor: 'brand.blue', // Couleur d'arrière-plan lorsqu'il est actif
                },
            }}
            >
            Valider le code
        </Button>
        </Box>
        </Box>
    );
}


export default VerifyPhone;
