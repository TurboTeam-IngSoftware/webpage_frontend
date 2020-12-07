import React, { useState} from 'react'
import Axios from 'axios'
import {TextField} from '@material-ui/core'
import ButtonComp from '../ButtonComp'
import './EditDeleteUser.css'
import Icon from '../userimg.png'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function EditDeleteUsers() {
    const location = useLocation();
    //Space for API functions
    const user = location.data
    const [emailReg, setEmailReg] = useState(user.email);
    const [namesReg, setNamesReg] = useState(user.names);
    const [lastNamesReg, setLastNamesReg] = useState(user.lastnames);
    const [passwordReg, setPasswordReg] = useState(user.password);
    const [roleReg, setRoleReg] = useState(user.roles);
    
   
   

    const editUser = () => {
        Axios.put('/webpage_backend/users', {
            idUser: user.idUser,
            email: emailReg,
            names: namesReg,
            lastnames: lastNamesReg,
            password: passwordReg,
            roles: roleReg,
    }).then((response) => {
        console.log(response);
    });
    };

    const deleteUser = () => {
        Axios.delete('/webpage_backend/users', {
            data:{
            idUser: user.idUser
            }
        }).then((response) => {
        console.log(response);
    });
    };
   

    return (
        <div className='containerdeledit'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Editar Usuario
            </h1>

            <TextField
            type='text'
            label="Email"
            defaultValue={user.email}
            color="primary"
            variant="filled"
            onChange={(e) => {
                setEmailReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Nombre"
            defaultValue={user.names}
            color="primary"
            variant="filled"
            onChange={(e) => {
                setNamesReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Apellido"
            defaultValue={user.lastnames}
            color="primary"
            variant="filled"
            onChange={(e) => {
                setLastNamesReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Contraseña"
            defaultValue={user.password}
            color="primary"
            variant="filled"
            onChange={(e) => {
                setPasswordReg(e.target.value);
            }}
            />
             <TextField
            type='text'
            label="Rol"
            defaultValue={user.roles}
            color="primary"
            variant="filled"
            onChange={(e) => {
                setRoleReg(e.target.value);
            }}
            />
        <Link to ='/listausuarios' >
            <ButtonComp 
                text={'Guardar Cambios'}
                disabled={false}
                onClick={editUser}
             />
        </Link>
        <Link to ='/listausuarios' >
            <ButtonComp 
                text={'Delete User'}
                disabled={false}
                onClick={deleteUser}
             />
        </Link>
        </div>
    )
}

export default EditDeleteUsers