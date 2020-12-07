import './ArtiEditSec.css'
import React, { useState} from 'react'
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import {TextField} from '@material-ui/core'
import { useLocation } from "react-router-dom";
import Axios from 'axios'


function ArtiAlterSect() {
    
    const location = useLocation();
    const post = location.data;
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.description);
    const [video, setVideo] = useState(post.video);
    const [descripcorta, setDescripCorta] = useState(post.shortDescription);
    const today = new Date();
   

    const publish = () => {
        Axios.put("/webpage_backend/posts", {
            idPost: post.idPost,
            title: title,
            shortDescription: descripcorta,
            description: content,
            author: localStorage.getItem('name')+" "+localStorage.getItem('lastnm'),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            photo: "http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/storage/images/posts/serj.jpg",
            category: "economia",
            revised: "0",
            video: video,
    }).then((response) => {
        console.log(response);
    });
    };
    

    return (
        <div className='containerArtiEdit'>
        <h1 className='title'>
            Editando Artículo
        </h1>
        <TextField
            type='text'
            defaultValue={post.title}
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
        defaultValue={post.shortDescription}
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
          defaultValue={post.description}
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
            defaultValue={post.video}
            color="primary"
            variant="filled"
            height="100%"
            onChange={(e) => {
                setVideo(e.target.value);
            }}
            />
        <Link to ='/artireded' >
            <ButtonComp 
                text={'Actualizar'}
                disabled={false}
                onClick={publish}
             />
        </Link>
    </div>
    )
}
export default ArtiAlterSect