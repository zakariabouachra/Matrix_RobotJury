import React, { useState } from 'react';
import {
  Grid,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/react';

function EmailValidationComponent() {
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

  const handleVerifyCode = () => {
    // Ici, tu vérifierais si le code entré correspond au code envoyé (pas implémenté ici)
    // Tu pourrais comparer le code saisi avec un code prédéfini ou l'envoyer à un serveur pour vérification
    // Cette fonction simule la validation du code en affichant une alerte
    alert('Code validated!');
  };

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
          <Alert status="warning">
            <AlertIcon />
            Assurez-vous de fournir un e-mail valide.
          </Alert>
        </>
      ) : (
        <>
          <Text>
            Saisissez le code à six chiffres envoyé à l&apos;adresse {email}.
            Vous ne trouvez pas l&apos;e-mail ?{' '}
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

export default EmailValidationComponent;
