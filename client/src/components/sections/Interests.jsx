import { motion } from 'framer-motion'
import { FaMicroscope, FaLeaf, FaChalkboardTeacher } from 'react-icons/fa'

export default function Interests() {
  const interests = [
    { Icon: FaMicroscope, title: "Zoology & Animal Sciences" },
    { Icon: FaLeaf, title: "Environmental Science & Wildlife Biology" },
    { Icon: FaChalkboardTeacher, title: "Science Education & Academic Research" }
  ]

  return (
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
            {interests.map((item, i) => (
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
  )
}
