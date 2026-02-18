import { useState, useEffect } from 'react'
import TournamentsCard from '../components/TournamentsCard.jsx'

const Tournaments = () => {
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

            <div className="text-xl pt-15">
                <h4 className='text-[#F9FF00] font-pixeloid-bold text-4xl'>Tous les tournois</h4>
            </div>
            <div>
                {cards
                    .filter(c => c.tournamentStatus?.label === 'En cours')
                    .sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt))
                    .map(c => (
                        <TournamentsCard key={c.id} image={c.imageIcon} name={c.name} start={c.startedAt} end={c.endedAt} status={c.tournamentStatus?.label} trophy={c.prize?.value} room={c.channel?.label}/>
                    ))
                }
            </div>

        </div>

    </div>
  )
}

export default Tournaments
