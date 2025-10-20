import { useEffect } from 'react'
import '../styles/hero.css'

export default function Hero() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll('.client-logos')
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Navigating the <br />
              <span className="highlight">digital landscape</span>
            </h1>
            <p className="hero-description">
              Our digital marketing agency helps businesses grow and succeed online through data-driven strategies and creative solutions.
            </p>
            <button className="btn-primary">Book a consultation</button>
          </div>
          <div className="hero-image">
            <div className="illustration-wrapper">
              <div className="illustration-circle"></div>
              <img src="images/tokyo-browser-window-with-emoticon-likes-and-stars-around 2.png" alt="Digital Marketing Illustration" className="hero-illustration" />
              <div className="floating-element star">✦</div>
              <div className="floating-element megaphone">📢</div>
              <div className="floating-element cursor">➤</div>
            </div>
          </div>
        </div>

        <div className="client-logos animate-on-scroll">
          <div className="logo-item">Amazon</div>
          <div className="logo-item">Dribbble</div>
          <div className="logo-item">HubSpot</div>
          <div className="logo-item">Notion</div>
          <div className="logo-item">Netflix</div>
          <div className="logo-item">Zoom</div>
        </div>
      </div>
    </section>
  )
}
