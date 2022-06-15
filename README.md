
# Aelf Academy dApp

Welcome to AElf Academy's official GitHub repo! This repository contains the contract code and the web application code for the dApp. A project developed by the **Sheng Team** for the **Aelf LegendX Hackathon**!

![cover image](https://github.com/Aishat-Akinyemi/Aelf-Academy/blob/aelf-academy-main/web/aelf-academy-fe/public/aaLogo.png)

## About Aelf Academy dApp

**Aelf Academy** is a decentralized peer-2-peer Learn & Earn dApp with focus on growing the Aelf ecosystem through developer education.

Developers grow from zero to hero in their development journey on Aelf blockchain by taking curated courses, and they build Aelf dApps by completing quests at the end of each course. 

The quests are moderated/evaluated by advanced learners. Learners earn from Quests and get rewards for evaluating and helping others in the community. You can find the [**live dApp here**](https://aelf-academy-fe.vercel.app/). 

## Features

### dApp Features

The dApp contains self-paced **courses** that teach development on Aelf blockchain in various levels, beginner, intermediate and advanced.

- Each course has a fun **Quest** so that learners can build practical projects from what they learned in the course.
- Learners can join Aelf Academy and enrol in courses and complete the quests.
- A submitted quest is **evaluated** by Advanced level Aelf-Academy learners, and **moderators**. Moderators are experienced Aelf-developers. Moderation involves reviewing a quest and giving feedback and guidance to the developer in solving issues they may face.
- A moderator can approve a quest submission, or reject the submission. The learner can submit another solution if the previous one was rejected.
- **Evaluation (aka moderation)** is rewarded with Elf tokens, and learners are rewarded for successful quest completion.
- An  **approved quest** moves the learner to the next level. A learner keeps advancing to the next level and subsequently becomes a moderator.

### Aelf Academy smart-contract methods and what they do

- **Action methods that modify the contract state**
    - **Initialize**: initializes the contract and sets the owner. It takes 2 parameters, admin and moderator objects. An admin can add courses to the academy and moderator is a user that can evaluate/moderate quests submitted by learners.
    - **FundAcademy**: used to make donations and add fund to the academy by transfering tokens from the transaction signer’s account. This is used to pay out rewards to the users.
    - **AddCourse:** adds a course to the academy
    - **AddLearner**: registers the caller as a learner.
    - **AddAdmin**: adds an admin to the academy, can only be called by owner or admin.
    - **AddChiefModerator**: adds chief moderator to the academy, can only be called by owner or admin.
    - **SubmitChallenge**: submits a learner’s entry to course quest, can only be called by learners.
    - **ModerateChallenge**: used to approve or reject a learner’s quest entry, can only be called by moderator and learners two levels above the course-level. This results in the moderation reward being transfered to the moderator **(**i.e. transaction signer**).** If the entry was approved, it also transfers reward to the learner and moves learner to the next level.
- **View methods that get data from the contract**
    - **GetAcademyInfo**: returns an object of the academy info, including the balance of funds and list of admin users and chief-moderators.
    - **GetLearners**: returns list of registered learners.
    - **GetUserInfo**: returns a user information.
    - **GetHighestLevel**: returns an integer of the highest level a user can reach in the academy
    - **GetCourse**: returns details of a particular course by courseId including the course submission reward, moderation reward, level, course title and the url that points to the IPFS content identifier containing the course content data.
    - **GetCourses**: returns a list of all courses offered by the academy.
    - **GetCourseSubmission**: returns all the entries submitted by all learners to a course quest
    - **GetLearnerSubmission**: returns all the the entries submitted by a particular learner to all quests the learner has attempted.
    - **GetFundingHistory**: returns a list of the donation - amount and address of the donors.
    
    With all the above features, developers are incentivized to join Aelf ecosystem, build projects, and collaboration is encouraged in the community. The ecosystem grows exponentially and developer onboarding is simplified.


## Project Structure

At the top level this repo contains two folders: **chain** and **web**. The chain folder contains the smart contract code and the web folder contains the front end part of the dApp.

### chain

The chain contract contains the dApps smart contract code. 

The chain folder contains four sub-folders:
- **contract**: the implementation of the contract. 
- **protobuf**: the definition of the contract.
- **test**: the unit tests of the contract.
- **src**: Launcher code for running a local aelf node.

### web

This folder contains the front end code for the dApp.

- **aelf-academy-fe**: the front-end dApp implementation in react.


## License
AElf Academy smartcontract code is open-sourced licenced under MIT. It can be used to create any decentralized learning platform. 

