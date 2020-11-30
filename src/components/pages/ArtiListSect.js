import React, {useEffect, useState} from 'react'
import axios from 'axios'

function ArtiListSect() {
    const [posts, setPosts]= useState([])

    useEffect(()=> {
        axios.get('http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts.php')
        .then (res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch (err => {
            console.log(err)
        }, [])
    })
    return (
        <div>
            <ul>
             {posts.map(post => (<li key={post.idPost}>{post.title}</li>))}
            </ul>
        </div>
    )
}

export default ArtiListSect
