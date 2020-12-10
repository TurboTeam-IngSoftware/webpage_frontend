import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import ButtonComp from '../ButtonComp'
import './CreateUserSect.css'
import Icon from '../userimg.png'
import { Link } from 'react-router-dom';

function CreateUserSect() {

    //Space for API functions
    const [emailReg, setEmailReg] = useState("");
    const [namesReg, setNamesReg] = useState("");
    const [lastNamesReg, setLastNamesReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [roleReg, setRoleReg] = useState("");

    const isLogged = localStorage.getItem('role') !== "";

    const createUser = () => {
        Axios.post('/webpage_backend/users', {
            email: emailReg,
            names: namesReg,
            lastnames: lastNamesReg,
            password: passwordReg,
            roles: roleReg,
    }).then((response) => {
        console.log(response);
    });
    };

    return (
        <div>
            {isLogged ?
        <div className='containercreateuser'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Crear Usuario
            </h1>

            <TextField
            type='text'
            label="Email"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setEmailReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Nombre"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setNamesReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Apellido"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setLastNamesReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Contraseña"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setPasswordReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Rol"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setRoleReg(e.target.value);
            }}
            />
        <Link to ='/listausuarios' >
            <ButtonComp 
                text={'Create User'}
                disabled={false}
                onClick={createUser}
             />
        </Link>
        </div>
        : <div> No Tiene Permisos</div> }
        </div>
    );
}

export default CreateUserSect
