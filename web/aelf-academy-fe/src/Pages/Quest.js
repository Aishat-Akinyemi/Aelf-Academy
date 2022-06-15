import { Button,Stack } from 'react-bootstrap';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const Quest = ({userRole}) => {
    let navigate = useNavigate();
    const role = "Learner";
    // const role = userRole;
    const {courseId } = useParams();
    const [quest, setQuest] = useState({
      courseTitle: "Aelf 101: Getting Started with AElf",
      submissionReward: 50,
      moderationReward: 20,
      instructions: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat maxime quas ipsam eius explicabo iure quia natus! Doloribus maxime ad numquam est odit eos, assumenda temporibus, facilis culpa ullam dolorem?
      Pariatur dolor obcaecati magnam placeat eos soluta ipsam magni nemo exercitationem fugit veritatis accusamus repellat ex repellendus, saepe deserunt facilis quasi quia distinctio assumenda ea alias? Iusto nemo eos minus.
      Voluptates id quis totam perspiciatis, amet illum ipsum pariatur deleniti et sequi mollitia quisquam praesentium, aut officiis veritatis eius architecto quibusdam dicta eligendi. Quidem voluptatem reprehenderit sed iste dicta esse?`

    });

  return (
        <div className='contain mm'>
            <header>
                <h2>Quest: {quest.courseTitle}</h2>
                <Stack direction="horizontal" gap={4} className="my-4">
                  <div className="bg-light border p-1 sm-txt">Submission Reward: <span className='reward'>{quest.submissionReward} ELF</span></div>
                  <div className="bg-light border p-1 sm-txt">Moderation Reward: <span className="reward">{quest.moderationReward} ELF</span></div>
               </Stack>
            </header>
            <div className='content bg-secondary border my-4 p-5'>
                {quest.instructions}
            </div>
            <Stack direction="horizontal" gap={3} className="col-6 mx-auto justify-content-around"> 
                <Button variant="outline-primary"
                onClick={() => {
                  navigate(`/course/${courseId}`);
                  }}
                >Go back to Course</Button>
                <Button variant="primary"
                  onClick={() => {
                    navigate(`/entries/${courseId}`);
                    }}
                >{role === 'Learner'? `Submit Entry`: `Review Entries`}</Button>
            </Stack>

        </div>
      )
}

export default Quest
