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
                    
                <li>Inscription</li>
                <li>Connexion</li>
            </ul>
            </nav>

            
        </div>
    );
}

export default NavBarHome;