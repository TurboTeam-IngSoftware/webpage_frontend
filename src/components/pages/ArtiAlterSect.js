import './ArtiEditSec.css'
import React, { useState} from 'react'
import {TextField} from '@material-ui/core'
import { useLocation } from "react-router-dom";
import Axios from 'axios'
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    submit: {
        marginTop: 30,
        margin: 'auto',
        width: 'auto',
    }
  }));

function ArtiAlterSect() {
    let history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    const post = location.data;
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.description);
    const [video, setVideo] = useState(post.video);
    const [descripcorta, setDescripCorta] = useState(post.shortDescription);
    const [category, setCategory] = useState("Economía");
    const validateCategory = category !== '';
    const today = new Date();

    const validTitle = title.length >= 3;
    const validateShortDescription = descripcorta.length >= 30 && descripcorta.length <= 100;
    const validateContent = content.length >= 500 && content.length <= 3000;

    const [selectetdFile, setSelectedFile] = useState([]);
    const [fileBase64String, setFileBase64String] = useState(post.photo);
  
    const onFileChange = (e) => {
      setSelectedFile(e.target.files);
      console.log(e.target.files[0]);
      console.log(e.target.files[0].name);
      console.log(e.target.files[0].size);
      console.log(e.target.files[0].type);
    };
  
    const encodeFileBase64 = (file) => {
      var reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          var Base64 = reader.result;
          console.log(Base64);
          setFileBase64String(Base64);
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
    };
    var vidtemp = post.video;
    const update = () => {
        
        if(post.video !== video){
           vidtemp = "https://www.youtube.com/embed/"+video.split("=")[1];
        }
        Axios.put("webpage_backend/posts", {
            idPost: post.idPost,
            title: title,
            shortDescription: descripcorta,
            description: content,
            author: localStorage.getItem('name')+" "+localStorage.getItem('lastnm'),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            photo: fileBase64String,
            category: category,
            revised: "0",
            video: vidtemp,
        }).then((response) => {
            console.log(response);
        });
        history.push('/articulos');
    };

    return (
        <div>
        {localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" ? 
        <div className='containerArtiEdit'>
        <Typography component="h1" variant="h5">
            Edición de artículo
        </Typography>         
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            defaultValue={title}
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
            fullWidth
            defaultValue={descripcorta}
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
            defaultValue={content}
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
            defaultValue = {video}
            type='url'
            label="Link de video (opcional)"
            color="primary"
            height="100%"
            onChange={(e) => {
                setVideo(e.target.value);
            }}
            />
        <input 
        
        type="file"
        onChange={onFileChange} 
 
        />
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Categoría</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={category === "1" ? "Economía" : "Historia"}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                    label="Categoria"
                    error={!validateCategory}
                >
                <MenuItem value={1}>Economía</MenuItem>
                <MenuItem value={2}>Historia</MenuItem>
            </Select>
        </FormControl>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            text={'Actulizar'}
            onClick={encodeFileBase64(selectetdFile[0]), update}
        >
            Actualizar
        </Button>
    </div>
    : <div> No Tiene Permisos</div> }
        </div>
    );
}
export default ArtiAlterSect