import { useState } from 'react'
import '../styles/contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    inquiry: 'quote',
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.email || !formData.message) {
      alert('Per favore compila tutti i campi obbligatori!')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Per favore inserisci un indirizzo email valido!')
      return
    }

    console.log('Form inviato:', formData)

    setSubmitStatus('Inviato! ✓')
    setTimeout(() => {
      setFormData({ inquiry: 'quote', name: '', email: '', message: '' })
      setSubmitStatus('')
    }, 3000)
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="badge">Contact Us</span>
          </h2>
          <p className="section-subtitle">Connect with Us: Let's Discuss Your Digital Marketing Needs</p>
        </div>

        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="radio-group">
                <input 
                  type="radio" 
                  name="inquiry" 
                  value="say-hi"
                  checked={formData.inquiry === 'say-hi'}
                  onChange={handleChange}
                />
                <span className="radio-label">Say Hi</span>
              </label>
              <label className="radio-group">
                <input 
                  type="radio" 
                  name="inquiry" 
                  value="quote"
                  checked={formData.inquiry === 'quote'}
                  onChange={handleChange}
                />
                <span className="radio-label">Get a Quote</span>
              </label>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email*</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message">Message*</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              style={{
                backgroundColor: submitStatus ? 'var(--color-primary)' : 'var(--color-dark)',
                color: submitStatus ? 'var(--color-dark)' : 'var(--color-white)'
              }}
            >
              {submitStatus || 'Send Message'}
            </button>
          </form>

          <div className="contact-illustration">
            <div className="illustration-circle-3"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
