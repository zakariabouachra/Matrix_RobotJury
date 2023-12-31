import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Grid, Input, Select, Button, Spinner,Box } from '@chakra-ui/react';
import countriesData from 'assets/json/countries.json'; // Chemin vers votre fichier JSON des pays

function AddressForm() {
  const userData = localStorage.getItem('userData');
  const [userDataObject, setUserDataObject] = useState(JSON.parse(userData || '{}'));
  const [address, setAddress] = useState('');
  const [codepostal, setcodepostal] = useState('');
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // Extraire les données des pays du fichier JSON
  const countries = Object.entries(countriesData).map(([code, name]) => ({
    code,
    name,
  }));

  useEffect(() => {
    if (userDataObject) {
      setAddress(userDataObject.adresse || address);
      setcodepostal(userDataObject.codepostal || codepostal);
      setCity(userDataObject.city || city);
      setSelectedCountry(userDataObject.country || selectedCountry);
    }
  }, [userDataObject]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlecodepostalChange = (e) => {
    setcodepostal(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/address/${userDataObject.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          adresse: address || '',
          codepostal: codepostal || '',
          city: city || '',
          country: selectedCountry || '',
        }),
      });

      if (response.status === 200) {
        const { user_data } = await response.json();
        setAddress(user_data.adresse);
        setcodepostal(user_data.codepostal);
        setCity(user_data.city);
        setSelectedCountry(user_data.country);
        localStorage.setItem('userData', JSON.stringify(user_data));
        setUserDataObject(user_data);
        console.log(response);
      } else {
        console.error('Erreur lors de la mise à jour des informations d\'adresse');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de mise à jour des informations d\'adresse:', error);
    }
    setIsLoading(false);
  };

  const isSaveDisabled = !address || !codepostal || !city || !selectedCountry;


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
      <FormControl id="codepostal">
        <FormLabel>Postal Code</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={codepostal}
          onChange={handlecodepostalChange}
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
      {isLoading ? (
          <Spinner/>
      ) : (
        <>
        <Box display="flex" justifyContent="flex-end">
      <Button colorScheme="blue" onClick={handleSave} isDisabled={isSaveDisabled}>
        Save Update
      </Button>
      </Box>
      </>
      )}
    </Grid>
  );
}

export default AddressForm;
