import React from 'react'
import Home from './Pages/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from "./Pages/Signup"
import About from './Pages/About'

import Events from './Pages/Events'
import Booking from './Pages/Booking'
import Availability from './Pages/Availability'
import Settings from './Pages/Settings'
import CreateEvent from './Pages/CreateEvent'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/About" element={<About />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events" element={<Events />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App