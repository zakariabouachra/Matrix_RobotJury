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
import Select from 'react-select';

import {  ArrowBackIcon  } from '@chakra-ui/icons'; 


import countryCodes from '../countries.json';

function RecupTel({setIsButtonClicked}) {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const countryOptions = countryCodes.map((country) => ({
    value: country.dialCode,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={country.flag} alt={country.isoCode} width="20" style={{ marginRight: '8px' }} />
        {country.name} ({country.dialCode})
      </div>
    ),
  }));

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

  return (
    <Grid gap={4}>
      {!isCodeSent ? (
        <>
          <Text>Saisissez un numéro de téléphone :</Text>
          <Stack direction="row" alignItems="center">
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              options={countryOptions}
              placeholder="Choisissez un pays"
              style={{ width: '200px' }}
            />
            <Input
              focusBorderColor="brand.blue"
              type="tel"
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              style={{ flex: 1 }}
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
                isDisabled={!selectedCountry || phoneNumber.trim() === ''}
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
