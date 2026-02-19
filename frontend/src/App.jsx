import { Routes, Route, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Tournaments from './pages/Tournaments.jsx'
import TournamentDetail from './pages/TournamentDetail.jsx'
import Loading from './pages/Loading.jsx'

function App() {
  const location = useLocation();

  const hide = location.pathname === '/loading';

  return (
    <>
      {!hide && <Header />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/tournaments' element={<Tournaments />} />
        <Route path='/tournament/:id' element={<TournamentDetail />} />
        <Route path='/loading' element={<Loading />} />
      </Routes>
      {!hide && <Footer />}
    </>
  )
}

export default App
