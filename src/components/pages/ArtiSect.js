import React from 'react'
import './ArtiSect.css'

function ArtiSect() {
    
    const linkvideo = 'https://www.youtube.com/embed/ufIFYAGLZ-Y';
    const author = 'Juan Perez';
    const date = 'Octubre 5, 2020';
    const title = 'Ipsum Lorem';
    const content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
    
    return (
        <>
            <div className='artmaincont'>
                <h1 className='arttitle'>{title}</h1>
                <strong className='author'>{author}</strong>
                <strong className='date'> {date}</strong>
                <iframe title='A video' width="560" height="315" src={linkvideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div className='body'> {content}</div>
            </div>
        </>
    )
}

export default ArtiSect
