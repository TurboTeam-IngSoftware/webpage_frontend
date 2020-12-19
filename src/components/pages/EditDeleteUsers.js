import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './EditDeleteUser.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        background: (props) =>
          props.color === 'red'
            ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: (props) =>
          props.color === 'red'
            ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
            : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
      },
}));

function EditDeleteUsers() {
    const location = useLocation();
    const classes = useStyles();
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const history = useHistory();
    const user = location.data;
    const [email, setEmail] = useState(user.email);
    const [names, setNames] = useState(user.names);
    const [lastNames, setLastNames] = useState(user.lastnames);
    const [password, setPassword] = useState(user.password);
    const [reTypedPassword, setReTypedPassword] = useState("");
    const [role, setRole] = useState(user.role);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

    const validateEmail = expression.test(String(email).toLowerCase());
    const validatePassword = password.length >= 8;
    const validateReTypedPassword = password === reTypedPassword;
    const validateNames = names.length >= 2;
    const validateLastnames = lastNames.length >= 2;
    const validateRole = role !== '0';

    const editUser = () => {
        Axios.put('webpage_backend/users', {
            idUser: user.idUser,
            email: email,
            names: names,
            lastnames: lastNames,
            password: password,
            roles: role,
    }).then((response) => {
        console.log(response);
        history.push('/listausuarios');
    });
    };

    
    const deleteUser = () => {
        Axios.delete('webpage_backend/users', {
            data:{
                idUser: user.idUser
            }
        }).then((response) => {
        console.log(response);
        if (user.email === email) {
            localStorage.setItem('role', '');
            localStorage.setItem('name', '');
            localStorage.setItem('lastnm', '');
            history.push('/login');
            window.location.reload();
        } else {
            history.push('/listausuarios');
        }
    });
    };
   

    return (
        <div class='main'>
        <Container component="main" maxWidth="xs">
        <div class='paper'>
            {localStorage.getItem("role") === "1" ?
                <div>
                    <Typography component="h1" variant="h5">
                    Editar usuario
                    </Typography>
                    <TextField
                        type='text'
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        defaultValue={user.email}
                        label="Dirección de correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={validateEmail ? "Correo electrónico válido" : "Correo electrónico inválido"}
                        error={!validateEmail}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        type='text'
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="names"
                        defaultValue={user.names}
                        label="Nombres"
                        name="names"
                        autoComplete="names"
                        autoFocus
                        helperText={validateNames ? "Nombre válido" : "Nombre inválido"}
                        error={!validateNames}
                        onChange={(e) => {
                            setNames(e.target.value);
                        }}
                    />
                    <TextField
                        type='text'
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastnames"
                        defaultValue={user.lastnames}
                        label="Apellidos"
                        name="lastnames"
                        autoComplete="lastnames"
                        autoFocus
                        helperText={validateLastnames ? "Apellidos válidos" : "Apellidos inválidos"}
                        error={!validateLastnames}
                        onChange={(e) => {
                            setLastNames(e.target.value);
                        }}
                    />
                    <TextField
                        type='password'
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        defaultValue={user.password}
                        label="Contraseña"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        helperText={validatePassword ? "Contraseña válida" : "Contraseña inválida"}
                        error={!validatePassword}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <TextField
                        type='password'
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password-re"
                        label="Repite la contraseña"
                        name="password-re"
                        autoComplete="password-re"
                        autoFocus
                        helperText={validateReTypedPassword ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                        error={!validateReTypedPassword}
                        onChange={(e) => {
                            setReTypedPassword(e.target.value);
                        }}
                    />
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Rol</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value);
                            }}
                            label="Rol"
                            error={!validateRole}
                        >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Editor</MenuItem>
                        <MenuItem value={3}>Revisor</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.root}
                        text={'Crear usuario'}
                        onClick={editUser}
                        disabled={!(validateEmail && validatePassword && validateReTypedPassword && validateNames && validateLastnames)}
                    >
                        Actulizar usuario
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="red"
                        className={classes.root}
                        text={'Crear usuario'}
                        onClick={handleClickOpen}
                        disabled={false}
                    >
                        Eliminar Usuario
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Error al crear usuario"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro que quiere eliminar el usuario?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={deleteUser} color="primary" autoFocus>
                            Aceptar
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Cancelar
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div> : <div><p>No tiene permisos para realizar esta función</p></div>}
            </div>
        </Container>
        </div>
    )
}

export default EditDeleteUsers