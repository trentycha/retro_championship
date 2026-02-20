import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className="bg-[#272727]">
      <div className="px-4 py-4 xl:px-40 xl:pb-20 xl:pt-20">
        <img src='/images/footer.png' alt="pacman-footer" className="hidden xl:w-full"/>
        <img src='/images/resp-footer.png' alt="pacman-responsive-footer" className="w-full"/>

        <div className="pl-5 xl:flex xl:items-start xl:justify-end xl:gap-30 xl:flex-1 xl:mx-20 xl:my-10">
          <div className="flex flex-col gap-2 pt-5">
            <h4 className='text-[#F9FF00] font-pixeloid-bold xl:text-2xl'>Tournois</h4>
            <Link to='/tournaments' className="text-[#00DEF5] xl:text-xl font-semibold hover:text-[#F9FF00]">Tous les tournois</Link>
            <Link to='/' className="text-[#00DEF5] xl:text-xl font-semibold hover:text-[#F9FF00]">Chaînes</Link>
            <Link to='/' className="text-[#00DEF5] xl:text-xl font-semibold hover:text-[#F9FF00]">Jeux</Link>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <h4 className='text-[#F9FF00] font-pixeloid-bold xl:text-2xl'>Retro Championship</h4>
            <Link to='/' className="text-[#00DEF5] xl:text-xl font-semibold hover:text-[#F9FF00]">A propos</Link>
            <Link to='/' className="text-[#00DEF5] xl:text-xl font-semibold hover:text-[#F9FF00]">Règlement</Link>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <h4 className='text-[#F9FF00] font-pixeloid-bold xl:text-2xl'>Pour vous</h4>
            <Link to='/login' className="text-[#00DEF5] xl:text-xl font-semibold hover:text-[#F9FF00]">Je me connecte</Link>
            <div className='flex items-center xl:justify-end xl:gap-3 xl:flex-1 xl:mt-3'>
              <Link to='/'>
                <img src='/images/youtube.png' alt="youtube" className="w-8 xl:w-12 hover:opacity-50"/>
              </Link>
              <Link to='/'>
                <img src='/images/instagram.png' alt="instagram" className="w-8 xl:w-12 hover:opacity-50"/>
              </Link>
              <Link to='/'>
                <img src='/images/facebook.png' alt="facebook" className="w-8 xl:w-12 hover:opacity-50"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
