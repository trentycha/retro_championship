import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TournamentDetail = () => {
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {

        const fetchTournament = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tournament/${id}`);
                const data = await response.json();
                setTournament(data);
                setLoading(false);
            } catch (error) {
                {error.message}
            }
        };

        fetchTournament();
    }, [id]);

    if(loading) {
        return <div>Chargement...</div>
    }


  return (
    <div className="bg-[#272727]">
        <div className="px-40 pb-20">
      
        <div className="relative">
          <img src='/images/pacman.jpg' alt="homepage" className="w-500 rounded-xl opacity-50"/>

          <div className="absolute left-17 top-44 bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start gap-6 px-10 py-10">
            <div>
                <h1 className="text-[#F9FF00] font-pixeloid-bold text-xl">{tournament.name}</h1>
                <p className="text-[#00DEF5] text-base">{tournament.tournamentStatus?.label} - Room {tournament.channel?.label}</p>
                <div className="flex gap-6 pt-4">
                    <div>
                        <p className="text-white">Date début</p>
                        <p className="text-[#00DEF5] text-base">{new Date(tournament.startedAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                        <p className="text-white">Date fin</p>
                        <p className="text-[#00DEF5] text-base">{new Date(tournament.endedAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>
            </div>
            <div className="w-px bg-[#4b4b4b] self-stretch"></div>
            <div className="pl-5 pr-40">
                <p className="text-white">Trophée</p>
                <p className="text-[#F9FF00] font-pixeloid-bold text-xl">{tournament.prize?.value}€</p>
                <p className="text-white pt-5">Gagnant</p>
                {tournament.winner ? <p className="text-[#F9FF00] font-pixeloid-bold text-xl">{tournament.winner?.name}</p>
                : <p className="text-[#F9FF00] font-pixeloid-bold text-xl">Indéfini</p>
                }
                
            </div>
            <div className="w-px bg-[#4b4b4b] self-stretch"></div>
            <div>
                <button className="bg-[#c0c700] hover:bg-white hover:text-[#c0c700] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-6">Je m'inscris !</button>
                <button className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-6 ml-4">Je regarde !</button>
            </div>
          </div>

        </div>
        
        </div>
    </div>
  )
}

export default TournamentDetail
