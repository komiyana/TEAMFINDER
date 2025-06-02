import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/main.scss'
import logo from '../assets/valorant-logo.png'
import { Link } from 'react-router-dom'



const Landing = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
  }, [])

  return (
    <div className="landing" ref={containerRef}>
      <video autoPlay muted loop className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
      <img src={logo} alt="Valorant Logo" className="logo" />
      <h1>Welcome to Valorant</h1>
        <div className="menu">
          <button>Agents</button>
          <button>Maps</button>
          <button>Skins</button>
          <Link to="/play">
  <button>Play</button>
</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
