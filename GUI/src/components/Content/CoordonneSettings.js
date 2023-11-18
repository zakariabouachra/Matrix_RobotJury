import {
  FormControl,
  FormLabel,
  Grid,
  Input,
} from '@chakra-ui/react';

function CoordonneSettings() {
  const userData = localStorage.getItem('userData');  
  const userDataObject = JSON.parse(userData);
  
  console.log(userDataObject)
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
          value={userDataObject?.email || ''}
        />
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="123-456-7890"
          value={userDataObject?.phonenumber || ''}
        />
      </FormControl>
    </Grid>
  )
}

export default CoordonneSettings;
