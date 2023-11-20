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
  const [userDataObject, setUserDataObject] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setUserDataObject(JSON.parse(userData));
  }, []);

  useEffect(() => {
    if (userDataObject?.email) {
      setEmail(userDataObject.email);
    }
    if (userDataObject?.phonenumber) {
      setPhoneNumber(userDataObject.phonenumber);
    }
  }, [userDataObject]);

  const handleUpdate = () => {
    const updatedData = {
      ...userDataObject,
      email: email,
      phonenumber: phoneNumber,
    };

    console.log(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
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
