import './App.css'
import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl = "http://localhost:8000";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetCurrentUser from './hooks/useGetCurrentUser'

function App() {
  useGetCurrentUser();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App

// 04:24