import React ,{useState} from 'react';
import { Grid, Text, VStack, Input,Button} from '@chakra-ui/react';


function AppAuthVerified() {
    const [isValid, setIsValid] = useState(false); // État pour la validité du code
    const [authCode, setAuthCode] = useState(''); // État pour suivre le contenu de l'input

    const handleVerify = () => {
      console.log(authCode)
    };
  
    const handleAuthCodeChange = (event) => {
      const code = event.target.value;
      setAuthCode(code);
      setIsValid(code.trim() !== '');
    };
  

 
  return (
    <Grid templateColumns="1fr" gap={4} p={6} bg="gray.100" borderRadius="md">
      <VStack align="flex-start" spacing={4}>
        <Text fontSize="ll" fontWeight="bold">Configuring Google Authenticator or Authy</Text>

        <Text>1. Install Google Authenticator (iOS - Android) or Authy (iOS - Android).</Text>
        <Text>2. In the authenticator app, select the &quot;+&quot; icon.</Text>
        <Text>3. Select &quot;Scan a barcode&quot; (or QR code) and use the phone camera to scan this barcode.</Text>

        <Text fontSize="ll" fontWeight="bold">Scan QR Code</Text>

        <Text fontSize="ll" fontWeight="bold">Or Enter Code Into Your App</Text>
        <Text>Secret Key:</Text>

        <Text fontSize="ll" fontWeight="bold">Verify Code</Text>
        <Text>For changing the setting, please verify the authentication code:</Text>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Authentication code"
          value={authCode}
          onChange={handleAuthCodeChange}
        />
      </VStack>
      <Button
        onClick={handleVerify}
        borderRadius="full"
        width="auto"
        _hover={{ bg: 'brand.blue' }}
        _active={{ bg: 'brand.blue' }}
        isDisabled={!isValid}
        >
        Verify
        </Button>

    </Grid>
  );
}

export default AppAuthVerified;
