import React from 'react'
import './Header.css';

function Header() {
    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/header.png'} alt='headimg' className='headimg'/>
        </div>
    )
}

export default Header
