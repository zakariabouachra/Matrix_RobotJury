import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button, Grid, MenuItem, List, ListItem,Backdrop ,Modal,CircularProgress, IconButton, TextField, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';

function SoumissionF({ articleId, handleCloseDialog }) {
  const [articleData, setArticleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Etat pour gérer l'affichage du spinner

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get_article_data/${articleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setArticleData(data.article_info);
        } else {
          console.error('Unable to retrieve article information.');
        }
      } catch (error) {
        console.error('Error fetching article information:', error);
      }
    };

    if (articleId) {
      fetchArticleData();
    }
  }, [articleId]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    handleCloseDialog();
  };

  const handleSubmit = async () => {
    setLoading(true); 

    const formData = new FormData();
    formData.append("noContribution", articleData.article_data.NOCONTRIBUTION);
    formData.append("title", articleData.article_data.TITRECONTRIBUTION);
    formData.append("institution", articleData.article_data.INSTITUTION);
    formData.append("trackPreference", articleData.article_data.TRRACKPREFERENCE);
    formData.append("mainTopic", articleData.article_data.MAINTOPIC);
    formData.append("contributionType", articleData.article_data.CONTRIBUTIONTYPE);
    formData.append("abstract", articleData.article_data.ABSTRACT);

    // Gestion des informations des auteurs
    articleData.authors_data.forEach((author, index) => {
      formData.append(`authors[${index}][firstName]`, author.AUTHOR_FIRST_NAME);
      formData.append(`authors[${index}][lastName]`, author.AUTHOR_LAST_NAME);
      formData.append(`authors[${index}][institution]`, author.AUTHOR_INSTITUTION);
      formData.append(`authors[${index}][country]`, author.AUTHOR_COUNTRY);
    });

    // Gestion du fichier
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:5000/update_article_data/${articleId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Réponse du backend :', data.message);
        localStorage.setItem('articlesData', JSON.stringify(data.articles));
        setIsEditing(false);
        handleCloseDialog();
        setLoading(false);
        window.location.reload();
      } else {
        console.error('Failed to update article.');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file); // Vérifiez la sortie dans la console
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
      setSelectedFile(null);
  };

  if (!articleData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button onClick={toggleEditMode} variant="outlined" color="primary">
            {isEditing ? 'Cancel Editing' : 'Edit All Fields'}
        </Button>
    </div>
      <TextField
        label="Contribution Number"
        defaultValue={articleData.article_data.NOCONTRIBUTION}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={true}
      />
      <TextField
        label="Title of Contribution"
        defaultValue={articleData.article_data.TITRECONTRIBUTION}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={!isEditing}
        
      />
      <TextField
        label="Institution"
        defaultValue={articleData.article_data.INSTITUTION}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={!isEditing}
        
      />
      <TextField
        id="trackPreference"
        select
        label="Track preference"
        fullWidth
        required
        value={articleData.article_data.TRRACKPREFERENCE}
        disabled={!isEditing}
        margin="normal"
        
      >
        <MenuItem value="General event track">
          Matrix Scientifique Evolution - General event track
        </MenuItem>
      </TextField>
      <TextField
        id="mainTopic"
        select
        label="Main topic"
        fullWidth
        required
        value={articleData.article_data.MAINTOPIC}
        disabled={!isEditing}
        margin="normal"
        
      >
        <MenuItem value="Cloud">Matrix Scientifique Evolution: Cloud </MenuItem>
        <MenuItem value="Data">Matrix Scientifique Evolution: Data </MenuItem>
        <MenuItem value="Energy">Matrix Scientifique Evolution: Energy </MenuItem>
        <MenuItem value="Health">Matrix Scientifique Evolution: Health </MenuItem>
        <MenuItem value="Human-machine">Matrix Scientifique Evolution: Human-machine </MenuItem>
        <MenuItem value="Intelligence">Matrix Scientifique Evolution: Intelligence</MenuItem>
        <MenuItem value="Internet">Matrix Scientifique Evolution: Internet</MenuItem>
        <MenuItem value="Iot">Matrix Scientifique Evolution: Iot </MenuItem>
        <MenuItem value="Learning">Matrix Scientifique Evolution: Learning </MenuItem>
        <MenuItem value="Metaverse">Matrix Scientifique Evolution: Metaverse </MenuItem>
        <MenuItem value="Mobility">Matrix Scientifique Evolution: Mobility </MenuItem>
        <MenuItem value="Multimedia">Matrix Scientifique Evolution: Multimedia</MenuItem>
        <MenuItem value="Networks">Matrix Scientifique Evolution: Networks </MenuItem>
        <MenuItem value="Robotics">Matrix Scientifique Evolution: Robotics</MenuItem>
        <MenuItem value="Security">Matrix Scientifique Evolution: Security </MenuItem>
        <MenuItem value="Sensors">Matrix Scientifique Evolution:Sensors</MenuItem>
        <MenuItem value="Signal">Matrix Scientifique Evolution: Signal</MenuItem>
        <MenuItem value="Smart Cities">Matrix Scientifique Evolution: Smart Cities </MenuItem>
      </TextField>
      <TextField
        id="contributionType"
        select
        label="Contribution type"
        fullWidth
        required
        value={articleData.article_data.CONTRIBUTIONTYPE}
        disabled={!isEditing}
        margin="normal"
        
      >
        <MenuItem value="regular paper">regular paper [in the proceedings, digital library]</MenuItem>
        <MenuItem value="short paper">short paper (work in progress) [in the proceedings, digital library]</MenuItem>
        <MenuItem value="idea: two pages">idea: two pages [in the proceedings, digital library]</MenuItem>
        <MenuItem value="extended abstract">extended abstract: two pages [in the proceedings, digital library]</MenuItem>
        <MenuItem value="poster! two pages">poster! two pages [in the proceedings, digital library]</MenuItem>
        <MenuItem value="poster: slide only">poster: slide only [slide-deck posted on www.iaria.org]</MenuItem>
        <MenuItem value="presentation: slide only">presentation: slide only [slide-deck posted on www.iaria.org]</MenuItem>
        <MenuItem value="demo: two pages">demo: two pages [posted on www.iaria.org]</MenuItem>
      </TextField>
      <TextField
        label="Abstract"
        defaultValue={articleData.article_data.ABSTRACT}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={!isEditing}
        
      />
          <Grid item xs={12}>
        <Typography variant="subtitle1">PDF File:</Typography>
      </Grid>
      <Grid item xs={12}>
        {selectedFile && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography style={{ marginRight: 'auto' }}>{selectedFile.name}</Typography>
            <IconButton onClick={handleRemoveFile} color="secondary">
              <ClearIcon />
            </IconButton>
          </div>
        )}
        {!selectedFile && isEditing && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
            />
            <TextField
              label="Upload PDF File"
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <Button
                    onClick={() => fileInputRef.current.click()}
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginRight: '10px' }}
                  >
                    Select
                  </Button>
                ),
              }}
            />
          </div>
        )}
        {articleData.article_data.PDFFILE && (
        <Box mt={2}>
            <Link to={articleData.article_data.PDFFILE} target="_blank" rel="noopener noreferrer">
            Voir le fichier PDF
            </Link>
        </Box>
        )}
      </Grid>

      <p>Authors:</p>
      <List>
        {articleData.authors_data.map((author, index) => (
          <ListItem key={index}>
            <TextField
              label="First Name"
              defaultValue={author.AUTHOR_FIRST_NAME}
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!isEditing}
              
            />
            <TextField
              label="Last Name"
              defaultValue={author.AUTHOR_LAST_NAME}
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!isEditing}
              
            />
            <TextField
              label="Institution"
              defaultValue={author.AUTHOR_INSTITUTION}
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!isEditing}
              
            />
            <TextField
              label="Country"
              defaultValue={author.AUTHOR_COUNTRY}
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
          </ListItem>
        ))}
      </List>
        
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleCancel} variant="outlined" color="secondary">
            Annuler
        </Button>
        <Button onClick={handleSubmit} variant="outlined" color="primary">
            Soumettre
        </Button>
        </div>

        <Modal
        open={loading}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Fond semi-transparent
        }}
      >
       <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center', // Centre le contenu horizontalement
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff', // Fond blanc
          }}
        >
          <CircularProgress color="primary" size={80} /> {/* Augmente la taille du cercle */}
          <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
            Veuillez patienter en verifiant et publiant  vos données...
          </Typography>
        </Box>
      </Modal>

    </div>
  );
}

export default SoumissionF;
