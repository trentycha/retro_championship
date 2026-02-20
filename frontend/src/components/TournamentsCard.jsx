import { useNavigate } from 'react-router-dom'

const TournamentsCard = (props) => {
    const navigate = useNavigate();

  return (

    <div onClick={() => navigate(`/tournaments/${props.id}`)} className="bg-[#343434] mx-5 xl:mx-0 rounded-2xl shadow-xl shadow-black/30 xl:flex xl:items-start xl:mt-10 xl:mb-10">

        <div className="xl:flex xl:justify-end">
            <img src={props.image} alt="click" className="w-full rounded-t-xl xl:rounded-t-none xl:w-120 xl:rounded-l-xl"/>
        </div>

        <div className="mb-5 xl:mb-0 py-6 px-8 xl:py-12 xl:px-14">
            <h3 className="text-[#F9FF00] leading-none font-pixeloid-bold text-lg xl:text-2xl">{props.name}</h3>

            <div className="pt-5 xl:pt-0 flex gap-7 xl:gap-40 xl:mt-10">
                <div>
                    <p className="text-white text-xs xl:text-base">Date début</p>
                    <p className="text-[#00DEF5] text-sm xl:text-lg">{new Date(props.start).toLocaleDateString('fr-FR')}</p>
                    <p className="text-white pt-2 xl:pt-4 text-xs xl:text-base">Date fin</p>
                    <p className="text-[#00DEF5] text-sm xl:text-lg">{new Date(props.end).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                    <p className="text-white text-xs xl:text-base">Status</p>
                    <p className="text-[#00DEF5] text-sm xl:text-lg">{props.status}</p>
                    <p className="text-white pt-2 xl:pt-4 text-xs xl:text-base">Trophée</p>
                    <p className="text-[#00DEF5] text-sm xl:text-lg">{props.trophy}€</p>
                </div>
                <div>
                    <p className="text-white text-xs xl:text-base">Room</p>
                    <p className="text-[#00DEF5] text-sm xl:text-lg">Room - {props.room}</p>
                    <img src='images/prochain.png' alt="click" className="w-8 pt-3 xl:w-12 xl:pt-5"/>
                </div>
            </div>            
        </div>

    </div>

  )
}

export default TournamentsCard
