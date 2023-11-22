import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Step3 = ({ onPrev, onNext }) => {
  const [authors, setAuthors] = useState([
    {
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
  const handleNextStep = () => {
    // Vérifiez si le formulaire de l'étape est valide avant de passer à l'étape suivante
    if (isFormValid()) {
      // Créer un objet formData avec les valeurs de chaque auteur
      const formData = { authors };
      onNext(formData);
      console.log(formData)
    } else {
      // Gérer le cas où le formulaire n'est pas valide (par exemple, afficher un message d'erreur)
      console.error('Le formulaire n\'est pas valide.');
    }
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
            onClick={handleNextStep}
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
