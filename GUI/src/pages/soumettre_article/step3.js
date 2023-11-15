import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Step3 = ({ onPrev, onNext }) => {
  const [authors, setAuthors] = useState([
    {
      id: 1,
      contactType: 'Email',
      firstName: '',
      lastName: '',
      institution: '',
      country: '',
    },
  ]);

  const isFormValid = () => {
    return authors.every(
      (author) =>
        author.contactType !== '' &&
        author.firstName !== '' &&
        author.lastName !== '' &&
        author.institution !== '' &&
        author.country !== ''
    );
  };

  const handleAddAuthor = () => {
    const newAuthor = {
      id: authors.length + 1,
      contactType: 'Email',
      firstName: '',
      lastName: '',
      institution: '',
      country: '',
    };
    setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
  };

  const handleRemoveAuthor = (authorId) => {
    setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
  };

  const handleChangeAuthorField = (authorId, field, value) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === authorId ? { ...author, [field]: value } : author
      )
    );
  };

  return (
    <Grid container spacing={2}>
      {authors.map((author) => (
        <Grid item container spacing={2} key={author.id}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Author {author.id}:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Contact?"
              fullWidth
              required
              value={author.contactType}
              onChange={(e) => handleChangeAuthorField(author.id, 'contactType', e.target.value)}
            >
              <MenuItem value="Email">Email</MenuItem>
              {/* Ajoutez d'autres options au besoin */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              required
              value={author.firstName}
              onChange={(e) => handleChangeAuthorField(author.id, 'firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              required
              value={author.lastName}
              onChange={(e) => handleChangeAuthorField(author.id, 'lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Institution"
              fullWidth
              required
              value={author.institution}
              onChange={(e) => handleChangeAuthorField(author.id, 'institution', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              fullWidth
              required
              value={author.country}
              onChange={(e) => handleChangeAuthorField(author.id, 'country', e.target.value)}
            />
          </Grid>
          {authors.length > 1 && (
            <Grid item xs={12}>
              <IconButton onClick={() => handleRemoveAuthor(author.id)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box mt={1}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddAuthor}
          >
            Ajouter un auteur
          </Button>
        </Box>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onPrev}>
            Précédent
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            disabled={!isFormValid()}
          >
            Suivant
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step3;
