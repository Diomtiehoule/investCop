import React from 'react';
import '../users/profil.css'
import NavBarUser from './NavBarUser'

function Profil(props) {
    return (
        <div>
            <NavBarUser />
            <div className="profil_user">
                     <div className="avatar_user">

                </div>
                <div className="information_user">
                    <p>Nom : </p>
                    <p>Email : </p>
                    <p>Pays : </p>
                    <p>Ville : </p>
                    <p>Projet : </p>
                </div>
               
            </div>
            
        </div>
    );
}

export default Profil;