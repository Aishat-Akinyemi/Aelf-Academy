import React, {useState} from 'react'
import { Button, Stack,  Form, Card,  Accordion, Badge} from 'react-bootstrap';

const Account = ({user}) => {
    const [userInfo, setUserInfo] = useState(user);
    const [submissionList, setSubmissionList] = useState(learnerSubmissionList);
    const [courses, setCourses]  =useState(courseList);

    return (
        <div className='contain mm'>
                <header>
                    <h2 className="text-center m-5">Welcome Back, {userInfo.Username}</h2>
                </header>
                <div className=''>
                    {
                        userInfo.Role === 'Learner' 
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
            </div>
            
      )
}

export default Account

const role = ["Learner", "Chief Moderator", "Admin"]

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
                isApproved : true
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
