import React from 'react';
import '../Components/css/footer.css'

function Footer(props) {
    return (
        <div className='footer_zone'>
            <p>Se faire investir n'a jamais été aussi simple</p>

            <div className="details_footer">
                <div className="logo-icon">
                    <div className="logo">
                    <h1>InvestCop</h1>
                    </div>
                    <div className="icon">
                    <i class="fa-brands fa-x-twitter"></i>  
                    <i class="fa-brands fa-linkedin-in"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-facebook-f"></i>
                    </div>
                </div>

                <div className="about">
                    <ul>
                        <li>Acionnaire</li>
                        <li>Investisseurs</li>
                        <li>Finance</li>
                        <li>Votre impact</li>
                    </ul>
                </div>

                <div className="about">
                    <ul>
                        <li>InvestCop</li>
                        <li>Partenaire</li>
                        <li>Contacts</li>
                        <li>Politique</li>
                    </ul>
                </div>

                <div className="conseil">
                    <h2>Créer et Réaliser</h2>
                    <p>Copyright 2022</p>

                    <p>Cette plateforme à été créée dans le  but de promouvoir le développement et la réalisation de projet pouvant  profiter à tout les membres de la société selon leur avantages vis-à-vis de cette population.</p>
                </div>
            </div>
            
        </div>
    );
}

export default Footer;