import { Button,Stack } from 'react-bootstrap';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const Quest = ({user}) => {
    let navigate = useNavigate();
    const {courseId } = useParams();
    const [quest, setQuest] = useState({
      courseTitle: "Aelf 101: Getting Started with AElf",
      submissionReward: 50,
      moderationReward: 20,
      instructions: `This is a dummy quest instruction. Course contents are still in progress. This is a dummy quest instruction. ake a screenshot of your development environment set-up and a proof that you were able to successfully install the dependencies. Create a github gist containing your submission.`

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
                >{user.role === 'Learner'? `Submit Entry`: `Review Entries`}</Button>
            </Stack>

        </div>
      )
}

export default Quest
