import React, {useEffect, useState} from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


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

  const isLogged = localStorage.getItem('role') !== "";

  const [users, setUsers]= useState([]);
    useEffect(()=> {
        axios.get('/webpage_backend/users')
        .then (res => {
            console.log(res)
            setUsers(res.data)
        })
        .catch (err => {
            console.log(err)
        }, [])
    })
    const history = useHistory();

    const classes = useStyles();
    
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
      { isLogged ? 
      <div>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  ID
             </TableCell>
             <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  Nombre
             </TableCell>
             <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  Apellido
             </TableCell>
             <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  Email
             </TableCell>
             <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  Roles
             </TableCell>
             <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  Opciones
             </TableCell>

          </TableHead> 
          <TableBody>
              {users.map((user) => (
                <TableRow
                  align={'center'}
                  style={{ minWidth: 100 }}
                >
                  <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  {user.idUser}
                  </TableCell>
                  <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  {user.names}
                  </TableCell>
                  <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  {user.lastnames}
                  </TableCell>
                  <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  {user.email}
                  </TableCell>
                  <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  {user.roles}
                  </TableCell>
                  <TableCell align={'center'}
                  style={{ minWidth: 100 }}>
                  <ButtonComp 
                text={'Editar Usuario'}
                disabled={false}
                onClick={() => history.push({pathname: '/edicionusuario', data: {idUser: user.idUser, email: user.email, names: user.names, lastnames: user.lastnames, password: user.password, roles: user.roles}})}
                 />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
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
    : <div> No Tiene Permisos</div>
              }
    </div>
  );
}
