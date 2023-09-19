import React from 'react';
import '../Components/css/navBar.css'
import { Link } from 'react-router-dom';

function NavBarHome(props) {
    return (
        <div className='header_nav'>
            <nav>
                <div className="logo">
                    <h1>InvestCop</h1>
                </div>

                <ul>
                    
                   
                <li>< Link to='/register'>Inscription</Link></li>
                <li>< Link to='/login'>Connexion</Link></li>
            </ul>
            </nav>

            
        </div>
    );
}

export default NavBarHome;