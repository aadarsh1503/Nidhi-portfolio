import { BsTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'

export default function Footer() {
  return (
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
  )
}
