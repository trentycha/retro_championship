const MatchCard = (props) => {

  return (

    <div className="bg-[#272727] rounded-2xl w-52 shadow-xl shadow-black/30 overflow-hidden px-4 py-4 my-5">

      <div className="px-3 py-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
          {props.match.matchStatus?.label ?? "En attente"}
        </span>
      </div>

      <div className="flex flex-col">
        <div className="px-3">
          <span className={`text-xs ${props.match.matchStatus?.label === "Terminé" ?
            (props.match.player1?.username === props.match.winner?.username ? "text-[#F9FF00] font-pixeloid-bold" : "text-gray-400")
            : "text-[#00DEF5]"}`}>
            {props.match.player1?.username ?? "..."}
          </span>
        </div>
        
        <div className="px-3">
          <span className={`text-xs ${props.match.matchStatus?.label === "Terminé" ?
            (props.match.player2?.username === props.match.winner?.username ? "text-[#F9FF00] font-pixeloid-bold" : "text-gray-400")
            : "text-[#00DEF5]"}`}>
            {props.match.player2?.username ?? "..."}
          </span>
        </div>
      </div>
      
    </div>

  )
}

export default MatchCard