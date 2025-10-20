import { useState, useEffect } from 'react'
import '../styles/testimonials.css'

const testimonials = [
  {
    id: 1,
    text: 'We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.',
    author: 'John Smith',
    company: 'Marketing Director at XYZ Corp'
  },
  {
    id: 2,
    text: 'Positivus transformed our digital marketing strategy completely. Their innovative approach and dedication to results have exceeded our expectations. The ROI we\'ve seen has been remarkable.',
    author: 'Emily Chen',
    company: 'CEO at TechStart Inc'
  },
  {
    id: 3,
    text: 'The team at Positivus is incredibly knowledgeable and always stays ahead of industry trends. They\'ve helped us navigate the complex world of digital marketing with ease.',
    author: 'Michael Rodriguez',
    company: 'Founder at GrowthLabs'
  }
]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(autoplayInterval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="badge">Testimonials</span>
          </h2>
          <p className="section-subtitle">Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services</p>
        </div>

        <div className="testimonials-slider">
          <div className="testimonials">
            <div className="cards">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="card"
                  style={{ display: index === currentSlide ? 'flex' : 'none' }}
                >
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <h4 className="author-name">{testimonial.author}</h4>
                    <p className="author-company">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="slider-controls">
          <button className="slider-btn prev" aria-label="Previous testimonial" onClick={prevSlide}>←</button>
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
          <button className="slider-btn next" aria-label="Next testimonial" onClick={nextSlide}>→</button>
        </div>
      </div>
    </section>
  )
}
