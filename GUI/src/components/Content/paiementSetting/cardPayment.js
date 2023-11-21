import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { FormControl, FormLabel, Grid, Input, Button, Box, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function PaiementSetting() {
  const userData = localStorage.getItem('userData');
  const [userDataObject, setUserDataObject] = useState(JSON.parse(userData || '{}'));
  const [showAddCardForm, setShowAddCardForm] = useState(true);
  const [newCardDetails, setNewCardDetails] = useState({
    focused: '',
    cardHolderName: '',
    creditCardNumber: '',
    expirationDate: '',
    securityCode: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    cardNumber: false,
    cardHolderName: false,
    expirationDate: false,
    securityCode: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCardDetails({ ...newCardDetails, [id]: value });
    validateField(id, value);
  };

  const validateField = (id, value) => {
    if (id === 'creditCardNumber') {
      const validPrefixes = /^(5|4|65|62|34|35|36|37)/;
      const isValid = value.length === 16 && validPrefixes.test(value);
      setValidationErrors({ ...validationErrors, cardNumber: !isValid });
    } else if (id === 'cardHolderName') {
      // Validation pour le nom du titulaire de la carte
      const containsNumbers = /\d/.test(value);
      const containsSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValid = value.trim() !== '' && !containsNumbers && !containsSpecialCharacters;
      setValidationErrors({ ...validationErrors, cardHolderName: !isValid });
    } else if (id === 'expirationDate') {
      // Validation pour la date d'expiration
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentYearFirstTwoDigits = parseInt(currentYear.toString().slice(0, 2), 10);
      const expirationMonth = parseInt(value.slice(0, 2), 10);
      const expirationYear = parseInt(value.slice(2), 10);
      const fullExpirationYear = currentYearFirstTwoDigits * 100 + expirationYear;
      const isMonthValid = expirationMonth >= 1 && expirationMonth <= 12;
      const isYearValid = fullExpirationYear >= currentYear && fullExpirationYear <= currentYear + 6;
      const isValid = isMonthValid && isYearValid;
      setValidationErrors({ ...validationErrors, expirationDate: !isValid });
    } else if (id === 'securityCode') {
      // Validation pour le code de sécurité
      const isValid = /^\d{3}$/.test(value);
      setValidationErrors({ ...validationErrors, securityCode: !isValid });
    }
  };

  const handleInputFocus = (e) => {
    setNewCardDetails({ ...newCardDetails, focused: e.target.name });
  };

  const handleSaveNewCard = () => {
    setShowAddCardForm(false);
    const updatedData = {
      ...userDataObject,
      name_card: newCardDetails.cardHolderName,
      credit_number: newCardDetails.creditCardNumber,
      expiration_date: newCardDetails.expirationDate,
      cvv: newCardDetails.securityCode,
    };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    setUserDataObject(updatedData);
  };

  const handleRemoveCard = () => {
    const updatedData = {
      ...userDataObject,
      name_card: null,
      credit_number: null,
      expiration_date: null,
      cvv: null,
    };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    setUserDataObject(updatedData);
    setNewCardDetails({
      focused: '',
      cardHolderName: '',
      creditCardNumber: '',
      expirationDate: '',
      securityCode: '',
    });
    setShowAddCardForm(true);
  };

  const isFormValid = () => {
    return (
      newCardDetails.creditCardNumber.length === 16 &&
      !validationErrors.cardNumber &&
      !validationErrors.cardHolderName &&
      !validationErrors.expirationDate &&
      !validationErrors.securityCode
    );
  };

  return (
    <Box mt={8}>
      {userDataObject && userDataObject.credit_number ? (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }} gap={6}>
          <Box border="1px dashed black" p={4}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Cards
                expiry={userDataObject.expiration_date || ''}
                name={userDataObject.name_card || ''}
                number={userDataObject.credit_number ? userDataObject.credit_number.slice(0, 4) + '*'.repeat(userDataObject.credit_number.length - 8) + userDataObject.credit_number.slice(-4) : ''}
              />
              <IconButton
                icon={<DeleteIcon />}
                variant="outline"
                colorScheme="red"
                aria-label="Remove Card"
                onClick={handleRemoveCard}
              />
            </Box>
          </Box>
        </Grid>
      ) : null}
      {!userDataObject.credit_number ? (
        <>
          {showAddCardForm ? (
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }} gap={6}>
              <Cards
                cvc={newCardDetails.securityCode}
                expiry={newCardDetails.expirationDate}
                focused={newCardDetails.focused}
                name={newCardDetails.cardHolderName}
                number={newCardDetails.creditCardNumber}
              />
              <Box display="grid" gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }} gap={4}>
                <FormControl id="creditCardNumber">
                  <FormLabel>Credit Card Number</FormLabel>
                  <Input
                    focusBorderColor="brand.blue"
                    type="tel"
                    id="creditCardNumber"
                    name="number"
                    value={newCardDetails.creditCardNumber}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Enter credit card number"
                    isInvalid={validationErrors.cardNumber}
                  />
                  {validationErrors.cardNumber && <Text color="red">Invalid Credit Card Number</Text>}
                </FormControl>
                <FormControl id="cardHolderName">
                  <FormLabel>Cardholder Name</FormLabel>
                  <Input
                    focusBorderColor="brand.blue"
                    type="text"
                    id="cardHolderName"
                    name="name"
                    value={newCardDetails.cardHolderName}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Enter cardholder name"
                    isInvalid={validationErrors.cardHolderName}
                  />
                  {validationErrors.cardHolderName && (
                    <Text color="red">Invalid Cardholder Name</Text>
                  )}
                </FormControl>
                <FormControl id="expirationDate">
                  <FormLabel>Expiration Date</FormLabel>
                  <Input
                    focusBorderColor="brand.blue"
                    type="text"
                    id="expirationDate"
                    name="expiry"
                    value={newCardDetails.expirationDate}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Enter expiration date"
                    isInvalid={validationErrors.expirationDate}
                  />
                  {validationErrors.expirationDate && <Text color="red">Invalid expiration date</Text>}
                </FormControl>
                <FormControl id="securityCode">
                  <FormLabel>Security Code</FormLabel>
                  <Input
                    focusBorderColor="brand.blue"
                    type="tel"
                    id="securityCode"
                    name="cvc"
                    value={newCardDetails.securityCode}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Enter security code"
                    isInvalid={validationErrors.securityCode}
                  />
                  {validationErrors.securityCode && <Text color="red">Invalid security code</Text>}
                </FormControl>
                <Button onClick={handleSaveNewCard} colorScheme="blue" isDisabled={!isFormValid()}>
                  Save Card
                </Button>
              </Box>
            </Grid>
          ) : null}
        </>
      ) : null}
    </Box>
  );
}

export default PaiementSetting;
