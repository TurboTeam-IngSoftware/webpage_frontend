import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        maxWidth: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControl: {
        margin: 10,
        minWidth: 120,
      },
    media: {
        height: 140,
    },
    gridList: {
        width: '100%',
        height: '100%',
        padding: 10,
    },
    card: {
        padding: 10,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function ArtiEdRevSect() {
    const [posts, setPosts]= useState([]);
    const classes = useStyles();
    useEffect(()=> {
        axios.get('http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts')
        .then (res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch (err => {
            console.log(err)
        }, [])
    })
    const history = useHistory();
    const [query, setQuery] = React.useState('');
    const handleChange = (event) => {
        setQuery(event.target.value);
      };

    const isLogged = localStorage.getItem('role') !== "";

    return (
        <div>
            {isLogged ?
        <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column', background:'bleachedalmond'}}>
              <TextField
            label="Buscar"
            color="primary"
            variant="filled"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
            }}/>


            <GridList cellHeight={300} className={classes.gridList} cols={3}>
                {posts.map(post =>   (

                    

                    <div className={classes.card}>
                        <Card className={classes.root}>
                            <CardActionArea className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={post.photo}
                                    title={post.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    {post.shortDescription}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => history.push({pathname: '/artpg', data: {idPost: post.idPost, title: post.title, shortDescription: post.shortDescription, description: post.description, author: post.author, date: post.date, photo: post.photo, category: post.category, revised: post.revised, video: post.video}})}>
                                    Ver más
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </GridList>
        </div>
        : <div> No Tiene Permisos</div> }
        </div>
    );
}

export default ArtiEdRevSect