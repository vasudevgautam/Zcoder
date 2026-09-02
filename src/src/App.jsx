import React, { useState } from 'react'
 import { BrowserRouter,Routes,Route } from 'react-router-dom'
 import useLocalStorage from 'use-local-storage'
 import Profile from './pages/ProfilePage/Profile'
import Home from './pages/Home/Home'
import Login from './pages/LoginPage/Login'
import Nav from './components/Nav/Nav'
import Signup from './pages/SignupPage/Signup'
import Footer from './components/Footer/Footer'
import Toggle from './components/Toggle/Toggle'
// import RequireAuth from './components/RequireAuth'
import Contests from './pages/ContestPage/Contests'
import Questions from './pages/PracticePage/Questions'
import ProblemStatement from './pages/PracticePage/ProblemStatement'
import Bookmarks from './pages/BookmarksPage/Bookmarks'
import BookmarkedSolutions from './pages/BookmarksPage/BookmarkedSolutions'
import Submissions from './pages/SubmissionsPage/Submissions'
import SubmittedSolutions from './pages/SubmissionsPage/SubmittedSolutions'
import './App.css'
import { useAuthContext } from './hooks/useAuthContext'




const App = () => {
  const {isAuthenticated} = useAuthContext()
  const [isLight,setIsLight] = useLocalStorage("isLight",false)
  const toggleTheme = () => {
    setIsLight(!isLight)
  }
  return (
    <BrowserRouter>
    {/* cutom id-preferences for app */}
      <div className="App" data-theme={isLight ? "light" : "dark"} >
      <Toggle handleChange = {toggleTheme} isChecked ={isLight}/>
      <Nav/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contests' element={<Contests/>}/>
        <Route path='/practice' element={<Questions/>}/>
        <Route path='/practice/:titleSlug' element={<ProblemStatement/>}/>
        <Route path='/bookmarks' element={<Bookmarks/>}/>
        <Route path='/bookmarks/:titleSlug' element={<BookmarkedSolutions/>}/>
        {/* <RequireAuth path='/bookmarks/:titleSlug' element={Bookmarks} isAuthenticated={isAuthenticated}/> */}
        <Route path='/submissions' element={<Submissions/>}/>
        <Route path='/submissions/:titleSlug' element={<SubmittedSolutions/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/signup' element={<Signup />}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      
      
        <Footer />
         
        
        
      </div>
    
    </BrowserRouter>
  
  )
}

export default App

