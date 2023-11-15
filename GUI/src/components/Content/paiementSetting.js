import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react';

function PaiementSetting() {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="creditCardNumber">
        <FormLabel>Credit Card Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="1234 5678 9012 3456"
        />
      </FormControl>
      <FormControl id="expirationDate">
        <FormLabel>Expiration Date</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="MM/YY"
        />
      </FormControl>
      <FormControl id="securityCode">
        <FormLabel>Security Code</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="CVV"
        />
      </FormControl>
    </Grid>
  );
}

export default PaiementSetting;
