import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import ButtonComp from '../ButtonComp'
import './LoginSect.css'
import Icon from '../userimg.png'

function LoginSect() {

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
        }
    });
    };

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

export default LoginSect
