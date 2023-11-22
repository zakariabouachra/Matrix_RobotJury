import React, { useState, useEffect } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

function VerifyEmail({ email, sendEmailVerification }) {
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);

  const handleResendEmail = () => {
    if (canResend) {
      sendEmailVerification();
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

  return (
    <Box>
      <Text>
        Un email de vérification a été envoyé à l&apos;adresse : {email}.
      </Text>
      <Text>
        Vous ne trouvez pas l&apos;email ?{' '}
        <Link
          color="blue.500"
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          onClick={handleResendEmail}
          disabled={!canResend}
        >
          {canResend ? 'Renvoyer l\'email' : `Attendez ${timer}s`}
        </Link>
      </Text>
    </Box>
  );
}

export default VerifyEmail;
