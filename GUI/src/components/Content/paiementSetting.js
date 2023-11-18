import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { FormControl, FormLabel, Grid, Input, Button, Box } from '@chakra-ui/react';

function PaiementSetting() {
  const [userDataObject, setUserDataObject] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    focused: '',
    cardHolderName: '',
    creditCardNumber: '',
    expirationDate: '',
    securityCode: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCardDetails({ ...newCardDetails, [id]: value });
  };

  const handleInputFocus = (e) => {
    setNewCardDetails({ ...newCardDetails, focused: e.target.name });
  }

  const handleSaveNewCard = () => {
    setShowAddCardForm(false);
    setUserDataObject({
      ...userDataObject,
      CARDHOLDERNAME: newCardDetails.cardHolderName,
      CREDITNUMBER: newCardDetails.creditCardNumber,
      EXPIRATIONDATE: newCardDetails.expirationDate,
      CVV: newCardDetails.securityCode,
      focused: newCardDetails.focused
    });
    setNewCardDetails({
      focused: '',
      cardHolderName: '',
      creditCardNumber: '',
      expirationDate: '',
      securityCode: '',
    });
  };

  const handleRemoveCard = () => {
    setUserDataObject(null);
    setNewCardDetails({
      focused: '',
      cardHolderName: '',
      creditCardNumber: '',
      expirationDate: '',
      securityCode: '',
    });
  };

  return (
    <Box mt={8}>
      {userDataObject ? (
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          gap={6}
        >
            <Cards
              expiry={userDataObject.EXPIRATIONDATE}
              name={userDataObject.CARDHOLDERNAME}
              number={userDataObject.CREDITNUMBER.slice(0, 4) + '*'.repeat(userDataObject.CREDITNUMBER.length - 8) + userDataObject.CREDITNUMBER.slice(-4)}
              />
            <Box>
              <Button onClick={handleRemoveCard} variant="outline" colorScheme='red'>
                Remove Card
              </Button>
            </Box>
        </Grid>
      ) : null}
      {!userDataObject || !userDataObject.CREDITNUMBER ? (
        <>
          {showAddCardForm ? (
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={6}
            >
                <Cards
                  cvc={newCardDetails.securityCode}
                  expiry={newCardDetails.expirationDate}
                  focused={newCardDetails.focused}
                  name={newCardDetails.cardHolderName}
                  number={newCardDetails.creditCardNumber}
                />
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
                  />
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
                  />
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
                  />
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
                  />
                </FormControl>
              <Button onClick={handleSaveNewCard} colorScheme="blue">
                Save Card
              </Button>
            </Grid>
          ) : (
            <Button onClick={() => setShowAddCardForm(true)} colorScheme="blue">
              Add Payment Info
            </Button>
          )}
        </>
      ) : (
        null
      )}
    </Box>
  );
}

export default PaiementSetting;
