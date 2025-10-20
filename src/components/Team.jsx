import { useEffect } from 'react'
import '../styles/team.css'

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CEO and Founder',
    bio: '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy',
    image: 'images/alexandra-gorn-smuS_jUZa9I-unsplash 1.png'
  },
  {
    id: 2,
    name: 'Jane Doe',
    role: 'Director of Operations',
    bio: '7+ years of experience in project management and team leadership. Strong organizational and communication skills',
    image: 'images/christian-buehner-DItYlc26zVI-unsplash 1.png'
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Senior SEO Specialist',
    bio: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization',
    image: 'images/chanvre-quebec-mXu1SpzHq6w-unsplash 1.png'
  },
  {
    id: 4,
    name: 'Emily Johnson',
    role: 'PPC Manager',
    bio: '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis',
    image: 'images/feli-ramsanjami-agung-wUe_Q-t4-cI-unsplash 1.png'
  },
  {
    id: 5,
    name: 'Brian Williams',
    role: 'Social Media Specialist',
    bio: '4+ years of experience in social media marketing. Proficient in creating engaging content and building communities',
    image: 'images/ian-dooley-d1UPkiFd04A-unsplash 1.png'
  },
  {
    id: 6,
    name: 'Sarah Kim',
    role: 'Content Creator',
    bio: '2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries',
    image: 'images/suad-kamardeen-khewjy5l4Zo-unsplash 2.png'
  }
]

export default function Team() {
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

    const teamCards = document.querySelectorAll('.team-card')
    teamCards.forEach(card => {
      card.classList.add('animate-on-scroll')
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="team">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="badge">Team</span>
          </h2>
          <p className="section-subtitle">Meet the skilled and experienced team behind our successful digital marketing strategies</p>
        </div>

        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card animate-on-scroll">
              <div className="team-member">
                <div className="member-photo">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
                <a href="#" className="member-linkedin">in</a>
              </div>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>

        <button className="btn-secondary">See all team</button>
      </div>
    </section>
  )
}
