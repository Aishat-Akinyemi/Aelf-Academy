import {useState} from 'react'
import Accordion from 'react-bootstrap/Accordion'

const faqList = [
    {
        id: 1,
        question: 'What is AElf',
        answer: 'AElf is a decentralized blockchain network empowered by cloud computing infrastructure. Each node on aelf mainnet is independent, with outstanding performance and unlimited scalability.'    
    },
    {
        id: 2,
        question: 'What is AElf Academy',
        answer: 'AElf academy is a Learn and Earn decentralized, self-sustaining learning platform that seeks to equip learners with knowledge on how to Build d-Apps on AElf blockchain. Learners can earn Elf tokesn by successfully completing Quests at the end of each course.  AElf Academy makes your learning simple, fun and rewarding!'    
    },
    {
        id: 3,
        question: 'Why did we build AElf Academy',
        answer: 'To build the ecosystem by making learning fun, exciting and rewarding. To make knowledge easily accessible. To grow the aAelf developer community. Join the community of builders and learn along with leading developers.'    
    },
    {
        id: 4,
        question: 'Why should I learn AElf',
        answer: 'AElf is an advanced blockchain and it is simple to start building on AELF. You can quickly go from Zero to Hero. AElf ecosystem has developer tools to support your journey. Aelf is unlimitedly scalable. '    
    },
    { 
        id: 5,
        question: 'What programming languages does AElf use',
        answer: 'C#'    
    },
    {
        id:6,
        question: 'When can I start Learning on AElf Academy',
        answer: 'Learning is self-paced. You should start right now!'    
    }
]

const Faq = () => {
    const [faqs, setFaqs] = useState(faqList)
  return (
    <>
        {
            faqs.length > 0?
            (
                <Accordion className='mm'>
                    {faqs.map((faq) =>(
                        <Accordion.Item eventKey={faq.id} className='faq-item'>
                            <Accordion.Header>{faq.question}</Accordion.Header>
                            <Accordion.Body>{faq.answer}</Accordion.Body>
                        </Accordion.Item>
                    ))}           
                </Accordion>
            )
            : ''
        }
    </>
  )
}

export default Faq
