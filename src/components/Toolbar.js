import React from 'react'; 
import { Link } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = props => (
    <header className='toolbar'>
        <nav className='toolbarnav'>
            <div>

            </div>
            <div className='toolbarnavitems'>
                <ul>
                    <li>
                <Link
                  to='/articulos'
                >
                  Artículos
                </Link>
                    </li>
                    <li>
                <Link
                  to='/home'
                >
                  Home
                </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;