
const Homepage = () => {
  return (
    <div className="bg-[#272727]">
      <div className="px-40 pb-20">
        <div className="relative">
          <img src='/images/homepage.png' alt="homepage" className="w-500 rounded-xl opacity-50"/>
          <h1 className="absolute top-50 left-15 text-[#F9FF00] font-pixeloid-bold text-6xl">Tournois e-sport <br/> retrogaming</h1>
          <p className="absolute top-90 left-15 text-white text-2xl">Inscrivez-vous et participez en illimité à des tournois <br/>
            de retro-gaming à travers toute la France !</p>
          <img src='/images/mario-home.png' alt="mario-home" className="absolute top-45 left-210 w-120"/>
        </div>
      </div>
    </div>
  )
}

export default Homepage
