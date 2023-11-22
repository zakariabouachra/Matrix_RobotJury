import React, { useState, useEffect } from 'react';
import { Box, Text, Link, Input } from '@chakra-ui/react';
import {Button} from '@mui/material';

function VerifyPhone({ user_id ,phoneNumber, sendPhoneVerification, setIsPhoneNumberVerified, setIsModalOpen }) {
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState('');

  const handleResendPhone = () => {
    if (canResend) {
      sendPhoneVerification();
      setCanResend(false);
      setTimer(60);
    }
  };

  useEffect(() => {
    let countdown;
    if (canResend) {
      return;
    }

    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(countdown);
  }, [canResend, timer]);

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`http://localhost:5000/verify_phone/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, code }), // Assurez-vous d'envoyer le numéro de téléphone et le code saisi
      });
  
      if (response.ok) {
        const user_data  = await response.json();
        console.log(user_data)
        console.log('Code de vérification correct');
        setIsPhoneNumberVerified(user_data.phone_verified);
        setIsModalOpen(false);
      } else {
        console.error('Échec de la vérification du code');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du code:', error);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <Box>
      <Text>
        Saisissez le code à six chiffres envoyé au numéro de téléphone {phoneNumber}.
      </Text>
      <Text>
        Vous ne trouvez pas le code de verification ?{' '}
        <Link
          color="blue.500"
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          onClick={handleResendPhone}
          disabled={!canResend}
        >
          {canResend ? 'Renvoyer le code' : `Attendez ${timer}s`}
        </Link>
      </Text>
      <Input
        focusBorderColor="brand.blue"
        type="text"
        placeholder="Code de validation"
        value={code}
        onChange={handleCodeChange}
      />
      <Box mt={4} display="flex" alignItems="center" justifyContent="flex-end">
        <Button
          onClick={handleVerifyCode}
          variant="contained"
          disableElevation
          disabled={code.trim() === ''}
          sx={{
            borderRadius: '50px',
            color: 'white',
            width: 'auto',
            '&:hover': {
              bgcolor: 'brand.blue',
            },
            '&:active': {
              bgcolor: 'brand.blue',
            },
          }}
        >
          Valider le code
        </Button>
      </Box>
    </Box>
  );
}

export default VerifyPhone;
