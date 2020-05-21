import React, { Component } from "react";
import { TimelineLite, Power2 } from "gsap";
import "../css/Styles.css";

class About extends Component {
  constructor(props) {
    super(props);
    this.intro = React.createRef();
    this.logo = React.createRef();
    this.content = React.createRef();
    this.audio = React.createRef();

    this.state = {
      muted: true
    };
  }

  componentDidMount() {
    const numStars = 300;
    const root = document.getElementById("root");
    for (let i = 0; i < numStars; i++) {
      let star = document.createElement("div");
      star.className = "star";
      var xy = this.getRandomPosition();
      star.style.top = xy[0] + "px";
      star.style.left = xy[1] + "px";
      root.appendChild(star);
    }

    const tl = new TimelineLite();
    tl.to(this.intro.current, 4.5, { opacity: 1, delay: 1 })
      .to(this.intro.current, 1.5, {
        opacity: 0,
        onComplete: () => {
          this.audio.current.play();
        }
      })
      .set(this.logo.current, { opacity: 1, scale: 2.75, delay: 0.5 })
      .to(this.logo.current, 8, { scale: 0.05, ease: Power2.easeOut })
      .to(this.logo.current, 1.5, { opacity: 0 }, "-=1.5")
      .to(this.content.current, 200, { top: "-170%" });
  }

  getRandomPosition() {
    const y = window.innerWidth;
    const x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
  }

  onVolumeClick = () => {
    if (this.state.muted) {
      this.audio.current.muted = false;
    } else {
      this.audio.current.muted = true;
    }

    this.setState({ muted: !this.state.muted });
  };

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
              <p>
                Un grupo de jedis que  empezaron a colaborar para la
                creacion de una pizzeria.
            </p>
              <p>
                Al ver que la gente  tenían gran apetito,
                crearon una plataforma para ofrecer pizzas en el mas puro stylo star wars.
            </p>
              <p>
                Esta plataforma fue lanzada en el 2020, así nació Pizza JEDDi
            </p>
              <p>COLABORADORES</p>
              <p>Jose Lazaro</p>
              <p>Paco Monleon</p>
              <p>Carlos Izquierdo</p>
              <p>Jose Navarro</p>
            </div>
          </section>
          <audio ref={this.audio}>
            <source
              type="audio/mpeg"
              src="https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star Wars Theme Song By John Williams.mp3"
            />
          </audio>
          <button className="volume" type="button" onClick={this.onVolumeClick}>

          </button>
        </div>
      </div>
    );
  }
}

export default About
