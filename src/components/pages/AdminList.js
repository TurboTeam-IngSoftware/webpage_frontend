import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField} from '@material-ui/core';
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';


const columns = [
  { id: 'nombre', label: 'Nombre', minWidth: 170 },
  { id: 'apellido', label: 'Apellido', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'role', label: 'Rol', minWidth: 100 },
];

function createData(nombre, apellido, email, role) {
  return { nombre, apellido, email, role };
}

const rows = [
  createData('Ken', 'Hervas', 'ken@herbas.com', '3'),
  createData('Patrick', 'Bruckner', 'pat@bruck.com', '2'),
  createData('Jordi', 'Ugarte', 'jordi@ugarte.com', '1'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 10,
  },
});

export default function AdminList() {
    const classes = useStyles();
    const [query, setQuery] = React.useState('');
    const handleChange = (event) => {
    setQuery(event.target.value);
  };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const next = (e) => {
    console.log('me voy a la siguiente')
  }
  return (
      <div>
        <div>
        <TextField
            label="Buscar"
            color="primary"
            variant="filled"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
            }}/>
    
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={query}
          onChange={handleChange}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'code'}>Code</MenuItem>
          <MenuItem value={'population'}>Population</MenuItem>
        </Select>
      </FormControl>


    </div>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    <Link to ='/crearusuario' >
           <ButtonComp 
                text={'Crear Usuario'}
                disabled={false}
                onClick={next}
             />
    </Link>
    </div>
  );
}
