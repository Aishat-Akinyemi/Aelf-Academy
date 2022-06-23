import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Coursedetails from './Pages/Coursedetails';
import Courses from './Pages/Courses';
import Quest from './Pages/Quest';
import Account from './Pages/Account';
import Submission from './Pages/Submission'

import { login, getAcademyInfo, getUserInfo, addLearner, getAllCourses} from './utils/Aelf';

function App() {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [courses, setCourses] = useState([]);
  let navigate = useNavigate();
  const  loginUser = async () => {
      try{
          let userAddress = await login();
          if(userAddress){
            setUserAddress(userAddress);
            setUser(await getUserInfo(userAddress));
            setCourses(await getAllCourses());
            navigate("/account");
          }
      } catch(e){ 
        console.log(e)       
      }
  }
  const addNewLearner = async (userName) => {
    try{
      const addedUser = await(addLearner(userName));
      if(addedUser){
        setUser(await getUserInfo(userAddress));    
        console.log(user);     
      }
    } catch(e){
      console.log(e) 
    }
  }
  
  const getUserDetails = async() => {
    try{
      const userInfo = await getUserInfo(userAddress);  
        setUser(userInfo);           
        console.log(user);    
      } catch(e){
      console.log(e) 
    }
  }
 
  return (
    <>
        <Header login={loginUser} user={user}/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/courses' element={<Courses user={user}/>}/>
            <Route path='/course/:courseId' element={<Coursedetails/>}/>            
            <Route path='/quest/:courseId' element={<Quest user={user}/>}/>
            <Route path='/account' element={<Account user={user} getUser={getUserDetails}/>}/>
            <Route path='/entries/:courseId' element={<Submission user={user}/>}/>
            {/* <Route path='/' element={}/> */}
            <Route path='*' element={<Home/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
