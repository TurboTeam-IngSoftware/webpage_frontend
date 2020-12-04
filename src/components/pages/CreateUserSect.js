import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import ButtonComp from '../ButtonComp'
import './CreateUserSect.css'
import Icon from '../userimg.png'

function CreateUserSect() {

    //Space for API functions
    const [emailReg, setEmailReg] = useState("");
    const [namesReg, setNamesReg] = useState("");
    const [lastNamesReg, setLastNamesReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [roleReg, setRoleReg] = useState("");

    const createUser = () => {
        Axios.post('/webpage_backend/createUser', {
            email: emailReg,
            names: namesReg,
            lastnames: lastNamesReg,
            password: passwordReg,
            role: roleReg,
    }).then((response) => {
        console.log(response);
    });
    };

    return (
        <div className='containercreateuser'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Log In
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

            <ButtonComp 
                text={'Create User'}
                disabled={false}
                onClick={createUser}
             />
        </div>
    )
}

export default CreateUserSect
