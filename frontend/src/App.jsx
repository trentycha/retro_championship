import { Routes, Route, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Tournaments from './pages/Tournaments.jsx'
import TournamentDetail from './pages/TournamentDetail.jsx'
import Loading from './pages/Loading.jsx'
import Error404 from './pages/Error404.jsx'
import Register from './pages/Register.jsx'
import { useAuth } from './hooks/useAuth';
import CreateTournament from './pages/CreateTournament.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  const location = useLocation();

  const hide = ['/loading'].includes(location.pathname);
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      {!hide && <Header />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/tournaments' element={<Tournaments />} />
        <Route path='/tournament/:id' element={<TournamentDetail />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='*' element={<Error404 />} />
        {user?.userStatus?.label === "Admin" && (
            <Route path="/tournament/create" element={<CreateTournament />} />
        )}
      </Routes>
      {!hide && <Footer />}
    </>
  )
}

export default App

