import './ArtiEditSec.css'
import React, { useState} from 'react'
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import {TextField} from '@material-ui/core'


function ArtiEditSect() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState("");

    const publish = () => {
        //ACA VA EL CODIGO PARA PUBLICAR UN ARTICULO
        //Hay que poner el autor, la fehca, y el valor de no revisado automáticamente
        console.log('hiß')
    
    };

    return (
        <div className='containerArtiEdit'>
        <h1 className='title'>
            Nuevo Artículo
        </h1>
        <TextField
            type='text'
            label="Título"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            />
        <h1 className='content'>
            Contenido
        </h1>
        <TextField
          id="standard-textarea"
          label="Contenido"
          placeholder="Contenido"
          multiline
          fullWidth
        />
        <h1 className='extras'>
            Extras
        </h1>
        <TextField
            type='text'
            label="Link de video"
            color="primary"
            variant="filled"
            height="100%"
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            />
        <Link to ='/artireded' >
            <ButtonComp 
                text={'Publicar'}
                disabled={false}
                onClick={publish}
             />
        </Link>
    </div>
    )
}
export default ArtiEditSect