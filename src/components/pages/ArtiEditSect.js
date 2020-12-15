import './ArtiEditSec.css'
import React, { useState} from 'react'
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import {TextField} from '@material-ui/core'
import Axios from 'axios'
import Typography from '@material-ui/core/Typography';

function ArtiEditSect() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState("");
    const [descripcorta, setDescripCorta] = useState("");
    const [imagen, setImagen] = useState("");
    const today = new Date();

    const validTitle = title.length >= 3;
    const validateShortDescription = descripcorta.length >= 30 && descripcorta.length <= 100;
    const validateContent = content.length >= 500 && content.length <= 3000;

    const publish = () => {
        Axios.post("webpage_backend/posts", {
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
        Axios.post("webpage_backend/posts", fd)
        .then(res => {
            console.log(res);
        });
    }

    return (
        <div>
        { localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" ? 
        <div className='containerArtiEdit'>
        <Typography component="h1" variant="h5">
            Creción de artículo
        </Typography>         
        <TextField
            variant="outlined"
            margin="normal"
            required
            id="title"
            label="Título"
            name="email"
            autoComplete="title"
            autoFocus
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            helperText={validTitle ? "Título válido" : "Título inválido"}
            error={!validTitle}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            id="short"
            label="Descripción corta"
            name="email"
            autoComplete="short"
            autoFocus
            onChange={(e) => {
                setDescripCorta(e.target.value);
            }}
            helperText={validateShortDescription ? "Descripción válida" : "La descripción debe ser de 30 a 100 caracteres."}
            error={!validateShortDescription}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Contenido"
            name="content"
            autoComplete="content"
            autoFocus
            multiline
            rows={20}
            rowsMax={40}
            onChange={(e) => {
                setContent(e.target.value);
            }}
            helperText={validateContent ? "" : "El contenido debe tener de 500 a 300 caracteres."}
            error={!validateContent}
        />
        <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='video'
            type='url'
            label="Link de video (opcional)"
            color="primary"
            height="100%"
            onChange={(e) => {
                setVideo(e.target.value);
            }}
            />
         //Subir imagenes   
        <input 
        style={{display: 'none'}}
        type="file"
        onChange={(e) => {
            setImagen(e.target.value);
        }} 
        //ref={fileInput => this.fileInput = fileInput}
        />
         <ButtonComp 
            text={'Seleccionar imagen'}
            disabled={false}
            onClick={() => this.fileInput.click()}
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