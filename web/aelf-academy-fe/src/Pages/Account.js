import React, {useState} from 'react'
import { Button, Stack,  Form, Card,  Accordion, Badge, Modal, Spinner} from 'react-bootstrap';
import AddCourse from '../components/AddCourse'
import { useNavigate} from 'react-router-dom';
import { addLearner, addCourse} from '../utils/Aelf';
import Loader from '../components/Loader';
import {uploadDataToIpfs} from '../utils/Ipfs';

const Account = ({user, getUser}) => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(user);
    const [submissionList, setSubmissionList] = useState(learnerSubmissionList);
    const [courses, setCourses]  =useState(courseList);
    const [show, setShow] = useState(() => () => user!==null);
    const [username, setUsername] = useState(''); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const [loading, setLoading] = useState(false);   

    const addNewCourse = (data) => {
        try {  
            
            uploadDataToIpfs(data).then((resp) => {
                setLoading(true);
                const newCourseData = {
                    submissionReward: data.submissionReward,
                    moderationReward: data.moderationReward,
                    level : data.level,
                    contentUrl: resp,
                    courseTitle : data.title,                    
                }
                const courseAdded = addCourse(newCourseData).then(
                    (res) => {
                        console.log(res);
                        setLoading(false);
                    },
                    (error) => {
                        console.log(error)
                        setLoading(false);
                    }
                )                
              //then handle submission with addCall
            });
            // toast(<NotificationSuccess text="Meme added successfully." />);
          } catch (error) {
            // toast(<NotificationError text="Failed to create a meme." />);
            setLoading(false);
          } finally {            
            setLoading(false);
          }
    }

    const handleAddLearner =  () => { 
        try{
            (addLearner(username)).then(
                (res) => {
                    console.log('added user from account', res);
                },
                (error) => {}
            ).catch(
                (err) => {
                    console.log(err)
                } 
            ).finally(
                () => {
                    getUser()
                    handleClose();                       
                    navigate("/home"); 
                }
            )            
          } catch(e){
            console.log(e) 
          }   
        
    }


    return (
        <>
            { !loading ? (
            <div className='contain mm'>
                {
                    userInfo ?
                    <>
                        <header>
                            <h2 className="text-center m-5">Welcome, {userInfo.username}!</h2>
                        </header>
                        <div className=''>
                            {
                                userInfo.role === 'Learner' 
                                &&
                                <>
                                { <Card border='primary'>
                                            <Card.Header>
                                                Quests Submission History 
                                            </Card.Header>
                                            <Card.Body>
                                                {/* //userSubmissions? */}
                                                {
                                                    
                                                    <Accordion>
                                                        {
                                                            submissionList.map((courseSubmission, i)=> ( 
                                                                <Accordion.Item eventKey={i} key={i}>
                                                                    <Accordion.Header className='d-flex'>
                                                                        <span className='me-auto bd-highlight'>Course: {courses.find(c => c.CourseId === courseSubmission.courseId).CourseTitle}</span>
                                                                        {courseSubmission.submissions[ courseSubmission.submissions.length - 1].isApproved 
                                                                            &&   <span className='sm-txt'>
                                                                            <span className='me-3'> Moderated by <h5 className='in-line ms-3'><Badge bg="primary">{courseSubmission.submissions[courseSubmission.submissions.length - 1].moderatorUsernam}</Badge></h5> </span> 
                                                                                <span> Reward<h5 className='in-line ms-3'><Badge bg="primary"> {courses.find(c => c.CourseId === courseSubmission.courseId).SubmissionReward} </Badge></h5>                                                                      </span>
                                                                                
                                                                                    
                                                                            </span>
                                                                        
                                                                        } 
                                                                    </Accordion.Header>
                                                                        {
                                                                            <Accordion.Body>
                                                                                {
                                                                                    courseSubmission.submissions.map((s, x) => (                                                                    
                                                                                        <Card.Body key={x} className="d-flex"> 
                                                                                            <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer" className='me-auto bd-highlight'>View Submission</a>
                                                                                                                                                                                                                                
                                                                                            {
                                                                                                s.moderatedBy!=='' 
                                                                                                ? 
                                                                                                <span className='sm-txt'>
                                                                                                    <span className='me-3'>
                                                                                                        Moderated by {s.moderatorUsernam}
                                                                                                    </span>
                                                                                                    <span >
                                                                                                        {s.isApproved ? 'Quest Approved': 'Not Approved'}
                                                                                                    </span>
                                                                                                        
                                                                                                </span>                                                                                  
                                                                                                
                                                                                                : <span className='sm-txt'>Awaiting Review</span>  
                                                                                            
                                                                                            }
                                                                                        </Card.Body>
                                                                                ))
                                                                                }
                                                                            </Accordion.Body>
                                                                        }
                                                                    
                                                                </Accordion.Item>
                                                            ))
                                                        }
                                                    </Accordion>
                                                } 
                                            </Card.Body>
                                    </Card>
                                    
                                }   
                                </> 
                            }
                        </div>               

                        {userInfo.role === "Admin" && <AddCourse addCourse={addNewCourse}/>}
                    </>
                    :
                    // account creation modal
                    <>
                    <Modal 
                        size="sm"
                        show={show} 
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered                    
                    >
                        <Modal.Header>
                        <Modal.Title>Create Learner Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="userNameInput">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter preferred username"
                                onChange={e =>  setUsername(e.target.value)}
                                autoFocus
                            />
                            </Form.Group>                        
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" disabled={username.length<3} onClick={handleAddLearner}>
                            Join
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                }      
            </div>
            ) : (
               <>                
                <Loader/>
                <div className='empty-div'></div>
               </>
            )
            }
        </>   
      )
}

