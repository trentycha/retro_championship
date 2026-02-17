import { useNavigate } from 'react-router-dom'

const HomeCard = (props) => {
  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/${props.id}`)}>
      <p>{props.status}</p>
      <h3>{props.name}</h3>
      <p>{props.room}</p>
    </div>
  )
}

export default HomeCard
