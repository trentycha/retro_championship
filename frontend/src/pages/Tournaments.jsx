import { useState, useEffect } from 'react'
import TournamentsCard from '../components/TournamentsCard.jsx'
import Loading from './Loading.jsx'

const Tournaments = () => {
    const [cards, setCards] = useState([]);
    const [activeButton, setActiveButton] = useState("En cours");
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchThreeCards = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tournament`);
            const data = await response.json();
            setCards(data);
            setLoading(false);
          } catch(error) {
            console.error(error.message);
          }
        }
    
        fetchThreeCards();
      }, [])

    const filteredCards = cards.filter(c => c.tournamentStatus?.label === activeButton)
    .sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt));
    
    if(loading){
      return <Loading />
    }

  return (
    <div className="bg-[#272727]">
        <div className="xl:px-40 pb-10 xl:pb-5">

            <div className="pt-8 pl-5 xl:pt-15 xl:pl-0">
                <h4 className='text-[#F9FF00] font-pixeloid-bold text-2xl xl:text-4xl'>Tous les tournois</h4>
            </div>

            <div className="flex pt-8 pl-5 xl:pl-0 xl:pt-10 pb-5 xl:pb-5 gap-3 xl:gap-5">
              <button 
              className={activeButton === "En cours" ? "bg-[#00DEF5] px-5 py-3 xl:px-7 xl:py-4 rounded-lg text-white xl:text-lg font-semibold shadow-lg shadow-black/30"
              : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-5 py-3 xl:px-7 xl:py-4 rounded-lg text-white xl:text-lg font-semibold shadow-lg shadow-black/30 cursor-pointer"
              }              
              onClick={() => setActiveButton("En cours")}>En cours</button>
              <button className={activeButton === "En attente" ? "bg-[#00DEF5] px-4 py-2 xl:px-7 xl:py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-5 py-3 xl:px-7 xl:py-4 rounded-lg text-white xl:text-lg font-semibold shadow-lg shadow-black/30 cursor-pointer"
              } onClick={() => setActiveButton("En attente")}>A venir</button>
              <button className={activeButton === "Terminé" ? "bg-[#00DEF5] px-4 py-2 xl:px-7 xl:py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30"
              : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-5 py-3 xl:px-7 xl:py-4 rounded-lg text-white xl:text-lg font-semibold shadow-lg shadow-black/30 cursor-pointer"
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
