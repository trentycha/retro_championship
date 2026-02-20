import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import MenuBurger from '../components/MenuBurger.jsx'

const Header = () => {
  const [isHoveredLogin, setIsHoveredLogin] = useState(false)
  const [isHoveredLogout, setIsHoveredLogout] = useState(false)
  const { isAuthenticated, logout, user: currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [burger, setBurger] = useState(false);

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="bg-[#272727]">
      <div className="flex justify-between items-center px-6 py-5 xl:px-40 xl:py-10 sticky top-0 z-50">

        <a href='/'>
          <img src='/images/Logo.png' alt="logo" className="w-25 xl:w-52"/>
        </a>

        {isOpen && burger ? <img src='/images/header.png' alt="menu-burger" className="w-10 xl:hidden"
        onClick={() => {setIsOpen(false), setBurger(false)}}/>
        : <img src='/images/prochain.png' alt="menu-burger-open" className="w-10 xl:hidden"
        onClick={() => {setIsOpen(true), setBurger(true)}}/>
        }
        
        <nav className="hidden xl:bg-[#00DEF5] xl:ml-8 xl:my-3 xl:py-7 xl:px-12 xl:rounded-lg xl:shadow-xl xl:shadow-black/30
        xl:flex xl:items-center xl:justify-end xl:gap-14 xl:flex-1">

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

        {isOpen && (
        <div className="absolute top-full left-0 w-full z-50">
          <MenuBurger />
        </div>
      )}
      </div>
    </div>
  )
}

export default Header
