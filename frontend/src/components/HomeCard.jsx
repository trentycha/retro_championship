import { useNavigate } from 'react-router-dom'

const HomeCard = (props) => {
  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/${props.id}`)} className="bg-[#343434] rounded-2xl shadow-xl shadow-black/60 my-6 px-10 py-8 flex-1">
      <p className="text-white pb-5">{props.status}</p>
      <h3 className="text-[#F9FF00] font-pixeloid-bold text-lg">{props.name}</h3>
      <p className="text-[#00DEF5]">Room - {props.channel}</p>
      <div className="flex justify-end">
        <img src='/images/prochain.png' alt="click" className="w-8 pt-7"/>
      </div>
    </div>
  )
}

export default HomeCard
