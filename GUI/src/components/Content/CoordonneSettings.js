import {
  FormControl,
  FormLabel,
  Grid,
  Input,
} from '@chakra-ui/react';

function CoordonneSettings() {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="email">
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="info@matrix.com"
        />
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="123-456-7890"
        />
      </FormControl>
    </Grid>
  )
}

export default CoordonneSettings;
