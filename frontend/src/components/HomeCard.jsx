import { useNavigate } from 'react-router-dom'

const HomeCard = (props) => {
  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/tournament/${props.id}`)} className="bg-[#343434] rounded-2xl shadow-lg shadow-black/60 my-4 px-6 py-6 xl:my-6 xl:px-10 xl:py-8 flex-1 hover:shadow-xl hover:scale-102 cursor-pointer">
      <p className="text-white xl:pb-5">{props.status}</p>
      <h3 className="text-[#F9FF00] font-pixeloid-bold xl:text-lg">{props.name}</h3>
      <p className="text-[#00DEF5] text-sm">Room - {props.channel}</p>
      <div className="flex justify-end">
        <img src='/images/prochain.png' alt="click" className="w-6 xl:w-8 xl:pt-7"/>
      </div>
    </div>
  )
}

export default HomeCard
