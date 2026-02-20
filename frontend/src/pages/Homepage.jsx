import { useState, useEffect } from 'react'
import HomeCard from '../components/HomeCard.jsx'
import Loading from './Loading.jsx'
import MenuBurger from '../components/MenuBurger.jsx'

const Homepage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const carousel = [<img src="/images/gentle-mates.png" alt="gentle-mates" className="w-50 bg-[#272727]" />,
     <img src="/images/infogrames.png" alt="infogrames" className="w-50 bg-[#272727]" />,
      <img src="/images/nintendo.png" alt="nintendo" className="w-50 bg-[#272727]" />,
       <img src="/images/sega.png" alt="sega" className="w-50 bg-[#272727]" />,
        <img src="/images/pepsi.png" alt="pepsi" className="w-50 bg-[#272727]" />]

  const [image, setImage] = useState(carousel[0]);

  const handleCarouselPlus = () => {
    carousel.forEach(c => {
      setImage(c +1);
    })
  }

  const handleCarouselMoins = () => {
    carousel.forEach(c => {
      setImage(c -1);
    })
  }

  useEffect(() => {
    const fetchThreeCards = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tournament');
        const data = await response.json();
        setCards(data);
        setLoading(false);
      } catch(error) {
        {error.message};
      }
    }

    fetchThreeCards();
  }, [])

  if(loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#272727]">

      <div className="px-5 pb-5 xl:px-40 xl:pb-20">

        <div className="relative pt-4">
          <img src='/images/homepage.png' alt="homepage" className="w-100 xl:w-500 rounded-xl opacity-50"/>
          <h1 className="absolute top-10 left-5 xl:top-50 xl:left-15 text-[#F9FF00] font-pixeloid-bold text-lg leading-none xl:text-6xl">Tournois e-sport <br/> retrogaming</h1>
          <p className="absolute xl:hidden top-20 left-5 text-white text-sm">Inscrivez-vous et participez en illimité à des tournois
            de retro-gaming à travers toute la France !</p>
          <p className="hidden absolute xl:top-90 xl:left-15 text-white xl:text-2xl">Inscrivez-vous et participez en illimité à des tournois <br/>
            de retro-gaming à travers toute la France !</p>
          <img src='/images/mario-home.png' alt="mario-home" className="absolute top-25 left-70 w-25 xl:top-45 xl:left-210 xl:w-120"/>
        </div>
        
        <div className="mt-10 xl:mt-20 xl:text-xl">
          <h4 className='text-[#00DEF5] font-bold'>Prochains tournois...</h4>
        </div>
        <div className="hidden xl:flex xl:gap-10">
          {cards.slice(0, 3).map(c => (<HomeCard key={c.id} id={c.id} status={c.tournamentStatus.label} name={c.name} channel={c.channel.label}/>))}
        </div>
        <div className="xl:hidden">
          {cards.slice(0, 3).map(c => (<HomeCard key={c.id} id={c.id} status={c.tournamentStatus.label} name={c.name} channel={c.channel.label}/>))}
        </div>

        <div>
          <img src='/images/separation.png' alt="pacman-ghost-separation" className="w-60 mx-auto py-5 xl:w-100 xl:mx-100 xl:my-20"/>
        </div>

        <div className="flex items-center gap-6">
          <div className="hover:opacity-80">
            <a href='/tournaments' className="relative">
              <img src='/images/tournaments.jpg' alt="tounrament-home" className="w-170 rounded-xl opacity-50 shadow-xl shadow-black/30 hover:shadow-black"/>
              <h3 className="absolute top-12 left-12 text-[#F9FF00] font-pixeloid-bold text-3xl">Tous les tournois</h3>
              <span className="absolute top-87 left-115 bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30">Je découvre !</span>
            </a>
          </div>
          <div className="relative">
            <a href='/login' className="my-10 mx-10 hover:opacity-80">
              <img src='/images/login-home.jpg' alt="tournament-home" className="w-125 rounded-xl opacity-50 shadow-xl shadow-black/30 hover:shadow-black"/>
              <h3 className="absolute top-15 left-10 text-[#F9FF00] font-pixeloid-bold text-3xl">A vous de jouer !</h3>
              <span className="absolute top-35 left-65 bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30">Je me connecte !</span>
            </a>
            <a href='/' className="my-10 mx-10 hover:opacity-80">
              <img src='/images/about.jpg' alt="tounrament-home" className="w-125 rounded-xl opacity-50 shadow-xl shadow-black/30 hover:shadow-black"/>
              <h3 className="absolute top-72 left-10 text-[#F9FF00] font-pixeloid-bold text-3xl">A propos de <br/> RetroChampionship</h3>
              <span className="absolute top-98 left-72 bg-[#00DEF5] hover:bg-white hover:text-[#00DEF5] px-7 py-4 rounded-lg text-white text-xl font-semibold shadow-lg shadow-black/30">Qui sont-ils ?</span>
            </a>
          </div>
        </div>

        <div className="mt-30 text-xl">
          <h4 className='text-[#00DEF5] font-bold'>Les sponsors de RetroChampionship</h4>
        </div>

        <div className="h-56 flex xl:hidden">
        <button onClick={handleCarouselPlus}>Flèche</button>
          {image}
        <button onClick={handleCarouselMoins}>Flèche</button>
        </div>

        <div className='hidden xl:flex items-center gap-12 mt-10'>
          <img src='/images/gentle-mates.png' alt="gentle-mates" className="w-50 opacity-50 flex-1"/>
          <img src='/images/infogrames.png' alt="gentle-mates" className="w-50 opacity-50 flex-1"/>
          <img src='/images/nintendo.png' alt="gentle-mates" className="w-50 opacity-50 flex-1"/>
          <img src='/images/sega.png' alt="gentle-mates" className="w-50 opacity-50 flex-1"/>
          <img src='/images/pepsi.png' alt="gentle-mates" className="w-50 opacity-50 flex-1"/>
        </div>
        <div className="relative mb-20">
          {/* <img src='/images/tetris-two.png' alt="tetris-block" className="absolute left-250 w-50"/> */}
          <img src='/images/tetris-one.png' alt="tetris-block" className="absolute w-80"/>
        </div>

      </div>

    </div>
  )
}

export default Homepage
