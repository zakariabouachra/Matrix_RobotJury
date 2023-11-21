import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';
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

function CoordonneSettings() {
  const userData = localStorage.getItem('userData');
  const [userDataObject, setUserDataObject] = useState(JSON.parse(userData || '{}'));
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (userDataObject?.email) {
      setEmail(userDataObject.email);
    }
    if (userDataObject?.phonenumber) {
      setPhoneNumber(userDataObject.phonenumber);
    }
  }, [userDataObject]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user_coordonnees/${userDataObject.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...userDataObject,
          email: email,
          phonenumber: phoneNumber,
        }),
      });

      if (response.status === 200) {
        const updatedUserData = {
          ...userDataObject,
          email: email || '',
          phonenumber: phoneNumber || '',
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserDataObject(updatedUserData);
        console.log('Données mises à jour avec succès !');
      } else {
        console.error('Erreur lors de la mise à jour des données');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de mise à jour:', error);
    }
  };

  const isValid = isPhoneValid(phoneNumber);

  return (
    <Grid gap={6}>
      <FormControl id="email">
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="info@matrix.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Stack direction="row" alignItems="center">
          <PhoneInput
            defaultCountry="ca"
            value={phoneNumber}
            onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
          <Button
            colorScheme="blue"
            onClick={handleUpdate}
            isDisabled={!isValid || email.trim() === ''}
          >
            Save Update
          </Button>
        </Stack>
      </FormControl>
    </Grid>
  );
}

export default CoordonneSettings;
