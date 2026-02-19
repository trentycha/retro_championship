const Error404 = () => {
  return (
    <div className="bg-[#272727] flex items-center gap-10 justify-center min-h-screen">
      <div>
            <img src='/images/error.gif' alt="loading" className="w-100"/>
        </div>
        <div>
            <h1 className="text-[#F9FF00] font-pixeloid-bold text-5xl">Game Over</h1>
            <h3 className='text-[#00DEF5] font-bold text-2xl'>Erreur 404</h3>
            <p className=" text-white text-xl pt-5">Oups ! La page que vous essayez d'atteindre n'a pas été trouvée...</p>
        </div>
    </div>
  )
}

export default Error404
