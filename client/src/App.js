import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import './props.css'
import NavigateBar from './components/NavBar';
import {DefaultNavBar} from './components/defaultNavBar';
import Homepage from './pages/HomePage';
import ProfilePage from './pages/Profile';
import ResearchPage from './pages/VIewResearch';
import {Login} from './pages/Login';
import {ViewTopicPage} from './pages/general/viewTopic';
import {ViewLecturerPage} from './pages/general/viewLecturer';
import { UpdateProfile } from './pages/user/updateProfile';
import { AdminPage } from './pages/admin/adminDashBoard';
import { RegisterTopicPage } from './pages/user/registerTopic';
import { ApproveTopicPage } from './pages/user/approveTopic';
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
            <Route path='/profile' element={<UpdateProfile/>}/>
            <Route path='/research' element={<ResearchPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/topic' element={<ViewTopicPage/>}/>
            <Route path='/lecturer' element={<ViewLecturerPage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/register' element={<RegisterTopicPage/>}/>
            <Route path='/approve' element={<ApproveTopicPage/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
