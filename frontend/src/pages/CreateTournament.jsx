import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthService from '../services/AuthService.jsx';

const CreateTournament = () => {
    const [name, setName] = useState("");
    const [startedAt, setStartedAt] = useState("");
    const [endedAt, setEndedAt] = useState("");
    const [gameId, setGameId] = useState("");
    const [channelId, setChannelId] = useState("");
    const [tournamentStatus, setTournamentStatus] = useState("En attente");
    const [prizeName, setPrizeName] = useState("");
    const [prizeDescription, setPrizeDescription] = useState("");
    const [prizeValue, setPrizeValue] = useState("");
    const [games, setGames] = useState([]);
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchGames = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/game`);
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchChannels = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/channel`);
                const data = await response.json();
                setChannels(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchGames();
        fetchChannels();
    }, []);

    const handleSubmit = async () => {
        setError("");

        if (!name || !startedAt || !endedAt || !gameId || !channelId || !prizeName || !prizeValue || !prizeDescription) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const prizeResponse = await fetch(`http://localhost:3000/api/prize`, {
                method: "POST",
                headers: AuthService.isAuthHeaders(),
                body: JSON.stringify({
                    name: prizeName,
                    description: prizeDescription,
                    value: parseFloat(prizeValue)
                }),
            });
            const prizeData = await prizeResponse.json();
            const prizeId = prizeData.id;

            const response = await fetch(`http://localhost:3000/api/tournament`, {
                method: "POST",
                headers: AuthService.isAuthHeaders(),
                body: JSON.stringify({
                    name,
                    startedAt: new Date(startedAt).toISOString(),
                    endedAt: new Date(endedAt).toISOString(),
                    game: games.find(g => g.id === parseInt(gameId))?.name,
                    creator: user.username,
                    tournamentStatus,
                    channelId: channelId ? parseInt(channelId) : null,
                    prizeId,
                }),
            });
        
            const data = await response.json();
            navigate(`/tournament/${data.id}`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-[#272727]">
            <div className="xl:px-40 pb-10 xl:pb-5">

                <div className="pt-8 pl-5 xl:pt-15 xl:pl-0">
                    <h4 className="text-[#F9FF00] font-pixeloid-bold text-2xl xl:text-4xl">Créer un tournoi</h4>
                </div>

                <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 px-10 py-10 mt-8">

                    <div className="flex gap-10 mb-4">

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Nom du tournoi</p>
                            <input placeholder="Nom du tournoi" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Jeu</p>
                            <select className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={gameId} onChange={(e) => setGameId(e.target.value)}>
                                <option value="">Sélectionne un jeu</option>
                                {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-10 mb-4">

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Date de début</p>
                            <input type="datetime-local" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={startedAt} onChange={(e) => setStartedAt(e.target.value)} />
                        </div>

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Date de fin</p>
                            <input type="datetime-local" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={endedAt} onChange={(e) => setEndedAt(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex gap-10 mb-4">

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Room</p>
                            <select className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                                <option value="">Choisis une room</option>
                                {channels.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Statut</p>
                            <select className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={tournamentStatus} onChange={(e) => setTournamentStatus(e.target.value)}>
                                <option value="En attente">En attente</option>
                                <option value="En cours">En cours</option>
                                <option value="Terminé">Terminé</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex gap-10 mb-4">

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Nom du prix</p>
                            <input placeholder="Nom du prize" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={prizeName} onChange={(e) => setPrizeName(e.target.value)} />
                        </div>

                        <div className="flex flex-col flex-1">
                            <p className="text-[#00DEF5] ml-3">Valeur du prix en €</p>
                            <input type="number" placeholder="Valeur en €" className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full"
                                value={prizeValue} onChange={(e) => setPrizeValue(e.target.value)} />
                        </div>

                    </div>

                    <div className="flex flex-col mb-4">
                        <p className="text-[#00DEF5] ml-3">Description du prix</p>
                        <textarea placeholder="Description du prize" rows={4} className="bg-[#4F4F4F] text-white px-4 py-3 rounded-lg mt-1 w-full resize-none"
                            value={prizeDescription} onChange={(e) => setPrizeDescription(e.target.value)} />
                    </div>

                    {error && <p className="text-red-500 mt-4 text-right">{error}</p>}

                    <div className="flex justify-end mt-8">
                        <button onClick={handleSubmit}
                            className="bg-[#c0c700] hover:bg-white hover:text-[#c0c700] px-7 py-4 rounded-lg text-white text-lg font-semibold shadow-lg shadow-black/30 cursor-pointer">
                            Créer le tournoi
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateTournament;