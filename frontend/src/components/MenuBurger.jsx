import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const MenuBurger = () => {
    const { isAuthenticated, logout, user: currentUser } = useAuth();

    const handleLogout = () => {
        logout();
    }

  return (
    <div className="bg-[#272727]">

        <div className="xl:hidden bg-[#00DEF5] rounded-xl px-10 py-10 mx-5 flex flex-col gap-4">
            <Link to='/tournaments' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Tournois</Link>
            <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Chaînes</Link>
            <Link to='/' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Jeux</Link>

            {isAuthenticated ? 
            <div className="flex flex-col gap-4">
                <Link to={`/profile/${currentUser?.id}`} className="text-white text-lg font-semibold hover:text-[#F9FF00]">Mes infos</Link>
                <Link to='/' onClick={handleLogout} className="text-white text-lg font-semibold hover:text-[#F9FF00]">Se déconnecter</Link>
            </div>
            :
            <Link to='/login' className="text-white text-lg font-semibold hover:text-[#F9FF00]">Se connecter</Link>
            
            }
        </div>
    </div>
  )
}

export default MenuBurger
