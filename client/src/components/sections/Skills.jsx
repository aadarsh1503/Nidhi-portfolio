import { motion } from 'framer-motion'

export default function Skills() {
  const skillGroups = [
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
  ]

  const languages = [
    { name: "Hindi", level: "Native", width: "100%" },
    { name: "English", level: "Proficient", width: "90%" }
  ]

  return (
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
            {skillGroups.map((group, i) => (
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
                {languages.map((lang, i) => (
                  <div key={i} className="lang-item">
                    <div className="lang-header">
                      <span>{lang.name}</span>
                      <span className="level">{lang.level}</span>
                    </div>
                    <div className="bar">
                      <motion.div 
                        className="fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: lang.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
