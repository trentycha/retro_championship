import { useAuth } from '../hooks/useAuth.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        await login(mail, password);
          navigate('/');
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false);
      }

      if(loading) {
        <div>Chargement...</div>
      }
  }

  return (
    <div className="bg-[#272727]">
      <div className="px-60">
        <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start">

            <div className="flex-1">
                <img src='/images/login.jpg' alt="login" className="w-full rounded-l-xl"/>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 pl-15">
                <h2 className="text-[#F9FF00] font-pixeloid-bold text-3xl mt-15 mb-10">Connectez-vous !</h2>
                <p className='text-[#00DEF5] ml-3'>Email</p>
                <input placeholder="Votre email" className='bg-[#4F4F4F] px-4 py-3 pr-60 rounded-lg mb-4 mt-1'
                value = {mail}
                onChange={(e) => setMail(e.target.value)}></input>
                <p className='text-[#00DEF5] ml-3'>Mot de passe</p>
                <input placeholder="Votre mot de passe" className='bg-[#4F4F4F] px-4 py-3 pr-60 rounded-lg mb-4 mt-1'
                value = {password}
                onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30 mt-6">Je me connecte !</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

        </div>
      </div>
    </div>
  )
}

export default Login
