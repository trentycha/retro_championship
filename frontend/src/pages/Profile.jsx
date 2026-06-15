import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading.jsx'
import AuthService from '../services/AuthService';

const Profile = () => {
    const [user, setUser] = useState("");
    const {id} = useParams();
    const { logout, user: currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${id}`);
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch(error) {
                {error.message}
            }
        }

        fetchUser();

    }, [id])

    const handleDelete = async (id) => {

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/user/${id}`, {
                method: 'DELETE',
                headers: AuthService.isAuthHeaders()
            });

            logout();
            navigate('/');

        } catch (error) {
            console.error(error.message);
        }
    };

    const isOwner = currentUser && currentUser.id === parseInt(id);

    if(loading) {
        return <Loading />;
    }

  return (
    <div className="bg-[#272727]">
        <div className="px-40 pb-20">

            {isOwner ?
                <h2 className="text-[#F9FF00] font-pixeloid-bold text-4xl">Salut, {user.username} !</h2>
            : <h2 className="text-[#F9FF00] font-pixeloid-bold text-4xl">{user.username}</h2>}

            <div className="flex gap-6">
                <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start py-10 px-10 mt-10">
                    <div className="flex gap-10">
                        <div>
                            <p className='text-[#00DEF5] ml-3'>Pseudo</p>
                            <p className='bg-[#4F4F4F] text-white px-4 py-3 pr-60 rounded-lg mb-4 mt-1'>{user.username}</p>

                            <p className='text-[#00DEF5] ml-3'>Mail</p>
                            <p className='bg-[#4F4F4F] text-white px-4 py-3 pr-60 rounded-lg mb-4 mt-1'>{user.mail}</p>

                            <p className='text-[#00DEF5] ml-3'>Date de naissance</p>
                            <p className='bg-[#4F4F4F] text-white px-4 py-3 pr-60 rounded-lg mb-4 mt-1'>{new Date(user.birthday).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                            <p className='text-[#00DEF5] ml-3'>Ville</p>
                            <p className='bg-[#4F4F4F] text-white px-4 py-3 pr-60 rounded-lg mb-4 mt-1'>{user.city}</p>

                            <p className='text-[#00DEF5] ml-3'>Crée le</p>
                            <p className='bg-[#4F4F4F] text-white px-4 py-3 pr-60 rounded-lg mb-4 mt-1'>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>

                            <p className='text-[#00DEF5] ml-3'>Rôle</p>
                            <p className='bg-[#4F4F4F] text-white px-4 py-3 pr-60 rounded-lg mb-4 mt-1'>{user?.userStatus?.label}</p>

                            {isOwner ?
                                <div className="flex justify-end">
                                    <button onClick={(() => handleDelete(user.id))} className="bg-[#c0c700] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-6">Supprimer</button>
                                    <button className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-6 ml-4">Modifier</button>
                                </div>
                            : null}
                            
                        </div>
                    
                    </div>
                </div>
                <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start py-12 px-8 mt-10 w-64">
                        <div>
                            <p className='text-[#00DEF5]'>Tournois total</p>
                            <p className='text-[#F9FF00] font-pixeloid-bold text-xl'>{user.howManyTourn}</p>

                            <p className='text-[#00DEF5] mt-5'>Tournois gagnés</p>
                            <p className='text-[#F9FF00] font-pixeloid-bold text-xl'>{user.wonTournaments}</p>

                            <p className='text-[#00DEF5] mt-5'>Total matchs</p>
                            <p className='text-[#F9FF00] font-pixeloid-bold text-xl'>{user.howManyMatches}</p>

                            {isOwner ?
                                <button className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-25 ml-8">Voir plus</button>
                            : null}
                            
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Profile
