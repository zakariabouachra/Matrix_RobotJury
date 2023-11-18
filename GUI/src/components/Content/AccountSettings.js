import { useState , useEffect} from 'react';
import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react';

function AccountSettings() {

  const userData = localStorage.getItem('userData');  
  const userDataObject = JSON.parse(userData);

  

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');


  useEffect(() => {
    if (userDataObject?.datedenaisance) {
      const parsedDate = new Date(userDataObject.datedenaisance);
      setDay(parsedDate.getDate().toString());
      setMonth((parsedDate.getMonth() + 1).toString());
      setYear(parsedDate.getFullYear().toString());
    }
    if (userDataObject?.sexe) {
      setGender(userDataObject.sexe);
    }
  }, [userDataObject]);

  const handleDayChange = (event) => {
    const { value } = event.target;
    setDay(value);
  };

  const handleMonthChange = (event) => {
    const { value } = event.target;
    setMonth(value);
  };

  const handleYearChange = (event) => {
    const { value } = event.target;
    setYear(value);
  };
  const formattedDate = `${day}/${month}/${year}`;



  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>First Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Tim"  value={userDataObject?.prenom || ''}
/>
      </FormControl>
      <FormControl id="lastName">
        <FormLabel>Last Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Cook"  value={userDataObject?.nom || ''}
 />
      </FormControl>
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
            />
          </div>
          <div style={{ marginRight: '10px' }}>
            <p>Month</p>
            <Select
              focusBorderColor="brand.blue"
              placeholder="MM"
              value={month}
              onChange={handleMonthChange}
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
            />
          </div>
          <div>
            <p>Date of Birth</p>
            <Input
              focusBorderColor="brand.blue"
              type="text"
              value={formattedDate}
              placeholder="Select date"
              readOnly
            />
          </div>
        </div>
      </FormControl>
     
      <FormControl id="gender">
        <FormLabel>Gender</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </FormControl>
    </Grid>
      
  );
}

export default AccountSettings;
