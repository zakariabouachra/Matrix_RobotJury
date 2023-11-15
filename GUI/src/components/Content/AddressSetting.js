import { useState } from 'react';
import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react';
import countriesData from './countries.json'; // Chemin vers votre fichier JSON des pays

function AddressForm() {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Extraire les données des pays du fichier JSON
  const countries = Object.entries(countriesData).map(([code, name]) => ({
    code,
    name,
  }));

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="address">
        <FormLabel>Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
      </FormControl>
      <FormControl id="postalCode">
        <FormLabel>Postal Code</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter postal code"
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        <Select
          focusBorderColor="brand.blue"
          placeholder="Select country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default AddressForm;
