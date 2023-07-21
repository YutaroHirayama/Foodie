import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
  return (
      <div className='footer'>
        <a href='https://github.com/YutaroHirayama'>
          <img className='about-link' src='/github.png'/>
        </a>
        <a href='https://www.linkedin.com/in/yutaro-hirayama-3088b680/'>
          <img className='about-link' src='/linkedin.png'/>
        </a>
      </div>
  )
}

export default Footer;
