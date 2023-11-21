import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Grid, Input, Select, Button, Box } from '@chakra-ui/react';

function AccountSettings() {
  const userData = localStorage.getItem('userData');
  const [userDataObject, setUserDataObject] = useState(JSON.parse(userData || '{}'));
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    if (userDataObject?.datedenaisance) {
      const dateObj = new Date(userDataObject?.datedenaisance);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear().toString();
      setFormattedDate(`${day}/${month}/${year}`)
    }
    if (userDataObject?.sexe) {
      setGender(userDataObject.sexe);
    }
  }, [userDataObject]);

  const handleGenderChange = (event) => {
    const { value } = event.target;
    setGender(value);
  };

  const handleDayChange = (event) => {
    const { value } = event.target;
    setDay(value);
  };

  const handleMonthChange = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
  };


  const handleYearChange = (event) => {
    const { value } = event.target;
    setYear(value);
  };


  const isDisabled = !userDataObject.prenom || !userDataObject.nom || !day || !year || !selectedMonth || !gender;

  const updateUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/user_information/' + userDataObject.user_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          nom: userDataObject.nom || '',
          prenom: userDataObject.prenom || '',
          datedenaisance: `${day}/${selectedMonth}/${year}` || '',
          sexe: gender || '',
        }),
      });

      if (response.status === 200) {
        console.log('Données mises à jour avec succès !');
        const { user_data } = await response.json();
        localStorage.setItem('userData', JSON.stringify(user_data));
        setUserDataObject(user_data);
      } else {
        console.error('Erreur lors de la mise à jour des données');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de mise à jour:', error);
    }
  };
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
      <FormControl id="firstName">
        <FormLabel>First Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Tim" value={userDataObject?.prenom || ''}  isDisabled={userDataObject?.prenom}/>
      </FormControl>
      <FormControl id="lastName">
        <FormLabel>Last Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Cook" value={userDataObject?.nom || ''}  isDisabled={userDataObject?.nom}  />
      </FormControl>
      {!userDataObject?.datedenaisance ? (
        <FormControl id="dateOfBirth" gridColumn={{ md: 'span 5' }}>
          <FormLabel>Date of Birth</FormLabel>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>
              <p>Day</p>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                value={day}
                placeholder="DD"
                onChange={handleDayChange}
                isDisabled={userDataObject?.datedenaisance}
              />
            </div>
            <div style={{ marginRight: '10px' }}>
              <p>Month</p>
              <Select
                focusBorderColor="brand.blue"
                placeholder="MM"
                value={selectedMonth}
                onChange={handleMonthChange}
                isDisabled={userDataObject?.datedenaisance}
              >
                 <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </Select>
            </div>
            <div style={{ marginRight: '10px' }}>
              <p>Year</p>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                value={year}
                placeholder="YYYY"
                onChange={handleYearChange}
                isDisabled={userDataObject?.datedenaisance}
              />
            </div>
          </div>
        </FormControl>
      ) : (
        <FormControl id="dateOfBirth" gridColumn={{ md: 'span 5' }}>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            value={formattedDate}
            placeholder="Select date"
            readOnly
            isDisabled={userDataObject?.datedenaisance}
          />
        </FormControl>
      )}

      <FormControl id="gender">
        <FormLabel>Gender</FormLabel>
        <Select
          focusBorderColor="brand.blue"
          placeholder="Select gender"
          value={gender}
          onChange={handleGenderChange}
          isDisabled={userDataObject?.sexe}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </FormControl>
      {!userDataObject.sexe && !userDataObject.datedenaisance  && (
      <FormControl gridColumn={{ md: 'span 2' }}>
        <Box mt={4}>
          <Button colorScheme="blue" onClick={updateUserData} isDisabled={isDisabled}>
            Save Update
          </Button>
          <p style={{ marginTop: '8px', fontSize: '14px', color: 'red' }}>
            Note: You won&apos;t be able to edit general information after this. Please contact support for any changes.
          </p>
        </Box>
      </FormControl>
      )}
    </Grid>
  );
}

export default AccountSettings;
