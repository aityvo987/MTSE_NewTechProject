import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import NavigateBar from './components/NavBar';
import Homepage from './pages/HomePage';
import Sidebar from './components/SideBar';
import ProfilePage from './pages/Profile';
import ResearchPage from './pages/VIewResearch';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
      <NavigateBar />

      <div className="App-content">
        <Sidebar />
        <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          {/* <Route exact path="/research/:idresearch" component={ResearchPage} /> */}
          <Route path='/research' element={<ResearchPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
