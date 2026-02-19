import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Header = () => {
  const [isHoveredLogin, setIsHoveredLogin] = useState(false)
  const [isHoveredLogout, setIsHoveredLogout] = useState(false)
  const { isAuthenticated, logout, user: currentUser } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="bg-[#272727]">
      <div className="flex items-center px-40 py-10 sticky top-0 z-50">

        <a href='/'>
          <img src='/images/Logo.png' alt="logo" className="w-52"/>
        </a>

        <nav className="bg-[#00DEF5] ml-8 my-3 py-7 px-12 rounded-lg shadow-xl shadow-black/30
        flex items-center justify-end gap-14 flex-1">

          <Link to='/tournaments' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Tournois</Link>
          <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Chaînes</Link>
          <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Jeux</Link>
          
          {isAuthenticated ? 
          <div className="flex">
            <Link to={`/profile/${currentUser?.id}`} onMouseEnter={() => setIsHoveredLogin(true)} onMouseLeave={() => setIsHoveredLogin(false)}>
              <img src={isHoveredLogin ? '/images/profile-hover.png' : '/images/profile.png'} alt="login-header" className="w-10 flex-1"/>
            </Link>
            <Link to='/' onClick={handleLogout} onMouseEnter={() => setIsHoveredLogout(true)} onMouseLeave={() => setIsHoveredLogout(false)}>
              <img src={isHoveredLogout ? '/images/logout-hover.png' : '/images/logout.png'} alt="logout-header" className="w-8 flex-1 ml-10 mt-1"/>
            </Link>
          </div>
          : 
          <Link to='/login' onMouseEnter={() => setIsHoveredLogin(true)} onMouseLeave={() => setIsHoveredLogin(false)}>
            <img src={isHoveredLogin ? '/images/profile-hover.png' : '/images/profile.png'} alt="login-header" className="w-10"/>
          </Link>
          
          }
          

        </nav>

      </div>
    </div>
  )
}

export default Header
