import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { BsTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">Nidhi Tiwari</div>
        
        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="hero" spy={true} smooth={true} offset={-70} duration={500}>Home</Link>
          <Link to="about" spy={true} smooth={true} offset={-70} duration={500}>About</Link>
          <Link to="education" spy={true} smooth={true} offset={-70} duration={500}>Education</Link>
          <Link to="achievements" spy={true} smooth={true} offset={-70} duration={500}>Achievements</Link>
          <Link to="skills" spy={true} smooth={true} offset={-70} duration={500}>Skills</Link>
          <Link to="interests" spy={true} smooth={true} offset={-70} duration={500}>Interests</Link>
        </div>

        {/* Hamburger Menu Button */}
        <motion.button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        className="mobile-menu-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <motion.div 
        className="mobile-menu"
        initial={{ x: '100%' }}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <motion.button
              className="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          <div className="mobile-menu-links">
            {[
              { id: 'hero', name: 'Intro' },
              { id: 'about', name: 'About' },
              { id: 'education', name: 'Education' },
              { id: 'achievements', name: 'Achievements' },
              { id: 'skills', name: 'Skills' },
              { id: 'interests', name: 'Interests' }
            ].map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: mobileMenuOpen ? 1 : 0, 
                  x: mobileMenuOpen ? 0 : 50 
                }}
                transition={{ delay: mobileMenuOpen ? 0.1 * (i + 1) : 0 }}
              >
                <Link 
                  to={section.id} 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={500}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-link"
                >
                  <span className="mobile-menu-number">0{i + 1}</span>
                  <span className="mobile-menu-text">{section.name}</span>
                  <motion.span 
                    className="mobile-menu-arrow"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mobile-menu-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
            transition={{ delay: 0.8 }}
          >
            <a href="tel:9760915756" className="mobile-contact-btn">
              <BsTelephoneFill /> Call Me
            </a>
            <a href="mailto:nidhitiwari0417@gmail.com" className="mobile-contact-btn">
              <IoMdMail /> Email Me
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
