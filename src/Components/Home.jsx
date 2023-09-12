import React from 'react';
import '../Components/css/home.css';
import photo from '../Media/imgA1.jpeg';
import photo1 from '../Media/financeur.webp';
import photo2 from '../Media/finance.jpg'
import photo3 from '../Media/etude.jpg'
import photo4 from '../Media/invest.jpg'
import photo5 from '../Media/realisation.jpg'

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
            <div className="carousel-container">
      <div className="mySlides animate">
        <img src={photo} alt='mon image'/>
        <div className="number">Votre plateforme de financement</div>
        <div className="text">
          <h5>
            InvestCop c'est une equipe compétente a votre service.
          </h5>
          <button className="suivant">
            <span className="button-content">Rejoignez-nous</span>
          </button>
        </div>
      </div>

      <div className="mySlides animate">
        <img
          src={photo}
        />
        <div className="number">Votre plateforme de financement</div>
        <div className="text">
          <h5>
            Un reseau bien etabli pour la réalisation de vos projet.
          </h5>

          <button className="suivant">
            <span className="button-content">Rejoignez-nous</span>
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
        <a href="/HTML/service.html" className="button-text">Voir plus</a>
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

      <div className="bgran-security">
        <div className="op-security">
          <h2>La sécurité de vos opérations en ligne</h2>
          <img src="" alt="" />
        </div>
        <div className="icons-op">
          <div className="icon-op">
            <h4>Banque numérique</h4>
            <img src="" alt="" />
          </div>
          <div className="icon-op">
            <h4>Transfert d'argents</h4>
            <img
              src=""
              alt=""
            />
          </div>
          <div className="icon-op">
            <h4>Prêts et paiements</h4>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </section>
    </>
    );
}

export default Home;