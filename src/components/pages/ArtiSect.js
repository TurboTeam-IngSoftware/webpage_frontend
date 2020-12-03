import React from 'react'
import './ArtiSect.css'
import { useLocation } from "react-router-dom";

function ArtiSect() {

    const location = useLocation();

    const post = location.data;
    const linkvideo = 'https://www.youtube.com/embed/IHfs98k86EA';
    const author = post.author;
    const date = post.date;
    const title = post.title;
    const content = post.description;


    return (
        <>
            <div className='artmaincont'>
                <h1 className='arttitle'>{title}</h1>
                <strong className='author'>{author}</strong>
                <strong className='date'> {date}</strong>
                <iframe title='A video' width="560" height="315" src={linkvideo} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div className='body'> {content}</div>
            </div>
        </>
    )
}

export default ArtiSect
