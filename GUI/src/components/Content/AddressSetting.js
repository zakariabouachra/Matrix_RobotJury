import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react';
import countriesData from './countries.json'; // Chemin vers votre fichier JSON des pays

function AddressForm() {
  const userData = localStorage.getItem('userData');
  const userDataObject = JSON.parse(userData);

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Extraire les données des pays du fichier JSON
  const countries = Object.entries(countriesData).map(([code, name]) => ({
    code,
    name,
  }));

  useEffect(() => {
    if (userDataObject) {
      setAddress(userDataObject.adresse || '');
      setPostalCode(userDataObject.postalCode || '');
      setCity(userDataObject.city || '');
      setSelectedCountry(userDataObject.country || '');
    }
  }, [userDataObject]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
      <FormControl id="address">
        <FormLabel>Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter address"
        />
      </FormControl>
      <FormControl id="postalCode">
        <FormLabel>Postal Code</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={postalCode}
          onChange={handlePostalCodeChange}
          placeholder="Enter postal code"
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        <Select
          focusBorderColor="brand.blue"
          placeholder="Select country"
          value={selectedCountry}
          onChange={handleCountryChange}
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
