import { useState, useEffect } from 'react'
import TournamentsCard from '../components/TournamentsCard.jsx'

const Tournaments = () => {
    const [cards, setCards] = useState([]);
    const [activeButton, setActiveButton] = useState("En cours");
    
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

    const filteredCards = cards.filter(c => c.tournamentStatus?.label === activeButton).sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt));


  return (
    <div className="bg-[#272727]">
        <div className="px-40 pb-20">

            <div className="text-xl pt-15">
                <h4 className='text-[#F9FF00] font-pixeloid-bold text-4xl'>Tous les tournois</h4>
            </div>

            <div className="flex pt-15 pb-10 gap-5">
              <button 
              className={activeButton === "En cours" ? "bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              }              
              onClick={() => setActiveButton("En cours")}>En cours</button>
              <button className={activeButton === "En attente" ? "bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              } onClick={() => setActiveButton("En attente")}>A venir</button>
              <button className={activeButton === "Terminé" ? "bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              }  onClick={() => setActiveButton("Terminé")}>Terminés</button>                 
            </div>

            <div>
                {filteredCards.length === 0 ?
                <p className="text-white pl-8 pt-15">Aucun tournoi pour le moment</p>
                : 
                filteredCards.map(c => (
                        <TournamentsCard key={c.id} id={c.id} image={c.imageIcon} name={c.name} start={c.startedAt} end={c.endedAt} status={c.tournamentStatus?.label} trophy={c.prize?.value} room={c.channel?.label}/>
                    ))
                }
            </div>

        </div>

    </div>
  )
}

export default Tournaments
