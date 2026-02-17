import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Header from './components/Header.jsx'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
