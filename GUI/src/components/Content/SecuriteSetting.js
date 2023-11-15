import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
} from '@chakra-ui/react';

function SecuriteSetting() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="currentPassword">
        <FormLabel>Current Password</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
      </FormControl>
      <FormControl id="newPassword">
        <FormLabel>New Password</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </FormControl>
      <FormControl id="confirmPassword">
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
      </FormControl>
    </Grid>
  );
}

export default SecuriteSetting;
