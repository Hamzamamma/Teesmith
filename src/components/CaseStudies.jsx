import { useEffect } from 'react'
import '../styles/case-studies.css'

const caseStudies = [
  {
    id: 1,
    text: 'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.'
  },
  {
    id: 2,
    text: 'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.'
  },
  {
    id: 3,
    text: 'For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.'
  }
]

export default function CaseStudies() {
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

    const caseCards = document.querySelectorAll('.case-study-card')
    caseCards.forEach(card => {
      card.classList.add('animate-on-scroll')
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="case-studies" id="cases">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="badge">Case Studies</span>
          </h2>
          <p className="section-subtitle">Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies</p>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map(study => (
            <div key={study.id} className="case-study-card animate-on-scroll">
              <p className="case-study-text">{study.text}</p>
              <a href="#" className="case-study-link">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
