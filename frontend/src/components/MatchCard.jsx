const MatchCard = (props) => {
  
  return (
    <div className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 px-4 py-4">

      <div className="px-3 py-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
          {props.match.matchStatus?.label ?? "En attente"}
        </span>
      </div>

      <div className="px-3 py-1 mt-1">
        <p className="text-white text-[10px]">{new Date(props.match.startedAt).toLocaleDateString('fr-FR')}</p>
        <p className="text-[#00DEF5] text-[10px]">{new Date(props.match.startedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="px-3 py-2 bg-[#272727] rounded-lg">
          <span className={`text-xs ${props.match.matchStatus?.label === "Terminé" ?
            (props.match.player1?.username === props.match.winner?.username ? "text-[#F9FF00] font-pixeloid-bold" : "text-gray-400")
            : "text-[#00DEF5]"}`}>
            {props.match.player1?.username ?? "..."}
          </span>
        </div>

        <div className="px-3 py-2 bg-[#272727] rounded-lg">
          <span className={`text-xs ${props.match.matchStatus?.label === "Terminé" ?
            (props.match.player2?.username === props.match.winner?.username ? "text-[#F9FF00] font-pixeloid-bold" : "text-gray-400")
            : "text-[#00DEF5]"}`}>
            {props.match.player2?.username ?? "..."}
          </span>
        </div>
      </div>

      <button
        disabled={props.match.matchStatus?.label === "Terminé"}
        className={`mt-4 w-full px-3 py-2 rounded-lg text-xs font-semibold transition
          ${props.match.matchStatus?.label === "Terminé"
            ? "bg-[#3a3a3a] text-gray-500 cursor-not-allowed"
            : "bg-[#c0c700] hover:bg-white hover:text-[#c0c700] text-white cursor-pointer"
          }`}>
        Voir le match
      </button>

    </div>
  )
}

export default MatchCard