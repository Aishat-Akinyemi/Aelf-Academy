import Course from "../components/Course";
import { Row, Button } from 'react-bootstrap'
import { useState, useEffect } from "react";

import { getAllCourses} from '../utils/Aelf';

const Courses = ({user}) => {
    const [courses, setCourses] = useState([]);
    const getCourses = async () => {
        try{
            const coursess = await getAllCourses();
            setCourses(coursess);
        } catch(e){
            console.log(e);
        } finally{
        }
    }

    useEffect(() => {
        getCourses();
      }, []);

    
  return (
    <div>
        <div className='courses-container'>
            <header className="courses-header mb-0">
                <h2 className="courses-page-title">About  Aelf academy courses</h2>
                <p> Enrol in self-paced courses that teach development on Aelf blockchain in various levels from beginner to intermediate and advanced.</p>
                <Button variant="outline-primary"
                    onClick={getCourses}
                
                >View All Courses</Button> 
            </header>

           <div className="mlm mrm mbm pb-5">
            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                    {
                        // courses.filter((course) => course.isActive===true)
                        //     .map((course) => (
                        //         <Course key={course.courseId} course={course} user={user}/>
                        //     ))
                        courses.map((course) => (
                                <Course key={course.courseId} course={course} user={user}/>
                        ))
                    }
                </Row>
           </div>

        
        </div>
    </div>
  )
}

export default Courses
