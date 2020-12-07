import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import './LoginSect.css'
import Icon from '../userimg.png'
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

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

    const login = () => {
        Axios.post('/webpage_backend/login', {
            "email": email,
            "password": password,
    }).then((response) => {
        console.log(response.data);
        if(response.data.status==='error'){
            console.log("im an error")
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
        </div>
    )
    }
}

export default LoginSect
