import React from 'react';
import '../users/navbaruser.css'

function NavBarUser() {
    return (
        <div className='navUser'>
            <nav>
                <h1>InvestCop</h1>
                <ul>
                    <li>Projet</li>
                    <li>Activité</li>
                    <li>Notification</li>
                </ul>
                <div className="profil">
                    <h2>
                        profil
                    </h2>
                </div>
            </nav>
        </div>
    );
}

export default NavBarUser;