import { useNavigate } from 'react-router-dom'

const TournamentsCard = (props) => {
    const navigate = useNavigate();

  return (

    <div onClick={() => navigate(`/${props.id}`)} className="bg-[#343434] rounded-2xl shadow-xl shadow-black/30 flex items-start mt-10 mb-10">

        <div className="flex justify-end">
            <img src={props.image} alt="click" className="w-120 rounded-l-xl"/>
        </div>

        <div className="py-12 px-14">
            <h3 className="text-[#F9FF00] font-pixeloid-bold text-2xl">{props.name}</h3>

            <div className="flex gap-40 mt-10">
                <div>
                    <p className="text-white">Date début</p>
                    <p className="text-[#00DEF5] text-lg">{new Date(props.start).toLocaleDateString('fr-FR')}</p>
                    <p className="text-white pt-4">Date fin</p>
                    <p className="text-[#00DEF5] text-lg">{new Date(props.end).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                    <p className="text-white">Status</p>
                    <p className="text-[#00DEF5] text-lg">{props.status}</p>
                    <p className="text-white pt-4">Trophée</p>
                    <p className="text-[#00DEF5] text-lg">{props.trophy}€</p>
                </div>
                <div>
                    <p className="text-white">Room</p>
                    <p className="text-[#00DEF5] text-lg">Room - {props.room}</p>
                    <img src='images/prochain.png' alt="click" className="w-12 pt-5"/>
                </div>
            </div>            
        </div>

    </div>

  )
}

export default TournamentsCard
