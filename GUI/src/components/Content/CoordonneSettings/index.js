import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Badge,
  Box,
  Modal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Spinner 
} from '@chakra-ui/react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import {Button} from '@mui/material';
import VerifyPhone from './verifyPhoneNumber';
import VerifyEmail from './verifyEmail';
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
  const [isDataModified, setIsDataModified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate , setUpdate] = useState(false);


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
    else{
      setIsPhoneNumberVerified(false);
    }
    if(userDataObject?.email_verified == true){
      setIsEmailVerified(true);
    }
    else{
      setIsPhoneNumberVerified(false);
    }
  }, [userDataObject]);

  const handleUpdate = async () => {
    setUpdate(true);
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
          phonenumber: phoneNumber
        }),
      });

      if (response.status === 200) {
        const { user_data } = await response.json();
        setEmail(user_data.email);
        setPhoneNumber(user_data.phonenumber)
        setIsEmailVerified(user_data.email_verified);
        setIsPhoneNumberVerified(user_data.phone_verified);
        localStorage.setItem('userData', JSON.stringify(user_data));
        setUserDataObject(user_data);
        console.log('Données mises à jour avec succès !');
      } else {
        console.error('Erreur lors de la mise à jour des données');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de mise à jour:', error);
    }
    setUpdate(false);
  };

  const isValid = isPhoneValid(phoneNumber);

  

  const sendEmailVerification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/send_verifyMail/${userDataObject.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Email de vérification envoyé avec succès:', data.message);
        setIsModalOpen(true);
        setModalTitle('Email Verification');
        setModalContent(<VerifyEmail email={email} sendEmailVerification={sendEmailVerification}/>);
      } else {
        console.error('Erreur lors de l\'envoi de l\'email de vérification');
      }
    } catch (error) {
      console.error('Erreur lors de la requête d\'envoi de l\'email');
    }
    setIsLoading(false);
  };

  const sendPhoneVerification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/send_verifyPhone/${userDataObject.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Code de vérification envoyé avec succès:', data.message);
        setIsModalOpen(true);
        setModalTitle('Phone Verification');
        setModalContent(
        <VerifyPhone 
           user_id={data.user_id}
           phoneNumber={phoneNumber} 
           sendPhoneVerification={sendPhoneVerification} 
           setIsPhoneNumberVerified={setIsPhoneNumberVerified} 
           setIsModalOpen={setIsModalOpen}
           />);
      } else {
        console.error('Erreur lors de l\'envoi du code de vérification du téléphone');
      }
    } catch (error) {
      console.error('Erreur lors de la requête d\'envoi du code de vérification du téléphone:', error);
    }
    setIsLoading(false);
  };

  const handlePhoneVerification = () =>{
    sendPhoneVerification()
  } 

  const handleEmailVerification = () =>{
    sendEmailVerification()

  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalContent('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsDataModified(true);
  };

  const handlePhoneChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    setIsDataModified(true);
  };


  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }} gap={4}>
      <FormControl id="email" flex="1">
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={1} alignItems="center">
          <FormLabel>Email Address</FormLabel>
          {isEmailVerified ? (
            <Box display="flex" alignItems="center">
                <Badge colorScheme="green" ml={2}>
                Verified
                </Badge>
            </Box>
            ) : (
            isLoading ? (
                <Spinner/>
            ) : (
                <Button colorScheme="blue" onClick={handleEmailVerification} ml={2}>
                    Verify Email
                </Button>
            )
            )}
        </Grid>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="info@matrix.com"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>

      <FormControl id="phoneNumber" flex="1">
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={1} alignItems="center">
          <FormLabel>Phone Number</FormLabel>
          {isPhoneNumberVerified ? (
            <Box display="flex" alignItems="center">
              <Badge colorScheme="green" ml={2}>
                Verified
              </Badge>
            </Box>
          ) : (
            <Button colorScheme="blue" onClick={handlePhoneVerification}ml={2}>
              Verify Phone Number
            </Button>
          )}
        </Grid>
        <PhoneInput
          defaultCountry="ca"
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
      </FormControl>
        
      <Box display="flex" justifyContent="flex-end">
      {isUpdate ? (
            <Spinner/>
        ) : (
      <Button
        color="primary"
        onClick={handleUpdate}
        disabled={!isDataModified || !isValid || email.trim() === ''}
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          color: 'white',
          '&:hover': {
            bgcolor:'green',
          },
        }}
      >
        Save Update
      </Button>
      )}
      </Box>

      {isModalOpen && (
        <Modal onClose={closeModal} isOpen={isModalOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>{modalContent}</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Grid>
  );
  
}

export default CoordonneSettings;
