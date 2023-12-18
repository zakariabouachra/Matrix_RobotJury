import React from 'react';
import { Typography, Box } from '@mui/material';

const SectionDisplay = ({ sections }) => {
  return (
    <Box sx={{ my: 2, py: 2, px: 3, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
      {sections.map((content, index) => (
        <div key={index}>
          <Typography variant="h4" gutterBottom>
            {content.title.join(' ')}
          </Typography>
          {content.text.map((paragraph, paraIndex) => (
            <Typography variant="body1" paragraph key={paraIndex} sx={{ my: 0.5 }}>
              {paragraph}
            </Typography>
          ))}
        </div>
      ))}
    </Box>
  );
};

const StructureDisplay = ({ structure }) => {
  const groupedSections = Object.entries(structure).reduce((acc, [, sectionContent]) => {
    sectionContent.forEach(content => {
      const sectionNumber = content.title[0].match(/^\d+/)?.[0]; // Capture the leading number
      if (sectionNumber) {
        acc[sectionNumber] = acc[sectionNumber] || [];
        acc[sectionNumber].push(content);
      } else {
        acc['other'] = acc['other'] || [];
        acc['other'].push(content);
      }
    });
    return acc;
  }, {});

  return (
    <div>
      {Object.values(groupedSections).map((sections, index) => (
        <SectionDisplay key={index} sections={sections} />
      ))}
    </div>
  );
};

export default StructureDisplay;
