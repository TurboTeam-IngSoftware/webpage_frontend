import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import './LoginSect.css'
import Icon from '../userimg.png'
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function LoginSect() {
    const next = (e) => {
        console.log('Me voy a la lista de usuarios')
    }

    const isAdmin = localStorage.getItem('role') === "1"
    const isEditor = localStorage.getItem('role') === "2"


    let history = useHistory();
    //Space for API functions
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase());
    }

    const login = () => {
        if (validateEmail(email)) {
            Axios.post('/webpage_backend/login', {
                "email": email,
                "password": password,
            }).then((response) => {
                console.log(response.data);
                if(response.data.status==='error'){
                    console.log("No se pudo iniciar sesión");
                    handleClickOpen();
                }else{
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('role', response.data[0].roles)
                    localStorage.setItem('name', response.data[0].names)
                    localStorage.setItem('lastnm', response.data[0].lastnames)
                    console.log(localStorage.getItem('role'))
                    console.log(localStorage.getItem('name'))
                    console.log(localStorage.getItem('lastnm'))
                    history.push('/')
                }
            });
        } else {
            //TODO Show warning
        }
        
    };

    const logout = () => {
        localStorage.setItem('role', '')
        localStorage.setItem('name', '')
        localStorage.setItem('lastnm', '')
        console.log(localStorage.getItem('role'))
        console.log(localStorage.getItem('name'))
        console.log(localStorage.getItem('lastnm'))
    
    };
    if (localStorage.getItem('name') !== ''){
        console.log('estoy aca')
        return (
            <div className='containerlogin'>
            <img src={Icon} alt='icon' className='icon'/>
           <h1 className='title'>
               Log Out
           </h1> 
           <Link to ='/login' >
           <ButtonComp 
                text={'Logout'}
                disabled={false}
                onClick={logout}
             />
             </Link>
             <Link to ='/artireded' >
           <ButtonComp 
                text={'Todos los Artículos'}
                disabled={false}
                onClick={next}
             />
             </Link>
             {isAdmin &&
             <Link to ='/listausuarios' >
           <ButtonComp 
                text={'Ver Usuarios'}
                disabled={false}
                onClick={next}
             />
             </Link>}
             {isEditor &&
             <Link to ='/creararti' >
           <ButtonComp 
                text={'Crear Artículo'}
                disabled={false}
                onClick={next}
             />
             </Link>}
             </div>
        )
        }else{
    return (
        <div className='containerlogin'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Log In
            </h1>
            <TextField
            label="Email"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            />
            <TextField
            label="Contraseña"
            color="primary"
            variant="filled"
            type="password"
            onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <ButtonComp 
                text={'Login'}
                disabled={false}
                onClick={login}
             />
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
    )
    }
}

export default LoginSect
