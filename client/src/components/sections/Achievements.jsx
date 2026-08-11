import { motion } from 'framer-motion'
import { FaTrophy, FaBook } from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi'

const achievements = [
  { Icon: FaTrophy, title: "CM's Bharat Bhraman Scheme", desc: "Selected as college topper for 7-day science tour" },
  { Icon: HiAcademicCap, title: "Merit Scholarships", desc: "Received during B.Sc. and M.Sc. for academic excellence" },
  { Icon: FaBook, title: "Research Competition Winner", desc: "Won research paper writing competition" }
]

const tourPlaces = [
  "IIT Roorkee", "Vigyan Dham", "Indian Institute of Remote Sensing",
  "National Institute of Hydrology, Roorkee",
  "Indian Institute of Soil and Water Conservation",
  "Wadia Institute of Himalayan Geology"
]

export default function Achievements({ isMobile }) {
  if (isMobile) {
    return (
      <section id="achievements" className="section achievements">
        <div className="container">
          <h2 className="heading">Key Achievements</h2>
          <div className="grid-3">
            {achievements.map((item, i) => (
              <div key={i} className="card">
                <item.Icon className="icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="glass-box tour-box">
            <h3 className="tour-heading">🚀 Science Tour Highlights</h3>
            <div className="tags">
              {tourPlaces.map((place, i) => (
                <span key={i} className="tag-item">{place}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
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
            {achievements.map((item, i) => (
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
              {tourPlaces.map((place, i) => (
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
  )
}
