import React, { useState } from 'react';
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
  Stack
} from '@mui/material';
import Dot from 'components/@extended/Dot';

const articlesData = [
  { id: 1, title: 'Article 1', status: 'Publier' },
  { id: 2, title: 'Article 2', status: 'En cours' },
  { id: 3, title: 'Article 3', status: 'Publier' },
  { id: 4, title: 'Article 4', status: 'Verifier' },
  { id: 5, title: 'Article 5', status: 'Refuser' },
  { id: 6, title: 'Article 6', status: 'Refuser' },
];

const ArticlesPage = () => {
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, articlesData.length - page * rowsPerPage);

    const renderActions = (status) => {
      switch (status) {
        case 'Publier':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Archiver">Archiver</MenuItem>
                <MenuItem value="Supprimer">Supprimer</MenuItem>
              </Select>
            </FormControl>
          );
        case 'En cours':
          return null; 
        case 'Verifier':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Verifier">Continuer</MenuItem>
                <MenuItem value="Supprimer">Supprimer</MenuItem>
              </Select>
            </FormControl>
          );
        case 'Refuser':
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Actions">
                <MenuItem value="Reviser">Renvoyer</MenuItem>
                <MenuItem value="Supprimer">Supprimer</MenuItem>
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
    case "Verifier":
      color = 'warning';
      title = 'Verified';
      break;
    case "Publier":
      color = 'success';
      title = 'Approved';
      break;
    case "Refuser":
      color = 'error';
      title = 'Rejected';
      break;
    case "En cours":
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
    <Container>
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
                <MenuItem value="Publier">Publié</MenuItem>
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="Verifier">Verifier</MenuItem>
                <MenuItem value="Refuser">Refuser</MenuItem>
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
                  article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (statusFilter === 'All' || article.status === statusFilter)
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((article) => (
                <TableRow key={article.id}>
                  <TableCell style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                    <Typography variant="body1">
                      <a
                        href={`#/${article.id}`}
                        style={{ fontWeight: 'bold', textDecoration: 'none' }}
                      >
                        {article.title}
                      </a>
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusColor(article.status)}</TableCell>
                  <TableCell>{renderActions(article.status)}</TableCell>
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
    </Container>
  );
};

export default ArticlesPage;
