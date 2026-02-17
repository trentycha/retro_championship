import { useState, useEffect } from 'react'
import HomeCard from '../components/HomeCard.jsx'

const Homepage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchThreeCards = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tournament');
        const data = await response.json();
        setCards(data);
      } catch(error) {
        {error.message};
      }
    }

    fetchThreeCards();
  }, [])

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
        
        <div className="mt-20 text-xl">
          <h4 className='text-[#00DEF5] font-bold'>Prochains tournois...</h4>
        </div>
        <div className="flex gap-10">
          {cards.map(c => (<HomeCard key={c.id} id={c.id} status={c.tournamentStatus.label} name={c.name} channel={c.channel.label}/>))}
        </div>

        <div>
          <img src='/images/separation.png' alt="pacman-ghost-separation" className="w-100 mx-100 my-20"/>
        </div>

        <div className="flex items-center gap-6">
          <div className="">
            <a href='/' className="relative">
              <img src='/images/tournaments.jpg' alt="tounrament-home" className="w-170 rounded-xl opacity-50 shadow-xl shadow-black"/>
              <h3 className="absolute top-12 left-12 text-[#F9FF00] font-pixeloid-bold text-3xl">Tous les tournois</h3>
              <span className="absolute top-87 left-115 bg-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30">Je découvre !</span>
            </a>
          </div>
          <div className=" relative">
            <a href='/' className="my-10 mx-10">
              <img src='/images/login-home.jpg' alt="tournament-home" className="w-125 rounded-xl opacity-50 shadow-xl shadow-black"/>
              <h3 className="absolute top-15 left-10 text-[#F9FF00] font-pixeloid-bold text-3xl">A vous de jouer !</h3>
              <span className="absolute top-35 left-65 bg-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30">Je me connecte !</span>
            </a>
            <a href='/' className="my-10 mx-10">
              <img src='/images/about.jpg' alt="tounrament-home" className="w-125 rounded-xl opacity-50 shadow-xl shadow-black"/>
              <h3 className="absolute top-72 left-10 text-[#F9FF00] font-pixeloid-bold text-3xl">A propos de <br/> RetroChampionship</h3>
              <span className="absolute top-98 left-72 bg-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30">Qui sont-ils ?</span>
            </a>
          </div>
        </div>

        <div className="mt-20 text-xl">
          <h4 className='text-[#00DEF5] font-bold'>Les sponsors de RetroChampionship</h4>
        </div>

      </div>

    </div>
  )
}

export default Homepage
