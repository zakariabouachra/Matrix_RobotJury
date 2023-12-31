import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Stack,
} from '@mui/material';
import Dot from 'components/@extended/Dot';
import RenderDialog from './action';
const ArticlesPage = () => {

  const [articlesData, setArticlesData] = useState(() => {
    const localData = localStorage.getItem('articlesData');
    return localData ? JSON.parse(localData) : [];
  });

  const fetchArticlesData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };

      const response = await fetch('http://localhost:5000/articles', requestOptions);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles');
      }
      const data = await response.json();
      setArticlesData(data.articles);
      localStorage.setItem('articlesData', JSON.stringify(data.articles));
      
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    if (!articlesData.length) {
      fetchArticlesData();
    }
    console.log(articlesData)
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setPage(0);
  };
  
  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    setPage(0);
  };

  const [dialogInfo, setDialogInfo] = useState({
    open: false,
    articleId: null,
    action: null,
  });


  const handleActionClick = (action, articleId) => {
    setDialogInfo({ open: true, articleId, action,articlesData });
  };

  const handleCloseDialog = (updatedArticles) => {
    setDialogInfo({ open: false, articleId: null, action: null });
    if (updatedArticles) {
      setArticlesData(updatedArticles);
    }
  };


  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, articlesData.length - page * rowsPerPage);

    const renderActions = (status, articleId) => {
      switch (status) {
        case 'Published':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Archiver" onClick={() => handleActionClick('Archiver', articleId)}>Archiver</MenuItem>
                <MenuItem value="Supprimer" onClick={() =>handleActionClick('Supprimer', articleId)}>Supprimer</MenuItem>
              </Select>
            </FormControl>
          );
        case 'In process':
          return null; 
        case 'Accepted':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Payer" onClick={() => handleActionClick('Payer', articleId)}>Payer</MenuItem>
                <MenuItem value="Supprimer" onClick={() => handleActionClick('Supprimer', articleId)}>Supprimer</MenuItem>
              </Select>
            </FormControl>
          );
        case 'Paid':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Publier" onClick={() => handleActionClick('Publier', articleId)}>Publier</MenuItem>
                <MenuItem value="Supprimer" onClick={() => handleActionClick('Supprimer', articleId)}>Supprimer</MenuItem>
              </Select>
            </FormControl>
          );
        case 'Rejected':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Reviser" onClick={() => handleActionClick('Reviser', articleId)}>Renvoyer</MenuItem>
                <MenuItem value="Supprimer" onClick={() => handleActionClick('Supprimer', articleId)}>Supprimer</MenuItem>
              </Select>
            </FormControl>
          );
        default:
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="">Sélectionner</MenuItem>
              </Select>
            </FormControl>
          );
      }
    };
    
    

  // ==============================|| ORDER TABLE - STATUS ||============================== //

  const getStatusColor = ( status ) => {
    let color;
    let title;

    switch (status) {
      case "Accepted":
        color = 'warning';
        title = 'Accepted';
        break;
      case "Published":
        color = 'success';
        title = 'Published';
        break;
      case "Paid":
        color = 'success';
        title = 'Paid';
        break;
      case "Rejected":
        color = 'error';
        title = 'Rejected';
        break;
      case "In process":
        color = 'primary';
        title = 'In process';
        break;
      default:
        color = 'black';
        title = 'None';
    }

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Dot color={color} />
        <Typography>{title}</Typography>
      </Stack>
    );
  };


  return (
    <Container style={{ paddingBottom: '20px' }}>

        <Typography variant="h5" style={{ marginBottom: '20px' }}>Mes Articles</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Recherche"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12} sm={6} container alignItems="center">
          <Grid item xs={12} >
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilter}
                label="Status"
              >
                <MenuItem value="All">Tous</MenuItem>
                <MenuItem value="Published">Publié</MenuItem>
                <MenuItem value="In process">En cours</MenuItem>
                <MenuItem value="Accepted">Accepter</MenuItem>
                <MenuItem value="Rejected">Refuser</MenuItem>
                <MenuItem value="Paid">Payer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titre de contribution</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {articlesData
                  .filter((article) =>
                  (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (article.nocontribution && article.nocontribution.toString().toLowerCase().includes(searchTerm.toLowerCase()))) &&
                  (statusFilter === 'All' || article.status === statusFilter)
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((article) => (
                <TableRow key={article.id}>
                  <TableCell style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                  <Typography variant="body1">
                    <a
                      href={`/article/${article.id}`}
                      style={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      {article.title}
                      <span style={{ visibility: 'hidden' }}>{" (" + article.nocontribution + ")"}</span>
                    </a>
                  </Typography>
                  </TableCell>
                  <TableCell>{getStatusColor(article.status)}</TableCell>
                  <TableCell>{renderActions(article.status, article.id)}</TableCell>
                </TableRow>
              ))}
                  <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={articlesData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Grid>
      </Grid>
      <RenderDialog 
        dialogInfo={dialogInfo}
        articlesData={articlesData}  
        handleCloseDialog={handleCloseDialog}
      />

    </Container>
  );
};

export default ArticlesPage;
