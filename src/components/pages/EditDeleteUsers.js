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
    const [emailReg, setEmailReg] = useState("");
    const [namesReg, setNamesReg] = useState("");
    const [lastNamesReg, setLastNamesReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [roleReg, setRoleReg] = useState("");
    const user = location.data
   
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
        const url = '/webpage_backend/users/$'+user.idUser;
        console.log(url)
        Axios.delete(url).then((response) => {
        console.log(response);
    });
    };

    return (
        <div className='containerdeledit'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Editar Usuario
            </h1>
            <div>
                información actual:
            </div>
            <div>
                Email: {user.email}
            </div>
            <div>
                Nombre: {user.names}
            </div>
            <div>
                Apellido: {user.lastnames}
            </div>
            <div>
                Contraseña: {user.password}
            </div>
            <div>
                Rol: {user.roles}
            </div>

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