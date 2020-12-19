import React, { useState} from 'react';
import Axios from 'axios';
import {TextField} from '@material-ui/core';
import './LoginSect.css';
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function LoginSect() {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const next = (e) => {
        console.log('Me voy a la lista de usuarios')
    }

    const isAdmin = localStorage.getItem('role') === "1"
    const isEditor = localStorage.getItem('role') === "2"

    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function roleIdentificator() {
        const role = localStorage.getItem('role');
        if (role === "1") {
          return "Administrador";
        } else if (role === "2") {
          return "Editor";
        } else if (role === "3") {
          return "Revisor";
        } else {
          return "";
        }
      }

    const validateEmail = expression.test(String(email).toLowerCase());
    const validatePassword = password.length >= 8;

    const login = () => {
        Axios.post('webpage_backend/login', {
                "email": email,
                "password": password,
        }).then((response) => {
            console.log(response.data);
            if(response.data.status==='error'){
                console.log("No se pudo iniciar sesión");
                handleClickOpen();
            }else{
                console.log("Se pudo iniciar sesión");
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.data[0].roles)
                localStorage.setItem('name', response.data[0].names)
                localStorage.setItem('lastnm', response.data[0].lastnames)
                console.log(localStorage.getItem('role'))
                console.log(localStorage.getItem('name'))
                console.log(localStorage.getItem('lastnm'))
                window.location.reload();
            }
        });
    }

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

    const classes = useStyles();

    const logout = () => {
        localStorage.setItem('role', '');
        localStorage.setItem('name', '');
        localStorage.setItem('lastnm', '');
        window.location.reload();
    };
    const usuarios = () => {
        history.push('/listausuarios')
    };
    const crear = () => {
        history.push('/creararti')
    };
    if (localStorage.getItem('name') !== ''){
        return(
        <div class="main">
        <Container component="main" maxWidth="xs">
        <div class="paper">
           <h1>
               {localStorage.getItem("name") + " " + localStorage.getItem("lastnm")}
           </h1>
           <p>
                {roleIdentificator()}
           </p>
            {isAdmin &&
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.root}
                text={'Logout'}
                onClick={usuarios}
            >
                Usuarios
            </Button>
            }
            {(isEditor || isAdmin) &&
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.root}
                text={'Crear'}
                onClick={crear}
            >
                Crear artículo
            </Button>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.root}
                text={'Logout'}
                onClick={logout}
            >
                Cerrar Sesión
            </Button>
            </div>
        </Container>
    </div>
        )
    } else {
        return (
            <div class='main'>
            <Container component="main" maxWidth="xs">
                <div class='paper'>
                    <Typography component="h1" variant="h5">
                    Iniciar sesión
                    </Typography>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Dirección de correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        helperText={validateEmail ? "Correo electrónico válido" : "Correo electrónico inválido"}
                        error={!validateEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        helperText={validatePassword ? "Contraseña válida." : "Ingresa un formato válido de contraseña."}
                        error={!validatePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.root}
                        text={'Login'}
                        onClick={login}
                        disabled={!(validateEmail && validatePassword)}
                    >
                        Iniciar Sesión
                    </Button>
                    
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Inicio de sesión"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            El usuario o la contraseña no coinciden o son incorrectos.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Aceptar
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
            </div>
        )
    }
}

export default LoginSect
