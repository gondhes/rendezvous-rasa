import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import Register from './components/pages/Register'
import RegistrationPage from './components/common/register/RegistrationPage'
import RegisterConfirmation from './components/pages/RegisterConfirmation'
import Events from './components/common/event/Events';
import AboutUs from './components/pages/AboutUs'
import Explore from './components/pages/Explore'
import ExploreSearch from './components/pages/ExploreSearch'
import DetailEvent from './components/common/explore/DetailEvent'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/register/menu' element={<RegistrationPage/>} />
        <Route path='/register/events' element={<Events/>} />
        <Route path='/register/confirmation' element={<RegisterConfirmation/>} />
        <Route path='/aboutUs' element={<AboutUs/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/exploreSearch' element={<ExploreSearch/>} />
        <Route path='/detailEvent' element={<DetailEvent/>} />
      </Routes>
    </Router>
  )
}

export default App
