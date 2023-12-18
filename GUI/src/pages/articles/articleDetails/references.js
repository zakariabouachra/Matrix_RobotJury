import React from 'react';
import { Typography, Box } from '@mui/material';

const ReferenceItem = ({ reference }) => {
    const { title, authors, doi, publisher } = reference;
  
    // Créer une liste des éléments d'information pour afficher
    const infoElements = [];
    if (title) infoElements.push(`"${title}"`);
    if (authors && authors.length > 0) infoElements.push(`Authors: ${authors.join(', ')}`);
    if (doi) infoElements.push(`DOI: ${doi}`);
    if (publisher) infoElements.push(`Publisher: ${publisher}`);
  
    // Joindre les éléments avec des virgules
    const infoString = infoElements.join(', ');
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 1, flexWrap: 'wrap' }}>
        <Typography variant="body1">
          {infoString}
        </Typography>
      </Box>
    );
  };
  

const ReferencesDisplay = ({ references }) => {
  return (
    <Box sx={{ my: 2, p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
      <Typography variant="h4" gutterBottom>
        References
      </Typography>
      {references.map((reference, index) => (
        <ReferenceItem key={index} reference={reference} />
      ))}
    </Box>
  );
};

export default ReferencesDisplay;
