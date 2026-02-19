import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Tournaments from './pages/Tournaments.jsx'
import TournamentDetail from './pages/TournamentDetail.jsx'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/tournaments' element={<Tournaments />} />
        <Route path='/tournament/:id' element={<TournamentDetail />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
