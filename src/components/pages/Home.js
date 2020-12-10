import React from 'react'
import './Home.css'

function Home() {
    return (
        <div className='homemain'>
            <h1> TEsdt</h1>
            <img src={process.env.PUBLIC_URL + '/homeimg.png'} alt='homeimg' className='homeimg'/>
        </div>
    )
}

export default Home
