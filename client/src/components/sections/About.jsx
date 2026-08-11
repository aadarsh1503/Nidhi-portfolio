import { motion } from 'framer-motion'

export default function About({ isMobile }) {
  if (isMobile) {
    return (
      <section id="about" className="section about">
        <div className="container">
          <h2 className="heading">Career Objective</h2>
          <div className="glass-box">
            <p className="text-large">
              Zoology postgraduate from <span className="highlight">Kumaun University</span>, looking to start my career as a
              Science/Zoology teacher at a coaching institute, with the long-term goal of becoming an
              <span className="highlight"> Assistant Professor</span>. I have a solid academic background in life sciences,
              and I enjoy breaking down difficult topics into something students can understand and remember.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
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
  )
}
