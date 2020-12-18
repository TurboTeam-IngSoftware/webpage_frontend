import './ArtiEditSec.css'
import React, { useState} from 'react'
import {TextField} from '@material-ui/core'
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
}));

function ArtiEditSect() {
    let history = useHistory();
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState("");
    const [descripcorta, setDescripCorta] = useState("");
    const [category, setCategory] = useState("Economía");
    const today = new Date();

    const validTitle = title.length >= 3;
    const validateShortDescription = descripcorta.length >= 30 && descripcorta.length <= 100;
    const validateContent = content.length >= 500 && content.length <= 3000;
    const validateCategory = category !== '';

   // function makeid(length) {
   //     var result = '';
   //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   //     var charactersLength = characters.length;
   //     for ( var i = 0; i < length; i++ ) {
   //        result += characters.charAt(Math.floor(Math.random() * charactersLength));
   //     }
   //     return result;
   // }

    const publish = () => {
        Axios.post("webpage_backend/posts", {
            title: title,
            shortDescription: descripcorta,
            description: content,
            author: localStorage.getItem('name')+" "+localStorage.getItem('lastnm'),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            photo: fileBase64String,
            category: category,
            revised: "0",
            video: "https://www.youtube.com/embed/"+video.split("=")[1],
    }).then((response) => {
        console.log(response);
    });
    history.push('/articulos');
    };

        const [selectetdFile, setSelectedFile] = useState([]);
        const [fileBase64String, setFileBase64String] = useState("");
      
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
            fullWidth
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
                    label="Rol"
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
            text={'Subir imagen'}
            onClick={encodeFileBase64(selectetdFile[0])}
        >
            Subir imagen
        </Button>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            text={'Actulizar'}
            onClick={publish}
        >
            Crear artículo
        </Button>
    </div>
   : <div>No Tiene Permisos</div> }
   </div>
    
    );
}
export default ArtiEditSect