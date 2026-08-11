import { motion } from 'framer-motion'
import { BsTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'

export default function Hero({ isMobile }) {
  if (isMobile) {
    return (
      <section id="hero" className="section hero">
        <div className="container">
          <div className="hero-content">
            <div className="tag">Science Educator</div>
            <h1 className="title">Nidhi Tiwari</h1>
            <p className="subtitle">Zoology Educator | Aspiring Assistant Professor</p>
            <div className="cta-buttons">
              <a href="tel:9760915756" className="btn btn-primary">
                <BsTelephoneFill className="btn-icon" />
                <span>Call Now</span>
              </a>
              <a href="mailto:nidhitiwari0417@gmail.com" className="btn btn-secondary">
                <IoMdMail className="btn-icon" />
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
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
  )
}
