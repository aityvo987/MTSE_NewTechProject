import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import './props.css'
import NavigateBar from './components/NavBar';
import {DefaultNavBar} from './components/defaultNavBar';
import Homepage from './pages/HomePage';
import Sidebar from './components/SideBar';
import ProfilePage from './pages/Profile';
import ResearchPage from './pages/VIewResearch';
import {Login} from './pages/Login';
import Signup from './pages/Signup';
import {ViewTopicPage} from './pages/general/viewTopic';
import {ViewLecturerPage} from './pages/general/viewLecturer';
import { AdminPage } from './pages/admin/adminDashBoard';
function App() {
  // const [backendData, setBackendData] = useState ([{}])
  // useEffect (() => {
  // fetch("/api").then(
  // response => response.json()
  // ).then(
  // data=> {
  // setBackendData(data)
  // }
  // )
  // },[])
  return (
    
    <div className="App">

      <div className="App-content" style={{width:"100%"}}>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/research' element={<ResearchPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/topic' element={<ViewTopicPage/>}/>
            <Route path='/lecturer' element={<ViewLecturerPage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
