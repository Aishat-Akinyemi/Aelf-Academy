import { Card, Button, Col } from 'react-bootstrap'
import Proptypes, { object } from 'prop-types';
import {PerformACall} from '../utils/Aelf'
import {useNavigate, Link} from 'react-router-dom';


const Course = ({ course, user}) => {
    let navigate = useNavigate();

  return (
    <Col>
        <Card className="course-card h-100">
            <Card.Body className='ml-3 mt-3 mb-5 position-relative'>
                <Card.Title className="course-header mb-3">{course.courseTitle}</Card.Title>
                <Card.Subtitle className='d-flex justify-content-between course-details'>
                    <span 
                    className={` ${course.level<=2 && "lt-beginner"} ${(course.level > 2) && (course.level <= 4) && "lt-intermediate"} ${(course.level > 4) && "lt-advanced"}`}
                    > 
                    {course.level<=2 && "Beginner"} {(course.level > 2) && (course.level <= 4) && "Intermediate"} {(course.level > 4) && "Advanced"}</span>
                    <span>level {course.level}</span>
                    <span>{course.submissionReward} ELF</span>
                </Card.Subtitle>
                <Card.Text className='mt-3 mb-5 pr-3'>
                   {course.introduction}
                </Card.Text>
                <span className='position-absolute' style={{bottom: "-5px"}}>
                   {
                        (user && user.role === 'Learner') &&
                        (<Button variant="outline-primary" ><span className='p-3' onClick={() => {
                        navigate(`/course/${course.courseId}`);
                        }}
                        >
                        Start Now</span>
                        </Button>)
                    }  
                    
                    {(user && user.role ==='Admin') && <Link to={`/quest/${course.courseId}`} className='sm-txt p-5'>Evaluate submissions</Link>}
                    {!user && 'Join Aelf Academy to Start Learning.'}
                    </span>
            </Card.Body>
        </Card>
    </Col>
  )
}

// Course.propTypes = {
//     course : PropTypes.instanceOf(Object),
//     // Proptypes.object.isRequired
// };

export default Course


