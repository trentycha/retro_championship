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
          <h4 className='text-[#00DEF5]'>Prochain tournois</h4>
        </div>

        <div className="flex gap-10">
          {cards.map(c => (<HomeCard key={c.id} id={c.id} status={c.tournamentStatus.label} name={c.name} channel={c.channel.label}/>))}
        </div>

        <div>
          <img src='/images/separation.png' alt="pacman-ghost-separation" className="w-100 mx-100 my-20"/>
        </div>

      </div>

    </div>
  )
}

export default Homepage
