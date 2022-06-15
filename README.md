
# Aelf Academy dApp


Welcome to AElf Academy's official GitHub repo! This repository contains the contract code and the web application code for the dApp. 

## About Aelf Academy dApp

**Aelf Academy** is a decentralized peer-2-peer Learn & Earn dApp with focus on growing the Aelf ecosystem through developer education.

Developers grow from zero to hero in their development journey on Aelf blockchain by taking curated courses, and they build Aelf dApps by completing quests at the end of each course. 

The quests are moderated/evaluated by advanced learners. Learners earn from Quests and get rewards for evaluating and helping others in the community. You can find the [**live dApp here**](https://aelf-academy-fe.vercel.app/). 

### Features

The dApp contains **self-paced courses** that teach development on Aelf blockchain in various levels, beginner, intermediate and advanced.

- Each course has a fun **Quest** so that learners can build practical projects from what they learned in the course.
- Learners can join Aelf Academy and enrol in courses and complete the quests.
- A submitted quest is **evaluated** by Advanced level Aelf-Academy learners, and **moderators**. Moderators are experienced Aelf-developers. Moderation involves reviewing a quest and giving feedback and guidance to the developer in solving issues they may face.
- A moderator can approve a quest submission, or reject the submission. The learner can submit another solution if the previous one was rejected.
- **Evaluation (aka moderation)** is rewarded with Elf tokens, and learners are rewarded for successful quest completion.


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

