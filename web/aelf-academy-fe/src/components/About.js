import {Button} from 'react-bootstrap';
import displayImg from '../assets/img/person-programming.png';
import aelfLogo from '../assets/img/aelfLogo.png';
import {useNavigate} from 'react-router-dom';

const About = () => {
    let navigate = useNavigate();

  return (
    <div>
        <div className="about-academy d-flex">
            <div className="description">
                <h1>Learn.<span className='text-gradient'> Earn.</span><br/> Build.</h1>
                <p className='mt-4'>Aelf Academy is a decentralized peer-2-peer learning dApp with focus on onboarding developers onto Aelf ecosystem. Grow from zero to hero in your development journey on Aelf blockchain by taking curated courses, and completing quests at the end of each course.</p>
                <p className='mt-'>You earn Elf tokens when you complete Quests, Review Quests or help others in the community.</p>
                <Button className='mt-3'
                    onClick={()=> {
                        navigate("/courses");
                    }}
                    >
                        Start Learning
                </Button>
            </div>
            <div >
                <img src={displayImg} alt="" className='about-cover-img flex-shrink-1' />
            </div>                
        </div>
        <div className="about-aelf d-flex justify-content-between mm">
            <div className="p-3">
                <img src={aelfLogo} alt="" className='aelf-logo' />
            </div>
            <div className="p-3">
                <h1>About Aelf Ecosystem</h1>
                <p className='mt-3'>Aelf is the most advanced and secure blockchain cloud infrastructure with segregate, unlimitedly scalable cloud computing networks, leading the decentralized future.</p>
                <p>Aelf is a decentralized blockchain network empowered by cloud computing infrastructure. Each node on aelf mainnet is independent, with outstanding performance and unlimited scalability. </p> 
                <a href='https://aelf.com/' target="_blank" rel="noopener noreferrer" className='btn about-aelf-btn btn-outline-primary button mt-3'>Learn More</a>
            </div>
        </div>
    </div>



  )
}

export default About
