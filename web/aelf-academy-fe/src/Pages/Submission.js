import React, {useState} from 'react'
import { Button, Stack,  Form, Card, ListGroup, Accordion, ToastContainer, Toast} from 'react-bootstrap';

const Submission = ({/**courseId, learnerAdd, role*/}) => {
    const [courseTitle, setCourseTitle] = useState("Aelf 101: Getting Started with AElf");
    const [submissionReward, setSubmissionsReward] = useState(50);
    const [moderationReward, setmoderationReward] = useState(20);
    const [courseId, setCourseId] = useState(1);
    const [role, setRole] = useState("Learner");
    const [submissionList, setSubmissionList] = useState(learnerSubmissionList.find(s => s.courseId === courseId).submissions);
    const [userSubmissions, setUserSubmissions] = useState(userSubmissionList);
    const [currentSubmissionInput, setCurrentSubmissionInput] = useState('');
    const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
    const [showModerationSuccess, setShowModerationSuccess] = useState(false);

  return (
    <div className='contain mm position-relative'>
            <header>
                <h2>{role === 'Learner' && `Your`} Submissions to Quest: {courseTitle}</h2>
                <Stack direction="horizontal" gap={4} className="my-4">
                  <div className="bg-light border p-1 sm-txt">Submission Reward: <span className='reward'>{submissionReward} ELF</span></div>
                  <div className="bg-light border p-1 sm-txt">Moderation Reward: <span className="reward">{moderationReward} ELF</span></div>
               </Stack>
            </header>
            <div className=''>
                {
                    role === 'Learner' 
                    ?
                    <>                    
                        {
                        !submissionList[submissionList.length - 1].isApproved &&
                        <Card border='primary' className='mb-5'>
                            <Card.Header>
                                Submit Solution
                            </Card.Header>
                            <Card.Body>
                                <Stack direction="horizontal" gap={3}>
                                    <Form.Control 
                                        className="me-auto" 
                                        placeholder="Enter link to the github repo or gist..." 
                                        value={currentSubmissionInput}
                                        onChange= { e => setCurrentSubmissionInput(e.target.value)}
                                    />
                                    <Button variant="primary" disabled={currentSubmissionInput.length<10}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowSubmissionSuccess(!showSubmissionSuccess);
                                            const sub = {
                                                submissionUrl:currentSubmissionInput,
                                                isApproved : false
                                            }
                                            setCurrentSubmissionInput('');
                                            setSubmissionList([...submissionList, sub]);
                                            
                                        }}
                                    >Submit</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                        }
                
                
                    {
                        <Card className=''>
                            <Card.Header>
                                Previous Submissions
                            </Card.Header>
                            <Card.Body>
                            <ListGroup variant="flush">{
                                submissionList.map((s, i)=> (
                                    <ListGroup.Item key={i} className='border p-3'>
                                        <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer">View Submission</a>
                                                                        
                                    </ListGroup.Item>
                                    
                                )) 
                                }                        
                            </ListGroup>
                            </Card.Body>
                        </Card>     
                    }
                    </>
                    :<>
                       { <Card>
                                <Card.Header>
                                    { `${role === 'Chief Moderator'? 'Review': ''} Quest Submissions`} 
                                </Card.Header>
                                <Card.Body>
                                    {/* //userSubmissions? */}
                                    {
                                         
                                        <Accordion>
                                            {
                                                userSubmissions.map((user, i)=> ( 
                                                    <Accordion.Item eventKey={i} key={i}>
                                                        <Accordion.Header>Learner: {user.address}</Accordion.Header>
                                                            {
                                                                <Accordion.Body>
                                                                    {
                                                                        user.submissions.map((s, x) => (                                                                    
                                                                            <Card.Body key={x} className="d-flex"> 
                                                                                <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer" className='me-auto bd-highlight'>View Submission</a> 
                                                                                                                                                           
                                                                                {
                                                                                    x === user.submissions.length-1 &&
                                                                                        role === 'Chief Moderator' && 
                                                                                        <>
                                                                                            <Button variant="outline-danger" className='me-3'
                                                                                                onClick={()=> setShowModerationSuccess(!showModerationSuccess)} 
                                                                                            >Reject</Button>
                                                                                            <Button variant="primary"
                                                                                                onClick={()=> setShowModerationSuccess(!showModerationSuccess)} 
                                                                                            >Approve</Button>                                                                                           
                                                                                        </>
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
            
            <ToastContainer className="p-3" position='middle-center'>
                <Toast show={showSubmissionSuccess} onClose={() => setShowSubmissionSuccess(!showSubmissionSuccess)}>
                    <Toast.Header>                    
                    <strong className="me-auto">Congrats on submitting your solution 🚀🚀</strong>
                    </Toast.Header>
                    <Toast.Body>Successfully submitted solution to quest: {courseTitle}</Toast.Body>
                </Toast>
                <Toast show={showModerationSuccess} onClose={()=> setShowModerationSuccess(!showModerationSuccess)}>
                    <Toast.Header>                    
                    <strong className="me-auto">Great job on the review🙌</strong>
                    </Toast.Header>
                    <Toast.Body>Evaluation successfully Recorded</Toast.Body>
                </Toast>
                </ToastContainer>
            
    </div>
        
  )
}

export default Submission

const role = ["Learner", "Chief Moderator", "Admin"]

const learnerSubmissionList= [
    {
        courseId: 1,
        submissions: [
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
                isApproved : false
            },
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
                isApproved : false
            },
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
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
                isApproved : true
            }            
        ]
        
    }
]

const userSubmissionList = [
    {
        address: 'dhjak26536728bdgfchdj',
        submissions: [
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
                isApproved : ''
            },
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQn',
                isApproved : ''
            },
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '',
                isApproved : false
            },
        ]
    },
    {
        address: 'dhsks27830373',
        submissions: [
            {
                submissionUrl: 'https://github.com/bradtraversy/react-crash-2021',
                moderatedBy: '2qrgUV4BxGUfUYxpikxVGKFHxgv38qq2o2b3vJrD2Bj29LHqQnxdgsjks45738339v',
                isApproved : true
            }            
        ]
        
    }
]
