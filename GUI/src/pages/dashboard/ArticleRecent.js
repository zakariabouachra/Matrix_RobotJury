import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Dot from 'components/@extended/Dot';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Titre de contribution'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  }
];

function ArticleTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ArticleTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const ArticleStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 'Accepted':
      color = 'warning';
      title = 'Accepted';
      break;
    case 'Published':
      color = 'success';
      title = 'Published';
      break;
    case 'Paid':
      color = 'success';
      title = 'Paid';
      break;
    case 'Rejected':
      color = 'error';
      title = 'Rejected';
      break;
    case 'In process':
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

ArticleStatus.propTypes = {
  status: PropTypes.string
};

export default function ArticleTable({ articlesData }) {
  const [order] = useState('desc'); // Tri par ordre décroissant
  const [orderBy] = useState('createdAt'); // Remplacez 'createdAt' par la propriété appropriée
  const [selected] = useState([]); // Définir la variable selected

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Triez les articles par ordre décroissant en fonction de 'createdAt'
  const sortedArticles = stableSort(articlesData, getComparator(order, orderBy));

  // Utilisez slice pour obtenir les 5 derniers articles
  const latestArticles = sortedArticles.slice(-5);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <ArticleTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {latestArticles.map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <ArticleStatus status={row.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
