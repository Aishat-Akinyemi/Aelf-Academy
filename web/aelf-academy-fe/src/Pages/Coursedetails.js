import React, { useState } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import TableOfContent from '../components/TableOfContent';
import {useNavigate} from 'react-router-dom';

const Coursedetails = () => {
    let navigate = useNavigate();
    const [course, setCourse] = useState({
        courseId:1,
        submissionReward: 50,
        toc: ["Installing Aelf", "Installing dependencies", "Installing Aelf Extension", "Difference Between Wallet extension and Aelf sdk", "Aelf-CLI"],
        title: 'AELF 101: Getting Started with AElf',
        introduction: "This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol",
        content: `This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol. It includes guides and steps for installing the necessary programs and libraries to kickstart your Aelf development\n. 
        Pellentesque enim eu accumsan tincidunt sed cursus enim massa. Aenean bibendum tempus leo tortor, dictum aliquet tellus. Rutrum nam quisque sed at risus, varius. Ut odio tincidunt fames nec, in orci blandit ac sollicitudin. Consectetur convallis a, quis congue neque ac. Sit dictum in a sodales malesuada aliquet. Fermentum tellus urna at cras est. Nunc ac cursus commodo non pretium eu habitasse.
        Elementum elementum diam bibendum sit vestibulum nibh. \n Eget blandit ornare eleifend enim, justo pulvinar duis. Rhoncus id nunc enim tellus quis sagittis diam libero elit. Suspendisse morbi eget eget eget ut viverra vitae. Tincidunt iaculis viverra adipiscing donec nunc posuere eget. Feugiat felis nulla eu est. Aliquet amet rhoncus congue tellus, risus enim pretium. Amet, tellus pharetra, in ornare. Ac in nunc, aliquam lacus urna risus mattis. Lacus, est nullam sed et.
        Tristique volutpat consequat eget porttitor sem. Pretium, habitasse porta donec elementum tortor odio sapien. Auctor diam magna pharetra bibendum vitae at ullamcorper mauris. Tortor sagittis cursus ultrices aliquam a massa egestas donec. Purus elementum, sapien ultrices habitant nascetur. Sagittis sit in dolor vestibulum luctus ut metus et feugiat. Porttitor nisl, lacus, sed sed vulputate. Aenean tristique nibh ullamcorper ut turpis. Bibendum eget volutpat justo, enim elementum, amet viverra enim tincidunt. Ac non nulla rhoncus, urna iaculis tempor. Erat gravida nunc lobortis scelerisque cras risus.
        Ornare quis ullamcorper diam, nisl. Egestas vel ultricies sit eget in tincidunt. Sagittis gravida semper est vitae, aliquet. Adipiscing tortor, rutrum nec in sapien semper sed hac. Sed scelerisque malesuada vulputate nisi bibendum pretium. Amet fermentum egestas nullam eu. Sed duis eu urna, vel nullam quam lacus. Adipiscing at arcu neque sit magna e.`,
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
