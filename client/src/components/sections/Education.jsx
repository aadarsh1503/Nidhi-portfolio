import { motion } from 'framer-motion'
import { FaGraduationCap, FaBook } from 'react-icons/fa'

export default function Education() {
  return (
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
  )
}
