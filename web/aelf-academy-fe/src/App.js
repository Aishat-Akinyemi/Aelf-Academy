import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Coursedetails from './Pages/Coursedetails';
import Courses from './Pages/Courses';
import Quest from './Pages/Quest';
import Account from './Pages/Account';
import Submission from './Pages/Submission'

const userList = [
  {
    Username: 'chief_moderator1',
    Role: 'Chief Moderator',
    Level: 0,
    Reward: 100
  },
  {
    Username: 'admin1',
    Role: 'Admin',
    Level: 0,
    Reward: 200
  },
  {
    Username: 'Kate',
    Role: 'Learner',
    Level: 1,
    Reward: 500
  }
]

function App() {
  const [user, setUser] = useState(userList[2]);
  return (
    <Router>
        <Header user={user}/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/course/:courseId' element={<Coursedetails/>}/>            
            <Route path='/quest/:courseId' element={<Quest/>}/>
            <Route path='/account' element={<Account user={user}/>}/>
            <Route path='/entries/:courseId' element={<Submission/>}/>
            {/* <Route path='/' element={}/> */}
            <Route path='*' element={<Home/>}/>
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
