import React, { useState } from 'react';
import {
  Grid,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  Link,
  IconButton,
  Box
} from '@chakra-ui/react';
import {  ArrowBackIcon  } from '@chakra-ui/icons'; 

function EmailValidationComponent({setIsButtonClicked}) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);


  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const handleSendCode = () => {
    // Ici, tu enverrais le code de validation à l'adresse e-mail spécifiée (pas implémenté ici)
    // Cette fonction simule l'envoi du code en mettant juste le state isCodeSent à true
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


  return (
    <Grid gap={4}>
      {!isCodeSent ? (
        <>
          <Text>Valider votre adresse e-mail de récupération</Text>
          <Text>Saisissez votre adresse e-mail :</Text>
          <Input
            focusBorderColor="brand.blue"
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={handleEmailChange}
          />
           <Alert status="warning">
            <AlertIcon />
            Assurez-vous de fournir un e-mail valide.
          </Alert>
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
              isDisabled={!isValidEmail}
            >
              Envoyer un nouveau code
            </Button>
        </Box>
        </>
      ) : (
        <>
          <Text>
            Saisissez le code à six chiffres envoyé à l&apos;adresse {email}.
            Vous ne trouvez pas l&apos;e-mail ?{' '}
            <Link onClick={() => setIsCodeSent(false)}
            color="blue.500"
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
            >Envoyer un nouveau code</Link>
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

export default EmailValidationComponent;
