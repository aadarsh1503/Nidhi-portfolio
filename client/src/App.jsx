import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import ThreeScene from './components/ThreeScene'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Education from './components/sections/Education'
import Achievements from './components/sections/Achievements'
import Skills from './components/sections/Skills'
import Interests from './components/sections/Interests'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: isMobile ? 1 : 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: !isMobile,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Expose lenis to window for react-scroll integration
    window.lenis = lenis

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [isMobile])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const section = Math.floor(latest * 6)
      setCurrentSection(Math.min(section, 5))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="app">
      <ThreeScene currentSection={currentSection} isMobile={isMobile} />
      
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <Hero />
      <About />
      <Education />
      <Achievements />
      <Skills />
      <Interests />
      <Footer />
    </div>
  )
}

export default App
