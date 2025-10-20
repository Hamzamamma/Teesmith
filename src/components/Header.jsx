import { useState } from 'react'
import Logo from './Logo'
import '../styles/header.css'

export default function Header() {
  const [menuActive, setMenuActive] = useState(false)

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  const closeMenu = () => {
    setMenuActive(false)
  }

  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      closeMenu()
      
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Logo />
          
          <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
            <li><a href="../aboutus/index.html" onClick={closeMenu}>About us</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>Services</a></li>
            <li><a href="#cases" onClick={(e) => scrollToSection(e, '#cases')}>Use Cases</a></li>
            <li><a href="../pricing/index.html" onClick={closeMenu}>Pricing</a></li>
            <li><a href="#blog" onClick={closeMenu}>Blog</a></li>
            <li><a href="#contact" className="btn-nav" onClick={(e) => scrollToSection(e, '#contact')}>Request a quote</a></li>
          </ul>

          <button className="hamburger" aria-label="Menu" onClick={toggleMenu}>
            <span style={{
              transform: menuActive ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              transition: 'all 0.3s ease'
            }}></span>
            <span style={{
              opacity: menuActive ? '0' : '1',
              transition: 'opacity 0.3s ease'
            }}></span>
            <span style={{
              transform: menuActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
              transition: 'all 0.3s ease'
            }}></span>
          </button>
        </nav>
      </div>
    </header>
  )
}
