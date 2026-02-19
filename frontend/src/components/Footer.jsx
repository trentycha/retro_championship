import { Link } from 'react-router-dom'

const Footer = () => {


  return (
    <div className="bg-[#272727]">
      <div className="px-40 pb-20 pt-20">
        <img src='/images/footer.png' alt="pacman-footer" className="w-full"/>

        <div className="flex items-start justify-end gap-30 flex-1 mx-20 my-10">
          <div className="flex flex-col gap-2">
            <h4 className='text-[#F9FF00] font-pixeloid-bold text-2xl'>Tournois</h4>
            <Link to='/tournaments' className="text-[#00DEF5] text-xl font-semibold hover:text-[#F9FF00]">Tous les tournois</Link>
            <Link to='/' className="text-[#00DEF5] text-xl font-semibold hover:text-[#F9FF00]">Chaînes</Link>
            <Link to='/' className="text-[#00DEF5] text-xl font-semibold hover:text-[#F9FF00]">Jeux</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className='text-[#F9FF00] font-pixeloid-bold text-2xl'>Retro Championship</h4>
            <Link to='/' className="text-[#00DEF5] text-xl font-semibold hover:text-[#F9FF00]">A propos</Link>
            <Link to='/' className="text-[#00DEF5] text-xl font-semibold hover:text-[#F9FF00]">Règlement</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className='text-[#F9FF00] font-pixeloid-bold text-2xl'>Pour vous</h4>
            <Link to='/login' className="text-[#00DEF5] text-xl font-semibold hover:text-[#F9FF00]">Je me connecte</Link>
            <div className='flex items-center justify-end gap-3 flex-1 mt-3'>
              <Link to='/'>
                <img src='/images/youtube.png' alt="youtube" className="w-12 hover:opacity-50"/>
              </Link>
              <Link to='/'>
                <img src='/images/instagram.png' alt="instagram" className="w-12 hover:opacity-50"/>
              </Link>
              <Link to='/'>
                <img src='/images/facebook.png' alt="facebook" className="w-12 hover:opacity-50"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
