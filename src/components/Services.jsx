import { useEffect } from 'react'
import '../styles/services.css'

const services = [
  {
    id: 1,
    title: ['Search engine', 'optimization'],
    variant: 'green',
    image: 'images/tokyo-magnifier-web-search-with-elements 2.png'
  },
  {
    id: 2,
    title: ['Pay-per-click', 'advertising'],
    variant: 'light',
    image: 'images/tokyo-selecting-a-value-in-the-browser-window 1.png'
  },
  {
    id: 3,
    title: ['Social Media', 'Marketing'],
    variant: 'dark',
    image: 'images/tokyo-browser-window-with-emoticon-likes-and-stars-around 2.png'
  },
  {
    id: 4,
    title: ['Email', 'Marketing'],
    variant: 'light',
    image: 'images/tokyo-sending-messages-from-one-place-to-another 1.png'
  },
  {
    id: 5,
    title: ['Content', 'Creation'],
    variant: 'green',
    image: 'images/tokyo-many-browser-windows-with-different-information 1.png'
  },
  {
    id: 6,
    title: ['Analytics and', 'Tracking'],
    variant: 'dark',
    image: 'images/tokyo-volumetric-analytics-of-different-types-in-web-browsers 2.png'
  }
]

export default function Services() {
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

    const serviceCards = document.querySelectorAll('.service-card')
    serviceCards.forEach(card => {
      card.classList.add('animate-on-scroll')
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="badge">Services</span>
          </h2>
          <p className="section-subtitle">At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className={`service-card ${service.variant} animate-on-scroll`}>
              <div className="service-content">
                <h3 className="service-title">
                  {service.title.map((line, idx) => (
                    <span key={idx}>
                      <span className={`title-bg ${service.variant}`}>{line}</span>
                      {idx < service.title.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <a href="#" className={`service-link ${service.variant === 'dark' ? 'white' : ''}`}>
                  <span className="link-icon">↗</span>
                  <span>Learn more</span>
                </a>
              </div>
              <div className="service-icon">
                <img src={service.image} alt={service.title.join(' ')} className="service-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
