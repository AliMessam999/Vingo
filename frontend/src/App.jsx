import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
export const serverUrl = "http://localhost:8000";

function App() {

  return (
    <>
      <Routes>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App