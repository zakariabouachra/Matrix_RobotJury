import React, { useState } from 'react';
import {
  Grid,
  Text,
  Input,
  Stack,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
  Link,
  Button,
  IconButton,
  Box
} from '@chakra-ui/react';

import {  ArrowBackIcon  } from '@chakra-ui/icons'; 
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};



function RecupTel({setIsButtonClicked}) {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');


  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };



  const handleGoBack = () => {
    setIsButtonClicked(false);
  };

  const handleVerifyCode = () => {
    setIsButtonClicked(false);
    alert('Code validated!');
  };

  const handleGoPrecedent = () => {
    setIsCodeSent(false);
  }

  const isValid = isPhoneValid(phoneNumber);

  return (
    <Grid gap={4}>
      {!isCodeSent ? (
        <>
          <Text>Saisissez un numéro de téléphone :</Text>
          <Stack direction="row" alignItems="center">
            <PhoneInput
              defaultCountry="ca"
              value={phoneNumber}
              onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
          </Stack>
          <UnorderedList>
            <ListItem>Matrix utilisera ce numéro pour vous aider à récupérer votre compte.</ListItem>
            <ListItem>Votre opérateur peut appliquer des frais.</ListItem>
          </UnorderedList>
          <Stack spacing={4}>
            <Alert status="warning">
              <AlertIcon />
              Assurez-vous de fournir un numéro de téléphone valide.
            </Alert>
          </Stack>
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
            <Button
                onClick={handleSendCode}
                borderRadius="full"
                width="auto"
                _hover={{ bg: 'brand.blue' }}
                _active={{ bg: 'brand.blue' }}
                isDisabled={!isValid}
              >
                Envoyer un nouveau code
            </Button>
        </Box>
        </>
      ) : (
        <>
          <Text>
            Saisissez le code à six chiffres envoyé au numéro de téléphone {phoneNumber}.
            Vous ne trouvez pas le numéro de téléphone ?{' '}
            <Link
            onClick={() => setIsCodeSent(false)}
            color="blue.500"
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            Envoyer un nouveau code
          </Link>
          </Text>
          <Text>Code de validation</Text>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Code de validation"
            value={code}
            onChange={handleCodeChange}
          />
          <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
            <IconButton
              aria-label="Retour"
              icon={<ArrowBackIcon />}
              onClick={handleGoPrecedent}
              variant="ghost"
              colorScheme="gray"
              bg="white" 
              color="black" 
            />
            <Button
              onClick={handleVerifyCode}
              borderRadius="full"
              width="auto"
              _hover={{ bg: 'brand.blue' }}
              _active={{ bg: 'brand.blue' }}
              isDisabled={code.trim() === ''}
            >
              Valider le code
            </Button>
        </Box>
        </>
      )}
    </Grid>
  );
}

export default RecupTel;
