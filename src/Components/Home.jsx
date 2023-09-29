import React from 'react';
import '../Components/css/home.css';
import photo from '../Media/imgA1.jpeg';
import photo1 from '../Media/financeur.webp';
import photo2 from '../Media/finance.jpg'
import photo3 from '../Media/etude.jpg'
import photo4 from '../Media/invest.jpg'
import photo5 from '../Media/realisation.jpg'
import logo1 from '../Media/logo1.jpg'
import logo2 from '../Media/logo2.jpg'
import logo3 from '../Media/logo3.jpg'
import logo4 from '../Media/logo4.jpg'
import logo5 from '../Media/logo5.jpg'
import logo6 from '../Media/logo6.jpg'
import logo7 from '../Media/logo7.jpg'
import logo8 from '../Media/logo8.jpg'
import logo9 from '../Media/logo9.jpg'
import logo10 from '../Media/logo10.jpg'
import Service from './Service';
import NavBarHome from './NavBarHome';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Home() {
    
    let slideIndex = 0;
// showSlides();

// Next-previous control
function nextSlide() {
  slideIndex++;
  showSlides();
  timer = _timer; // reset timer
}

function prevSlide() {
  slideIndex--;
  showSlides();
  timer = _timer;
}

// Thumbnail image controlls
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
}

function showSlides() {
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dots");

  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  // hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  // show one slide base on index number
  slides[slideIndex].style.display = "block";

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[slideIndex].classList.add("active");
}

// autoplay slides --------
let timer = 7; // sec
const _timer = timer;

// this function runs every 1 second
setInterval(() => {
  timer--;

  if (timer < 1) {
    nextSlide();
    timer = _timer; // reset timer
  }
}, 1000);


    return (
        <>
        < NavBarHome />
        <div className="rootHome">

        <div className="carousel-container">
      <div className="mySlides animate">
        <img src={photo} alt='mon image'/>
        <div className="number">Votre plateforme de financement de projet professionnelle.</div>
        <div className="text">
          <h5>
            InvestCop c'est une equipe compétente a votre service.
          </h5>
          <button className="suivant">
          <span className="button-content"><Link to="/register">Rejoignez-nous</Link></span>
          </button>
        </div>
      </div>

      <div className="mySlides animate">
        <img
          src={photo}
        />
        <div className="number">Votre plateforme de financement de projet professionnelle.</div>
        <div className="text">
          <h5>
            Un reseau bien etabli pour la réalisation de vos projet.
          </h5>

          <button className="suivant">
            <span className="button-content"><Link to="/register">Rejoignez-nous</Link></span>
          </button>
        </div>
        </div>
      </div>
      {/* <!-- Next and previous buttons --> */}
      <a className="prev" onclick="prevSlide()">&#10094;</a>
      <a className="next" onclick="nextSlide()">&#10095;</a>

      {/* <!-- The dots/circles --> */}
      <div className="dots-container">
        <span className="dots" onclick="currentSlide(1)"></span>
        <span className="dots" onclick="currentSlide(2)"></span>
      </div>
    
    <section className="main-acc">
      <div className="inff-serv">
        <h2>
          Prenez vos projet en main peu importe vos moyens grâce à InvestCop
        </h2>
        <div className="barre"></div>
      </div>
      <div className="carte-acc">
        <div className="form-acc">
          <h4>Financement</h4>
          <img src={photo4} alt="" />
          <p>
            Notre équipe et nos partenaire vous donneront la chance de réaliser votre projet. <br/><br />
            Nous investissons dans vos projet.
          </p>
        </div>
        <div className="form-acc">
          <h4>Réalisation</h4>
          <img src={photo5} alt="" />
          <p>Nous nous engageons à réaliser votre projet le plus concret. <br /><br />Une prise en charge complète de notre projet.</p>
        </div>
        <div className="form-acc">
          <h4>Etude et suivi de projet</h4>
          <img src={photo3} alt="" />
          <p>Nous vous accompagneons pour réaliser vos projects.<br/>
          De l'étude à sa réalisation de ceux-ci</p>
        </div>
      </div>
      <button className="learn-more">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <a href="#section_info" className="button-text">Voir plus</a>
      </button>
      
      <div className="dec-puce">
        <div className="bloc-texte">
          <p>Notre stratégie de financement repose sur l'engagement coopératif entre les acteurs.</p>
        </div>
        <div className="card-el">
          <div className="form-puce">
            <img src={photo1} alt="" />
          </div>
          <div className="form-puce">
            <img src={photo2} alt="" />
          </div>
        </div>
      </div>

      
    </section>

    <section id='section_info'>
    < Service />

<div className="partenaires">
  <h1>Entreprise partenaire</h1>
</div>
<div>
<marquee  className="marquee_left">
<img src={logo1} alt="" />
<img src={logo2} alt="" />
<img src={logo3} alt="" />
<img src={logo4} alt="" />
<img src={logo5} alt="" />
</marquee>
</div>

<div>
<marquee direction='right'>
<img src={logo6} alt="" />
<img src={logo7} alt="" />
<img src={logo8} alt="" />
<img src={logo9} alt="" />
<img src={logo10} alt="" />
</marquee>
</div>
    </section>

      <div className="newsLetter">
        <h1>NewsLetter</h1>

        <div className="text_news">
          <p>Rester informé de nos actualité. <br /><br />Vous ne voulez rien manqué de nos plus belle offres de financement pour pas passer à côté d'une chance ?. Laisser votre email pour recevoir nos notification.</p>
          <input type="email" placeholder='utilisateur@gmail.com'/><button type='submit'>Envoyer</button>
        </div>
      </div>
        </div>
            
    < Footer />
    </>
    );
}

export default Home;