export default Account



const learnerSubmissionList= [
    {
        courseId: 1,
        submissions: [
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
                moderatorUsernam: "Moderator 1",
                isApproved : false
            },
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
                moderatorUsernam: "Moderator 2",
                isApproved : false
                
            },
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: "2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn",
                moderatorUsernam: "Moderator 1",
                isApproved : false
            },
        ]
    },
    {
        courseId: 2,
        submissions: [
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQnxdgsjks45738339v',
                moderatorUsernam: "Moderator 1",
                isApproved : false
            }            
        ]
        
    }
]


const courseList =     [
    {
        CourseId : 1,
        SubmissionReward : 50,
        ModerationReward : 20,
        Level : 1,
        ContentUrl : '',
        IsActive : true,
        CourseTitle: 'AELF 101: Getting Started with AElf'
    },
    {
        CourseId : 2,
        SubmissionReward : 100,
        ModerationReward : 30,
        Level : 2,
        ContentUrl : '',
        IsActive : true,
        CourseTitle: 'AELF 201: Aelf Architecture'
    },
    {
        CourseId : 3,
        SubmissionReward : 200,
        ModerationReward : 70,
        Level : 3,
        ContentUrl : '',
        IsActive : true,
        CourseTitle: 'AELF 301: Build and deploy Hello World smart contract'
    },
    {
        CourseId : 4,
        SubmissionReward : 200,
        ModerationReward : 70,
        Level : 4,
        ContentUrl : '',
        IsActive : true,
        CourseTitle: 'AELF 401: Advanced smart contract development'
    },
    {
        CourseId : 5,
        SubmissionReward : 150,
        ModerationReward : 40,
        Level : 5,
        ContentUrl : '',
        IsActive : true,
        CourseTitle: 'AELF 501: Integrate smartcontract with Frontend'
    },
    {
        CourseId : 6,
        SubmissionReward : 150,
        ModerationReward : 40,
        Level : 6,
        ContentUrl : '',
        IsActive : true,
        CourseTitle: 'AELF 601: Smart contract security and optimisation',
    }       
]
