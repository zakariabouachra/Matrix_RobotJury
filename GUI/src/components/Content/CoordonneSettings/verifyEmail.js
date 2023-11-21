import React from 'react';
import {
  Box,
  Text,
  Link
} from '@chakra-ui/react';

function VerifyEmail({ email }) {
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
        >
          Renvoyer l&apos;email
        </Link>
      </Text>
    </Box>
  );
}

export default VerifyEmail;
