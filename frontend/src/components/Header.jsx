import { Link } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bg-[#272727]">
      <div className="flex items-center px-40 py-10 sticky top-0 z-50">
        <img src='/images/Logo.png' alt="logo" className="w-52"/>
        <nav className="bg-[#00DEF5] ml-8 my-3 py-7 px-12 rounded-lg shadow-xl shadow-black/30
        flex items-center justify-end gap-14 flex-1">
          <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Tournois</Link>
          <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Chaînes</Link>
          <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Jeux</Link>
          <Link to='/' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img src={isHovered ? '/images/profile-hover.png' : '/images/profile.png'} alt="login-header" className="w-10"/>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
