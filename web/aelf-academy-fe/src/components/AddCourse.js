import React, {useState} from 'react'
import { Button, Stack,  Form, Card,  Accordion, Badge, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";

const AddCourse = ({addCourse}) => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState(0);
    const [submissionReward, setSubmissionReward] = useState(0);
    const [moderationReward, setModerationReward] = useState(0);
    const [introduction, setIntroduction] = useState('');
    const [toc, setToc] = useState([]);
    const [challengeDescription, setChallengeDescription] = useState('');
    const [content, setContent] = useState('');
    const isFormValid = () => title && level && submissionReward && moderationReward && introduction && toc && challengeDescription && content;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
                <>
                    <Button
                        onClick={handleShow}
                        variant="dark"
                    >
                        Add A new Course
                    </Button>

                    <Modal 
                        show={show} 
                        onHide={handleClose}
                        size="lg"
                        backdrop="static"
                        keyboard={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        bg="secondary"
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Add New Course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="courseTitleControl">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="course title..." 
                                autoFocus
                                required
                                onChange={(e) => { setTitle(e.target.value); }}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="courseLevelControl">
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                onChange={(e) => { setLevel(e.target.value); }}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="courseSubmissionRewardControl">
                            <Form.Label>Submission Reward</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setSubmissionReward(e.target.value); }}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="courseModerationRewardControl">
                            <Form.Label>Moderation Reward</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setModerationReward(e.target.value); }}
                            />
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="courseIntroductionControl"
                            >
                            <Form.Label>Introduction</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                onChange={(e) => { setIntroduction(e.target.value); }}
                            />
                            <Form.Text className="text-muted">
                                A brief introduction that describes the course
                            </Form.Text>
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="courseTocControl"
                            >
                            <Form.Label>Table of Content</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={1} 
                                onChange={(e) => { 
                                    const toc = e.target.value.split(',');
                                    setToc(toc); 
                                    }}/>
                            <Form.Text className="text-muted">
                                Enter Comma Separated Value of table of content e.g. Installing Aelf, Installing dependencies, Aelf Extension
                            </Form.Text>
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="courseChallengeDescriptionControl"
                            >
                            <Form.Label>Challenge Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                onChange={(e) => { setChallengeDescription(e.target.value); }}
                            />
                            <Form.Text className="text-muted">
                               A description of the quest and submission instructions
                            </Form.Text>
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="courseContentControl"
                            >
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                 as="textarea" 
                                 rows={15} 
                                 onChange={(e) => { setContent(e.target.value); }}
                            />
                            <Form.Text className="text-muted">
                                The course content 
                            </Form.Text>
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary"                        
                            disable = {!isFormValid()}
                            onClick = {() => {
                                addCourse({ title,
                                            level,
                                            submissionReward,
                                            moderationReward,
                                            introduction,
                                            toc,
                                            challengeDescription,
                                            content
                                });
                                handleClose()
                                }
                            }
                        >
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </>            
      )
}

AddCourse.propTypes = {
    addCourse : PropTypes.func.isRequired,
};

export default AddCourse;

