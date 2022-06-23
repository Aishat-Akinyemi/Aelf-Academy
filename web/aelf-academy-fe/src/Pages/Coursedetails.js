import React, { useState } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import TableOfContent from '../components/TableOfContent';
import {useNavigate} from 'react-router-dom';

const Coursedetails = ({}) => {
    let navigate = useNavigate();
    const [course, setCourse] = useState({
        courseId:1,
        submissionReward: 50,
        toc: ["Installing Aelf", "Installing dependencies", "Installing Aelf Extension", "Difference Between Wallet extension and Aelf sdk", "Aelf-CLI"],
        title: 'AELF 101: Getting Started with AElf',
        introduction: "This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol.",
        content: `This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol. It includes guides and steps for installing the necessary programs and libraries to kickstart your Aelf development. 
        This is a dummy course content. Course contents are still in progress. 
         Rutrum nam quisque sed at risus, varius. Ut odio tincidunt fames nec, in orci blandit ac sollicitudin. Consectetur convallis a, quis congue neque ac. Sit dictum in a sodales malesuada aliquet. Fermentum tellus urna at cras est. Nunc ac cursus commodo non pretium eu habitasse.
        This is a dummy course content. Course contents are still in progress. This is a dummy course content. Course contents are still in progress. This is a dummy course content. Course contents are still in progress.Rutrum nam quisque sed at risus, varius. Ut odio tincidunt fames nec, in orci blandit ac sollicitudin. Consectetur convallis a, quis congue neque ac. Sit dictum in a sodales malesuada aliquet. Fermentum tellus urna at cras est. Nunc ac cursus commodo non pretium eu habitasse.
       This is a dummy course content. Course contents are still in progress. This is a dummy course content. Course contents are still in progress. \n This is a dummy course content. Course contents are still in progress. Rutrum nam quisque sed at risus, varius. Ut odio tincidunt fames nec, in orci blandit ac sollicitudin. Consectetur convallis a, quis congue neque ac. Sit dictum in a sodales malesuada aliquet. Fermentum tellus urna at cras est. Nunc ac cursus commodo non pretium eu habitasse.
      This is a dummy course content. Course contents are still in progress. This is a dummy course content. Course contents are still in progress.AThis is a dummy course content. Course contents are still in progress. Rutrum nam quisque sed at risus, varius. Ut odio tincidunt fames nec, in orci blandit ac sollicitudin. Consectetur convallis a, quis congue neque ac. Sit dictum in a sodales malesuada aliquet. Fermentum tellus urna at cras est. Nunc ac cursus commodo non pretium eu habitasse.
     This is a dummy course content. Course contents are still in progress.This is a dummy course content. Course contents are still in progress.`,
        challengeDescription: `Take a screenshot of your development environment set-up and a proof that you were able to successfully install the dependencies. Create a github gist containing your submission.`
    });
    const [newLineText, setNewLineText] = useState(NewLineText(course.content));
    // const [newLineText, setNewLineText] = useState(() => () => NewLineText(course.content));
    function NewLineText(text) {        
        return text.split('\n').map((str, i) => <p key={i}>{str}</p>);         
    };

  return (
        <div className='contain mm'>
            <header>
                <h2>{course.title}</h2>
                <div>{course.introduction}</div>
            </header>
            <hr className='my-5'/>
            <Row>
                <Col className="pb-5">
                    <TableOfContent toc={course.toc}/>
                </Col>
                <Col md={8}>
                    <div className='course-content'>{newLineText}</div>
                    <hr className='my-5'/>
                    <div className="d-flex flex-column">
                        <p style={{width :"max-content"}}>Well done! You’ve completed {course.title} course. Take the challenge to earn {course.submissionReward} ELF</p>
                        <Button variant="outline-primary"  className="mt-3 align-self-end" style={{width :"max-content"}}
                        onClick={() => {
                            navigate(`/quest/${course.courseId}`);
                            }}                        
                        >View Quest</Button>
                    </div>
                </Col>
            </Row>
        </div>
    
  )
}

export default Coursedetails
