import React from 'react'
import homeimg from '../homeimg.png'
import './Home.css'

function Home() {
    return (
        <div className='homemain'>
            <img src={homeimg} alt='homeimg' className='homeimg'/>
        </div>
    )
}

export default Home
