import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment, Stars, Cloud } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, animateScroll as scroll } from 'react-scroll'
import Lenis from 'lenis'
import * as THREE from 'three'
import { FaPhone, FaEnvelope, FaGraduationCap, FaTrophy, FaBook, FaFlask, FaChalkboardTeacher, FaMicroscope, FaLeaf, FaCode } from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi'
import { IoMdMail } from 'react-icons/io'
import { BsTelephoneFill } from 'react-icons/bs'
import './App.css'

// DNA Helix for Hero
function DNAHelix() {
  const groupRef = useRef()
  const strandRef1 = useRef()
  const strandRef2 = useRef()
  
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
  })

  const helixPoints = []
  const segments = 60
  
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 8
    const y = (i / segments) * 12 - 6
    const radius = 1.2
    
    helixPoints.push({
      x1: Math.cos(t) * radius,
      z1: Math.sin(t) * radius,
      x2: Math.cos(t + Math.PI) * radius,
      z2: Math.sin(t + Math.PI) * radius,
      y: y
    })
  }

  // Create strand curves
  const curve1Points = helixPoints.map(p => new THREE.Vector3(p.x1, p.y, p.z1))
  const curve2Points = helixPoints.map(p => new THREE.Vector3(p.x2, p.y, p.z2))
  
  const curve1 = new THREE.CatmullRomCurve3(curve1Points)
  const curve2 = new THREE.CatmullRomCurve3(curve2Points)

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[curve1, 100, 0.03, 8, false]} />
        <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[curve2, 100, 0.03, 8, false]} />
        <meshStandardMaterial color="#16a085" emissive="#16a085" emissiveIntensity={0.4} />
      </mesh>

      {/* Base pairs and spheres */}
      {helixPoints.map((p, i) => (
        <group key={i}>
          {/* Sphere 1 */}
          <mesh position={[p.x1, p.y, p.z1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="#2ecc71" 
              emissive="#2ecc71" 
              emissiveIntensity={0.6}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
          
          {/* Sphere 2 */}
          <mesh position={[p.x2, p.y, p.z2]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="#16a085" 
              emissive="#16a085" 
              emissiveIntensity={0.6}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
          
          {/* Connecting base pair (every 3rd for better look) */}
          {i % 3 === 0 && (
            <>
              <mesh 
                position={[(p.x1 + p.x2) / 2, p.y, (p.z1 + p.z2) / 2]}
                rotation={[0, Math.atan2(p.z2 - p.z1, p.x2 - p.x1), Math.PI / 2]}
              >
                <cylinderGeometry args={[0.02, 0.02, Math.sqrt(Math.pow(p.x2 - p.x1, 2) + Math.pow(p.z2 - p.z1, 2)), 8]} />
                <meshStandardMaterial 
                  color="#27ae60" 
                  emissive="#27ae60" 
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </>
          )}
        </group>
      ))}
      
      {/* Add some glow points */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#2ecc71" distance={8} />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#16a085" distance={8} />
    </group>
  )
}

// Floating Particles
function Particles({ count = 500 }) {
  const points = useRef()
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    
    const color = new THREE.Color(i % 2 === 0 ? "#2ecc71" : "#16a085")
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    points.current.rotation.x = state.clock.getElapsedTime() * 0.02
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// Brain/Neural Network for Skills
function NeuralNetwork() {
  const groupRef = useRef()
  const nodes = []
  
  for (let i = 0; i < 30; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 8
    })
  }

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Galaxy for Achievements
function Galaxy() {
  const points = useRef()
  const count = 5000
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 5
    const spinAngle = radius * 5
    const angle = Math.random() * Math.PI * 2
    
    positions[i * 3] = Math.cos(angle + spinAngle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2
    positions[i * 3 + 2] = Math.sin(angle + spinAngle) * radius
    
    const color = new THREE.Color()
    color.setHSL(0.3 + Math.random() * 0.1, 0.7, 0.5)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// Glowing Orb for Education
function GlowingOrb() {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#2ecc71"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#2ecc71" distance={5} />
    </Float>
  )
}

// Dynamic Scene Controller
function Scene({ section }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#2ecc71" />
      
      {section === 0 && (
        <>
          <DNAHelix />
          <Particles count={300} />
        </>
      )}
      
      {section === 1 && (
        <>
          <GlowingOrb />
          <Particles count={200} />
        </>
      )}
      
      {section === 2 && (
        <>
          <GlowingOrb />
          <Stars radius={50} depth={50} count={3000} factor={4} fade speed={1} />
        </>
      )}
      
      {section === 3 && (
        <>
          <Galaxy />
        </>
      )}
      
      {section === 4 && (
        <>
          <NeuralNetwork />
          <Particles count={400} />
        </>
      )}
      
      {section === 5 && (
        <>
          <Float speed={1.5} rotationIntensity={0.5}>
            <mesh>
              <torusGeometry args={[2, 0.5, 16, 100]} />
              <meshStandardMaterial color="#2ecc71" wireframe />
            </mesh>
          </Float>
          <Particles count={300} />
        </>
      )}
      
      <Environment preset="night" />
    </>
  )
}

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
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
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const section = Math.floor(latest * 6)
      setCurrentSection(Math.min(section, 5))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="app">
      {/* 3D Background */}
      <div className="three-bg">
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene section={currentSection} />
          </Suspense>
        </Canvas>
      </div>

      {/* Progress Bar */}
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

      {/* Navigation */}
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
          <motion.div 
            className="mobile-menu-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Menu</h3>
          </motion.div>

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

      {/* Hero */}
      <section id="hero" className="section hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-content"
          >
            <motion.div
              className="tag"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Science Educator
            </motion.div>
            
            <motion.h1 
              className="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Nidhi Tiwari
            </motion.h1>
            
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Zoology Educator | Aspiring Assistant Professor
            </motion.p>

            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.a 
                href="tel:9760915756" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BsTelephoneFill className="btn-icon" />
                <span>Call Now</span>
              </motion.a>
              <motion.a 
                href="mailto:nidhitiwari0417@gmail.com" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoMdMail className="btn-icon" />
                <span>Email Me</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading">Career Objective</h2>
            <div className="glass-box">
              <p className="text-large">
                Zoology postgraduate from <span className="highlight">Kumaun University</span>, looking to start my career as a 
                Science/Zoology teacher at a coaching institute, with the long-term goal of becoming an 
                <span className="highlight"> Assistant Professor</span>. I have a solid academic background in life sciences, 
                and I enjoy breaking down difficult topics into something students can understand and remember.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section education">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading">Education</h2>
            
            <div className="grid-2">
              <motion.div
                className="card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <FaGraduationCap className="icon" />
                <div className="year">2024 - 2026</div>
                <h3>M.Sc. Zoology</h3>
                <p>Kumaun University</p>
              </motion.div>

              <motion.div
                className="card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <FaBook className="icon" />
                <div className="year">2021 - 2024</div>
                <h3>B.Sc. Zoology, Botany & Chemistry</h3>
                <p>Kumaun University</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="section achievements">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading">Key Achievements</h2>

            <div className="grid-3">
              {[
                { Icon: FaTrophy, title: "CM's Bharat Bhraman Scheme", desc: "Selected as college topper for 7-day science tour" },
                { Icon: HiAcademicCap, title: "Merit Scholarships", desc: "Received during B.Sc. and M.Sc. for academic excellence" },
                { Icon: FaBook, title: "Research Competition Winner", desc: "Won research paper writing competition" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <item.Icon className="icon" />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="glass-box tour-box"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="tour-heading">🚀 Science Tour Highlights</h3>
              <div className="tags">
                {[
                  "IIT Roorkee",
                  "Vigyan Dham",
                  "Indian Institute of Remote Sensing",
                  "National Institute of Hydrology, Roorkee",
                  "Indian Institute of Soil and Water Conservation",
                  "Wadia Institute of Himalayan Geology"
                ].map((place, i) => (
                  <motion.span
                    key={i}
                    className="tag-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    {place}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section skills">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading">Skills & Expertise</h2>

            <div className="skills-grid">
              {[
                {
                  title: "🔬 Subject Expertise",
                  skills: ["Zoology", "Life Sciences", "General Science", "Animal Sciences", "Environmental Science", "Wildlife Biology"]
                },
                {
                  title: "🎯 Teaching & Communication",
                  skills: ["Science Education", "Public Speaking", "Concept Simplification", "Quick Learner"]
                },
                {
                  title: "💻 Research & Technical",
                  skills: ["Research Writing", "Poster Making", "MS Office", "PowerPoint", "Excel"]
                },
                {
                  title: "✨ Personal Attributes",
                  skills: ["Disciplined", "Organized", "Time Management", "Current Affairs Aware"]
                }
              ].map((group, i) => (
                <motion.div
                  key={i}
                  className="skill-box"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <h3>{group.title}</h3>
                  <div className="tags">
                    {group.skills.map((skill, j) => (
                      <motion.span
                        key={j}
                        className="tag-item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i * 0.15) + (j * 0.05) }}
                        whileHover={{ scale: 1.1, y: -3 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="skill-box languages"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <h3>🗣️ Languages</h3>
                <div className="lang-list">
                  <div className="lang-item">
                    <div className="lang-header">
                      <span>Hindi</span>
                      <span className="level">Native</span>
                    </div>
                    <div className="bar">
                      <motion.div 
                        className="fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  <div className="lang-item">
                    <div className="lang-header">
                      <span>English</span>
                      <span className="level">Proficient</span>
                    </div>
                    <div className="bar">
                      <motion.div 
                        className="fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: "90%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="section interests">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading">Areas of Interest</h2>
            
            <div className="grid-3">
              {[
                { Icon: FaMicroscope, title: "Zoology & Animal Sciences" },
                { Icon: FaLeaf, title: "Environmental Science & Wildlife Biology" },
                { Icon: FaChalkboardTeacher, title: "Science Education & Academic Research" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="card interest-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <item.Icon className="icon-large" />
                  <h3>{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>Nidhi Tiwari</h3>
              <p>Science Educator | Zoology Educator</p>
            </div>
            <div className="footer-links">
              <a href="tel:9760915756"><BsTelephoneFill />+91 9760915756</a>
              <a href="mailto:nidhitiwari0417@gmail.com"><IoMdMail /> nidhitiwari0417@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Nidhi Tiwari. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
