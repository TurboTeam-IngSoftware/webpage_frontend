import './ArtiEditSec.css'
import React, { useState} from 'react'
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import {TextField} from '@material-ui/core'
import Axios from 'axios'


function ArtiEditSect() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState("");
    const [descripcorta, setDescripCorta] = useState("");
    const [imagen, setImagen] = useState("");
    const today = new Date();

    const publish = () => {
        Axios.post("http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts", {
            title: title,
            shortDescription: descripcorta,
            description: content,
            author: localStorage.getItem('name')+" "+localStorage.getItem('lastnm'),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            photo: "http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/storage/images/posts/serj.jpg",
            category: "economia",
            revised: "0",
            video: "https://www.youtube.com/embed/"+video.split("=")[1],
    }).then((response) => {
        console.log(response);
    });
    };
    
    const uploadImage = () => {
        const fd = new FormData();
        fd.append('image', this.state.imagen)
        Axios.post("http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts", fd)
        .then(res => {
            console.log(res);
        });

    
    }

  

    return (
        <div>
        { localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" ? 
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
             <TextField
            type='text'
            label="Descripción Corta"
            color="primary"
            variant="filled"
            onChange={(e) => {
                setDescripCorta(e.target.value);
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
          onChange={(e) => {
            setContent(e.target.value);
        }}
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
                setVideo(e.target.value);
            }}
            />
         
        <input 
        style={{display: 'none'}}
        type="file"
        onChange={(e) => {
            setImagen(e.target.value);
        }} 
        />
        <ButtonComp 
            text={'Subir imagen'}
            disabled={false}
            onClick={uploadImage}
            />
        <Link to ='/artireded' >
            <ButtonComp 
                text={'Publicar'}
                disabled={false}
                onClick={publish}
             />
        </Link>
    </div>
   : <div> No Tiene Permisos</div> }
   </div>
    
    );
}
export default ArtiEditSect