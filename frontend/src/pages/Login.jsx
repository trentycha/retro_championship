
const Login = () => {
  return (
    <div className="bg-[#272727]">
      <div className="px-60">
        <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start">

            <div className="flex-1">
                <img src='/images/login.jpg' alt="login" className="w-full rounded-l-xl"/>
            </div>

            <form className="flex-1 pl-15">
                <h2 className="text-[#F9FF00] font-pixeloid-bold text-3xl mt-15 mb-10">Connectez-vous !</h2>
                <p className='text-[#00DEF5] ml-3'>Email</p>
                <input placeholder="Votre email" className='bg-[#4F4F4F] px-4 py-3 pr-60 rounded-lg mb-4 mt-1'></input>
                <p className='text-[#00DEF5] ml-3'>Mot de passe</p>
                <input placeholder="Votre mot de passe" className='bg-[#4F4F4F] px-4 py-3 pr-60 rounded-lg mb-4 mt-1'></input>
                <button type="submit" className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30 mt-6">Je me connecte !</button>
            </form>

        </div>
      </div>
    </div>
  )
}

export default Login
