import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Button,
  Badge
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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  useEffect(() => {
    if (userDataObject?.email) {
      setEmail(userDataObject.email);
    }
    if (userDataObject?.phonenumber) {
      setPhoneNumber(userDataObject.phonenumber);
    }
    if(userDataObject?.phone_verified == true){
      setIsPhoneNumberVerified(true);
    }
    if(userDataObject?.email_verified == true){
      setIsEmailVerified(true);
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
      <Stack direction="row" alignItems="center">
        <FormControl id="email" flex="1">
          <FormLabel>Email Address</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="email"
            placeholder="info@matrix.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        {isEmailVerified ? (
          <Badge colorScheme="green" ml={2}>
            Verified
          </Badge>
        ) : (
          <Badge colorScheme="red" ml={2}>
            Not Verified
          </Badge>
        )}
      </Stack>
      <Stack direction="row" alignItems="center">
        <FormControl id="phoneNumber" flex="1">
          <FormLabel>Phone Number</FormLabel>
          <PhoneInput
            defaultCountry="ca"
            value={phoneNumber}
            onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
        </FormControl>
        {isPhoneNumberVerified ? (
          <Badge colorScheme="green" ml={2}>
            Verified
          </Badge>
        ) : (
          <Badge colorScheme="red" ml={2}>
            Not Verified
          </Badge>
        )}
      </Stack>
      <Button
          colorScheme="blue"
          onClick={handleUpdate}
          isDisabled={!isValid || email.trim() === ''}
        >
          Save Update
        </Button>
    </Grid>

  );
}

export default CoordonneSettings;
