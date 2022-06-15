import Course from "../components/Course";
import { Row } from 'react-bootstrap'
import { useState } from "react";

const courseList =     [
        {
            courseId : 1,
            submissionReward : 50,
            moderationReward : 20,
            level : 1,
            contentUrl : '',
            isActive : true,
            introduction: 'This course aims to teach you how to setup your local system for smartcontract development on Aelf blockchain protocol. You will be introduced to the Aelf-toolchainb',
            courseTitle: 'AELF 101: Getting Started with AElf'
        },
        {
            courseId : 2,
            submissionReward : 100,
            moderationReward : 30,
            level : 2,
            contentUrl : '',
            isActive : true,
            introduction: 'This course aims to help you understand the architecture of Aelf protocol.',
            courseTitle: 'AELF 201: Aelf Architecture'
        },
        {
            courseId : 3,
            submissionReward : 200,
            moderationReward : 70,
            level : 3,
            contentUrl : '',
            isActive : true,
            introduction: 'This course aims to teach you how to build and deploy your first smartcontract with C# on Aelf.',
            courseTitle: 'AELF 301: Build and deploy Hello World smart contract'
        },
        {
            courseId : 4,
            submissionReward : 200,
            moderationReward : 70,
            level : 4,
            contentUrl : '',
            isActive : true,
            introduction: 'This course aims to teach you learn more advaced smartcontract development techniques.',
            courseTitle: 'AELF 401: Advanced smart contract development'
        },
        {
            courseId : 5,
            submissionReward : 150,
            moderationReward : 40,
            level : 5,
            contentUrl : '',
            isActive : true,
            introduction: 'This course aims to teach you how to call your smartcontract from the front end using aelf-sdk and aelf browser extension',
            courseTitle: 'AELF 501: Integrate smartcontract with Frontend'
        },
        {
            courseId : 6,
            submissionReward : 150,
            moderationReward : 40,
            level : 6,
            contentUrl : '',
            isActive : true,
            introduction: 'This course aims to teach you how to develop highly secure and performant smart contracts on the Aelf blockchain.',
            courseTitle: 'AELF 601: Smart contract security and optimisation',
        }       
]


const Courses = () => {
    const [courses, setCourses] = useState(courseList);
  return (
    <div>
        <div className='courses-container'>
            <header className="courses-header mb-0">
                <h2 className="courses-page-title">About  Aelf academy courses</h2>
                <p> Enrol in self-paced courses that teach development on Aelf blockchain in various levels from beginner to intermediate and advanced.</p>
            </header>

           <div className="mlm mrm mbm pb-5">
            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                    {
                        courses.filter((course) => course.isActive===true)
                            .map((course) => (
                                <Course key={course.courseId} course={course} />
                            ))
                    }
                </Row>
           </div>

        
        </div>
    </div>
  )
}

export default Courses
