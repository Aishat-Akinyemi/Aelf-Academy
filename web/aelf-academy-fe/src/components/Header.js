import {useState} from 'react'
import logo from '../assets/img/logo.svg'
import { Button, Badge } from "react-bootstrap";
import {addLearner, getAcademyInfo, getAllCourses, getCourse, getResult} from '../utils/Aelf';
import {Link, useNavigate} from 'react-router-dom';

const Header = ({user, login}) => {
    let navigate = useNavigate();
//    const initContract = () => {
//         InitializeContract1();
//    }
    const getAInfo = async () => {
        try{
            console.log(await addLearner());  
        } catch(e){
            console.log(e);
            alert(e)
        }  
    }

  return (
    <nav className='nav-bar'>
        <ul className="nav">
            <li className="nav-item">                
                <Link className="nav-link active" to="/home">
                    <img src={logo} 
                    style={{width: "88px", height:"44px"}}              
                     />
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/home">FAQs</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="https://discord.gg/Xag6TAPcgh" target="_blank" rel="noopener noreferrer">Discord</a>
            </li>
            <li className="nav-item">
                <a className="nav-link btn" href="#">English</a>
            </li>
            <li className="nav-item">
             {   
                user
                ?
                <Button variant="outline-primary" onClick={()=> {
                            navigate("/account");
                    }}
                    >
                    {user.username} 
                    <Badge className='ms-2'>{user.reward}</Badge>
                </Button> 
                :
                <Button variant="outline-primary"
                    onClick={login}
                
                >Login with aelf</Button>      
            }
             
            </li>

        </ul>
  </nav>
  
  )
}

export default Header
