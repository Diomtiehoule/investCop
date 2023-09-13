import React from 'react';
import '../Components/css/service.css'
import photo from '../Media/analyse.jpg'
import photo1 from '../Media/business.jpg'
import photo2 from '../Media/growth.jpg'
import photo3 from '../Media/date.jpg'

function Service() {
    return (
        <>
    <div className="main-body">

      <div className="head-serv">
        <h1>Nos service</h1>
        <p>Nous répondons à vos besoins les plus profonds de réalisation en vous proposant des fonds et des option d'accompagnement adaptées à votre projet.</p>
      </div>

        <div className="color-service">
        <div className="info-serv">
        <h2>Faciliter les opération pour la concrétisation de votre projet</h2>
            <p>Chez InvestCop,  Nous étudions tout vos projet soumit depuis votre plateforme <br/> 
          individuels en tant que client , mettons des fonds à votre dispositionp <br/> 
          et une fine équipe pour vous assister dans la reussite de celui-ci.</p>
      </div>
      
      <div className="cartes-infos">
        <div className="carte-s">

          <div className="cart-e">
            <img src={photo} alt="" />
            <p>Des analyses approfondites de vos projet pour en exploiter le potentiel optimal.</p>
          </div>
          <div className="cart-e">
            <img src={photo1} alt="" />
            <p>Rendre les rendements très élevé et installer votre projet.</p>
          </div>
          <div className="cart-e">
            <img src={photo2} alt="" />
            <p>Assistance et evolution du projet une fois mise en place avec accord du propriétaire de projet.</p>
          </div>
        </div>
      
        </div>
      </div>
    </div>
</>
    );
}

export default Service;