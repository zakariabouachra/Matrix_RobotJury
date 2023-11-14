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
} from '@mui/material';
import 'assets/Styles/style.css';

const articlesData = [
  { id: 1, title: 'Article 1', status: 'Publier' },
  { id: 2, title: 'Article 2', status: 'En cours' },
  { id: 3, title: 'Article 3', status: 'Publier' },
  { id: 4, title: 'Article 4', status: 'Verifier' },
  { id: 5, title: 'Article 5', status: 'Revision' },
];

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, articlesData.length - page * rowsPerPage);

  const renderActions = (status) => {
    switch (status) {
      case 'Publier':
        return (
          <Select label="Actions">
            <MenuItem>Publier</MenuItem>
            <MenuItem>Archiver</MenuItem>
          </Select>
        );
      case 'En cours':
        return (
          <Select label="Actions">
            <MenuItem>Continuer</MenuItem>
          </Select>
        );
      case 'Verifier':
        return (
          <Select label="Actions">
            <MenuItem>Vérifier</MenuItem>
          </Select>
        );
      case 'Revision':
        return (
          <Select label="Actions">
            <MenuItem>Réviser</MenuItem>
          </Select>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Publier':
        return 'green';
      case 'En cours':
        return 'orange';
      case 'Revision':
        return 'red';
      case 'Verifier':
        return 'yellow';
      default:
        return 'black';
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mes Articles
      </Typography>
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
          <Grid item xs={6}>
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
                <MenuItem value="Revision">Révision</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <button onClick={handleSortOrderChange}>
              {sortOrder === 'asc' ? 'Trier A-Z' : 'Trier Z-A'}
            </button>
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
                {(rowsPerPage > 0
                  ? articlesData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : articlesData
                ).map((article) => (
                  <TableRow
                    key={article.id}
                    style={{ color: getStatusColor(article.status) }}
                  >
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
                    <TableCell style={{ color: getStatusColor(article.status) }}>
                      {article.status}
                    </TableCell>
                    <TableCell style={{ color: getStatusColor(article.status) }}>
                      {renderActions(article.status)}
                    </TableCell>
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
