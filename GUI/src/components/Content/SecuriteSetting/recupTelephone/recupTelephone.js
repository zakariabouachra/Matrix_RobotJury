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
} from '@chakra-ui/react';
import Select from 'react-select';

import countryCodes from '../countries.json';

function RecupTel() {
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
    // Simule l'envoi du code en mettant juste le state isCodeSent à true
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

  const handleVerifyCode = () => {
    // Cette fonction simule la validation du code en affichant une alerte
    alert('Code validated!');
  };

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
          <Button
            onClick={handleSendCode}
            borderRadius="full"
            width="auto"
            _hover={{ bg: 'brand.blue' }}
            _active={{ bg: 'brand.blue' }}
            isDisabled={!selectedCountry}
          >
            Envoyer un nouveau code
          </Button>
        </>
      ) : (
        <>
          <Text>
            Saisissez le code à six chiffres envoyé au numéro de téléphone {phoneNumber}.
            Vous ne trouvez pas le numéro de téléphone ?{' '}
            <Link onClick={() => setIsCodeSent(false)}>Envoyer un nouveau code</Link>
          </Text>
          <Text>Code de validation</Text>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Code de validation"
            value={code}
            onChange={handleCodeChange}
          />
          <Button
            onClick={handleVerifyCode}
            borderRadius="full"
            width="auto"
            _hover={{ bg: 'brand.blue' }}
            _active={{ bg: 'brand.blue' }}
          >
            Valider le code
          </Button>
        </>
      )}
    </Grid>
  );
}

export default RecupTel;
