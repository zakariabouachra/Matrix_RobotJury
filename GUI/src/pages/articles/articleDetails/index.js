import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import AuteursList from './authorList';
import AbstractDisplay from './abstract';
import InformationDisplay from './information';
import StructureDisplay from './body';
import ReferencesDisplay from './references';

const XmlDisplayPage = () => {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        };

        const response = await fetch(`http://localhost:5000/get_article_data/${articleId}`, requestOptions);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de l\'article');
        }
        const data = await response.json();
        setArticleInfo(data.article_info);
        console.log(data)

        // Récupération du fichier JSON
        const jsonUrl = data.article_info.article_data.JSONFILE; // Assurez-vous que le chemin est correct
        console.log(jsonUrl)
        const jsonResponse = await fetch(jsonUrl);
        if (!jsonResponse.ok) {
          throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        const jsonData = await jsonResponse.json();
        setJsonContent(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticleData();
  }, [articleId]);

  if (!articleInfo || !jsonContent) {
    return <div>Chargement...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <h1>{articleInfo.article_data.TITRECONTRIBUTION}</h1>
      <AuteursList auteurs={jsonContent.Auteurs} />
      <InformationDisplay information={jsonContent.Information} />
      <AbstractDisplay abstract={jsonContent.Abstract} />
      <StructureDisplay structure={jsonContent.Structure} />
      <ReferencesDisplay references={jsonContent.Notes.references.references} />
    </Box>
  );
};

export default XmlDisplayPage;
