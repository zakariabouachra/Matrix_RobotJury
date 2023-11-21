import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Text,
  Button,
  InputGroup,
  InputRightElement,
  
} from '@chakra-ui/react';
import {IconButton,Box } from '@mui/material';

import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


function Mots2passe({setIsModalOpen}) {
  const userData = localStorage.getItem('userData');
  const userDataObject = JSON.parse(userData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [level, setLevel] = useState();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordMatchError(false);
    changePassword(e.target.value); 
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setCurrentPasswordError(false);
  };

  const handleSubmit = () => {
    if (userDataObject && userDataObject.motdepasse !== currentPassword) {
      setCurrentPasswordError(true);
      return;
    }

    setIsModalOpen(false);

    };

  return (
    <Grid gap={4}>
      <FormControl id="currentPassword">
        <FormLabel>Current Password</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="Enter current password"
        />
        {currentPasswordError && (
          <Text color="red.500" fontSize="sm">
            Incorrect current password
          </Text>
        )}
      </FormControl>
      <FormControl id="newPassword">
        <FormLabel>New Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="brand.blue"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            />
          <InputRightElement>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl fullWidth mt={2}>
        <Grid templateColumns="85px 1fr" gap={2} alignItems="center">
            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
            <Text fontSize="0.75rem">
            {level?.label}
            </Text>
        </Grid>
        </FormControl>
      <FormControl id="confirmPassword">
        <FormLabel>Confirm New Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="brand.blue"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Enter new password"
            />
          <InputRightElement>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowConfirmPassword}
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
            >
              {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        {passwordMatchError && (
          <Text color="red.500" fontSize="sm">
            Passwords do not match
          </Text>
        )}
      </FormControl>

      
      <Button
        onClick={handleSubmit}
        borderRadius="full"
        width="auto"
        _hover={{ bg: 'brand.blue' }}
        _active={{ bg: 'brand.blue' }}
        isDisabled={currentPassword === '' || newPassword === '' || confirmPassword === '' || passwordMatchError}

        >
        Modifier le mot de passe
        </Button>

    </Grid>
  );
}

export default Mots2passe;
