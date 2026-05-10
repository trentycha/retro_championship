import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from './Loading.jsx';
import MatchCard from '../components/MatchCard.jsx';
import { useAuth } from '../hooks/useAuth';
import ConfirmSub from '../components/ConfirmSub.jsx';
import SubStatus from '../components/SubStatus.jsx';
import AuthService from '../services/AuthService.jsx';

const TournamentDetail = () => {
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rounds, setRounds] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [status, setStatus] = useState(null);
    const [activeRound, setActiveRound] = useState(null);
    const {id} = useParams();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tournament/${id}`);
                const data = await response.json();
                setTournament(data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchTournament();
    }, [id]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tournament/${id}/matches`);
                const dataMatches = await response.json();

                 const roundIds = dataMatches.map((m) => m.roundMatch?.id)
                    .filter((v, i, arr) => arr.indexOf(v) === i)
                    .sort((a, b) => a - b);

                setRounds(
                    roundIds.map((roundId) => ({
                        roundId,
                        label: dataMatches.find((m) => m.roundMatch?.id === roundId)?.roundMatch?.label, //on cherche le premier match qui correspond à l'id du round
                        matches: dataMatches.filter((m) => m.roundMatch?.id === roundId), //on récupère tous les matchs de ce round
                    }))
                );

                setActiveRound(roundIds[0]);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchMatches();
    }, [id]);

    const handleConfirm = async () => {

        setPopUp(false);

        try {
            const response = await fetch(`http://localhost:3000/api/tournament/${id}/subscribe`, {
                method: "POST",
                headers: AuthService.isAuthHeaders(),
            });

            const data = await response.json();

            setStatus({ ok: response.ok, data });
        } catch (error) {
            setStatus(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/tournament/${id}`, {
                method: "DELETE",
                headers: AuthService.isAuthHeaders(),
            });
            navigate('/tournaments');
        } catch (error) {
            console.error(error.message);
        }
    };

    if(loading) {
        return <Loading />
    }

  return (
    <div className="bg-[#272727]">
        <div className="px-40 pb-20">
      
        <div className="relative">
          <img src={tournament.imageDetails || '/images/pacman.jpg'} alt="homepage" className="w-500 rounded-xl opacity-50"/>

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
                    {tournament.winner ? <p className="text-[#F9FF00] font-pixeloid-bold text-xl">{tournament.winner?.username}</p>
                    : <p className="text-[#F9FF00] font-pixeloid-bold text-xl">Indéfini</p>
                    }
                    
                </div>
            <div className="w-px bg-[#4b4b4b] self-stretch"></div>
                <div>
                    <button onClick={() => setPopUp(true)} disabled={!isAuthenticated}
                        className={isAuthenticated ? "bg-[#c0c700] hover:bg-white hover:text-[#c0c700] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-6 cursor-pointer"
                        : "bg-[#5a5a00] px-7 py-4 rounded-lg text-gray-400 text-lg font-semibold shadow-lg shadow-black/30 mt-6 cursor-not-allowed opacity-50"}>
                        Je m'inscris !
                    </button>
                    <button className="bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 mt-6 ml-4 cursor-pointer">Je regarde !</button>
                </div>
          </div>

        </div>

        <div className="mt-30">
            <div className="flex gap-3 px-5 pb-6 w-full justify-between">
                <div className="flex gap-3">
                    {rounds.map((round) => (
                        <button
                            key={round.roundId}
                            onClick={() => setActiveRound(round.roundId)}
                            className={activeRound === round.roundId
                                ? "bg-[#00DEF5] px-5 py-3 rounded-lg text-white font-semibold shadow-lg shadow-black/30"
                                : "bg-[#2f2f2f] hover:bg-white hover:text-[#00DEF5] px-5 py-3 rounded-lg text-white font-semibold shadow-lg shadow-black/30 cursor-pointer"
                            }>
                            {round.label}
                        </button>
                    ))}
                </div>

                {user?.id === tournament.creatorId && (
                    <button onClick={handleDelete}
                        className="bg-red-700 hover:bg-white hover:text-red-700 px-5 py-3 rounded-lg text-white font-semibold shadow-lg shadow-black/30 cursor-pointer">
                        Supprimer
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-5 px-5">
                {rounds.find(r => r.roundId === activeRound)?.matches.map((match) => (
                    <MatchCard key={match.id} match={match} round={rounds.find(r => r.roundId === activeRound)?.label} />
                ))}
            </div>
        </div>
        
        </div>

        {popUp && (<ConfirmSub tournament={tournament} onClose={() => setPopUp(false)} onConfirm={handleConfirm}/>)}
        {status && (<SubStatus status={status} onClose={() => setStatus(null)}/>)}

    </div>
  )
}

export default TournamentDetail