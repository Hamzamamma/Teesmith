import { useState, useEffect } from 'react'
import '../styles/working-process.css'

const processes = [
  {
    id: 1,
    number: '01',
    title: 'Consultation',
    content: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
  },
  {
    id: 2,
    number: '02',
    title: 'Research and Strategy Development',
    content: 'We conduct thorough research and develop a comprehensive strategy tailored to your business objectives and target market.'
  },
  {
    id: 3,
    number: '03',
    title: 'Implementation',
    content: 'Our team executes the strategy with precision, ensuring every detail aligns with your goals and brand identity.'
  },
  {
    id: 4,
    number: '04',
    title: 'Monitoring and Optimization',
    content: 'We continuously monitor campaign performance and make data-driven optimizations to maximize results.'
  },
  {
    id: 5,
    number: '05',
    title: 'Reporting and Communication',
    content: 'Regular reports keep you informed about campaign progress, insights, and recommendations for future growth.'
  },
  {
    id: 6,
    number: '06',
    title: 'Continual Improvement',
    content: 'We believe in continuous improvement, constantly refining strategies to adapt to market changes and drive better results.'
  }
]

export default function WorkingProcess() {
  const [activeItem, setActiveItem] = useState(0)

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

    const processItems = document.querySelectorAll('.process-item')
    processItems.forEach(item => {
      item.classList.add('animate-on-scroll')
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="working-process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="badge">Our Working Process</span>
          </h2>
          <p className="section-subtitle">Step-by-Step Guide to Achieving Your Business Goals</p>
        </div>

        <div className="process-list">
          {processes.map((process, index) => (
            <div 
              key={process.id} 
              className={`process-item animate-on-scroll ${activeItem === index ? 'active' : ''}`}
              onClick={() => setActiveItem(activeItem === index ? -1 : index)}
            >
              <div className="process-header">
                <div className="process-number">{process.number}</div>
                <h3 className="process-title">{process.title}</h3>
                <button 
                  className="process-toggle" 
                  aria-label="Toggle process details"
                  style={{
                    transform: activeItem === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    backgroundColor: activeItem === index ? 'var(--color-dark)' : 'var(--color-light)',
                    color: activeItem === index ? 'var(--color-white)' : 'var(--color-dark)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span className="toggle-icon">+</span>
                </button>
              </div>
              {activeItem === index && (
                <div className="process-content">
                  <p>{process.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
