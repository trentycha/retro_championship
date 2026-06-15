import { useAuth } from '../hooks/useAuth.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading.jsx'

const Register = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [userStatus, setUserStatus] = useState("player");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        setLoading(false);
        return;
      }
      await register({ mail, password, username, birthday, city, userStatus });
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <Loading />;
    }
  }

  return (
    <div className="bg-[#272727]">
      <div className="px-6 py-6 xl:px-60">
        <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start px-7 py-7">

          <form onSubmit={handleSubmit} className="px-10 py-12 w-full">
            <h2 className="text-[#F9FF00] font-pixeloid-bold text-lg xl:text-3xl">Crée ton compte !</h2>

            <div className="flex gap-10 mt-10">

              <div className="flex flex-col flex-1">
                <p className="text-[#00DEF5] ml-3">Email</p>
                <input placeholder="Votre email" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)} />

                <p className="text-[#00DEF5] ml-3">Mot de passe</p>
                <input type="password" placeholder="Votre mot de passe" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />

                <p className="text-[#00DEF5] ml-3">Confirmer le mot de passe</p>
                <input type="password" placeholder="Confirmez votre mot de passe" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />

                <p className="text-[#00DEF5] ml-3">Rôle</p>
                <select className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}>
                  <option value="player">Player</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super-admin</option>
                </select>

              </div>

              <div className="flex flex-col flex-1">
                <p className="text-[#00DEF5] ml-3">Pseudo</p>
                <input placeholder="Votre pseudo" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />

                <p className="text-[#00DEF5] ml-3">Date de naissance</p>
                <input type="date" placeholder="Votre date de naissance" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)} />

                <p className="text-[#00DEF5] ml-3">Ville</p>
                <input placeholder="Votre ville" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mb-4 mt-1 w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)} />

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-end mt-8">
                  <button type="submit" className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white xl:text-xl font-semibold shadow-lg shadow-black/30 cursor-pointer">Je m'inscris !</button>
                </div>
              </div>

            </div>
          </form>

        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="text-white text-lg">Déjà un compte ?</span>
          <button onClick={() => navigate('/login')} className="text-[#00DEF5] hover:underline text-lg cursor-pointer">Connectez-vous !</button>
        </div>

      </div>
    </div>
  )
}

export default Register