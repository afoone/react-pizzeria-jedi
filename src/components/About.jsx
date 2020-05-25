import React, { Component } from "react";
import { TimelineLite } from "gsap";
import "../css/Styles.css";
import Iframe from 'react-iframe'

class About extends Component {
  constructor(props) {
    super(props);
    this.intro = React.createRef();
    this.content = React.createRef();
    this.audio = React.createRef();

    this.state = {
      muted: true
    };
  }

  componentDidMount() {
  
    const tl = new TimelineLite();
    
    
    tl.to(this.intro.current, 3.5, { opacity: 1, delay: 1 , })
      .to(this.intro.current, 0, {
        opacity: 0,delay: 0,
        onComplete: () => {
          this.audio.current.play();
      }
      })
  
      .to(this.content.current, 200, { top: "-170%" });
  }

  getRandomPosition() {
    const y = window.innerWidth;
    const x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
  }

  render() {
    
    return (
      <div className='fondo-estrellas'>
        <div className="container">
          <section className="intro" ref={this.intro}>
            <p>
              Hace mucho tiempo, en una galaxia , <br /> muy lejana....
          </p>
          </section>
          <section className="logo" ref={this.logo}>

          </section>
          <section className="crawl">
            <div className="content" ref={this.content}>
              <h1 className="title">PiZZa JEDi</h1>
              <h2 className="subtitle">Jabba el Hut said Yummy!! then died</h2>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>
                Un grupo de jedis que  empezaron a colaborar para la
                creacion de una pizzeria.
            </p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>
                Al ver que la gente  tenían gran apetito,
                crearon una plataforma para ofrecer pizzas en el mas puro stylo star wars.
            </p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>
                Esta plataforma fue lanzada en el 2020, así nació Pizza JEDDi
            </p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>COLABORADORES</p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>Jose Lazaro</p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>Paco Monleon</p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>Carlos Izquierdo</p>
              <p style={{fontFamily: "Open Sans" ,color:"rgb(229, 177, 58)"}}>Jose Navarro</p>
            </div>
          </section>
          <audio ref={this.audio}>
            <source
              type="audio/mpeg"
              src="https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star Wars Theme Song By John Williams.mp3"
            />
          </audio>
        </div>
        <footer className='footer'>
        <Iframe className='map-google' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.9546688747478!2d-0.3787810646427547!3d39.47035278797734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4c803ce47d%3A0x7b41ba5e9651bb00!2sCalle%20de%20la%20Sangre%2C%2015%2C%2046002%20Valencia!5e0!3m2!1ses!2ses!4v1590403162510!5m2!1ses!2ses" 
        width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></Iframe>
        </footer>
      </div>
    );
  }
}

export default About
