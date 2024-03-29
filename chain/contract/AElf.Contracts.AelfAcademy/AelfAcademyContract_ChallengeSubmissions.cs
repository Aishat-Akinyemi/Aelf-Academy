﻿using System;
using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.Types;
using AElf.Contracts.MultiToken;
using Google.Protobuf.WellKnownTypes;
using AElf.Sdk.CSharp;

namespace AElf.Contracts.AelfAcademy
{
    public partial class AelfAcademyContract
    {
        //public override Empty SubmitChallenge(SubmitChallengeInput input)
        //{
        //    Assert(State.LearnerList.Value.Addresses.Contains(Context.Sender), "Not a registered learner");
        //    Assert(State.CourseMap[input.CourseId] != null, "INVALID COURSE");
        //    var course = State.CourseMap[input.CourseId];
        //    Assert(course.IsActive, "INVALID COURSE");
        //    Assert(State.UserMap[RoleType.Learner][Context.Sender].Level < course.Level,  "You have passed this level. Submit a challenge for a higher level");
        //    //TODO verify that above doesn't fail when learner is not registered

        //    var submissonList = State.SubmissionMap[input.CourseId][Context.Sender];
        //    var submission = new Submission();
        //    if (submissonList != null)
        //    {
        //        //if learner has submitted before, confirm that the last submission has not  been approved
        //        if (submissonList.List.Last().IsApproved == true)
        //        {
        //            Assert(false,  "You have passed this level. Submit a challenge for a higher level");
        //        }
        //        submission.SubmissionUrl = input.SubmissionUrl;
        //        submission.IsApproved = false;

        //        //add submission to the SubmissionMap
        //        submissonList.List.Add(submission);
        //        Context.Fire(new SubmitChallengeEvent
        //        {
        //            SubmittedBy = Context.Sender,
        //            CourseId = input.CourseId,
        //            SubmissionUrl = input.SubmissionUrl
        //        });
        //        return new Empty();
        //    }
        //    else  {
        //        var addressList = new AddressList();
        //        addressList.Addresses.Add(Context.Sender);
        //        State.CourseAddressListMap[input.CourseId] = addressList;
        //        submission.SubmissionUrl = input.SubmissionUrl;
        //        submission.IsApproved = false;
        //        var _submissionList = new SubmissionList();
        //        _submissionList.List.Add(submission);
        //        State.SubmissionMap[input.CourseId][Context.Sender] = _submissionList;
        //        Context.Fire(new SubmitChallengeEvent
        //        {
        //            SubmittedBy = Context.Sender,
        //            CourseId = input.CourseId,
        //            SubmissionUrl = input.SubmissionUrl
        //        });
        //        return new Empty();
        //    }
        //}

        public override Empty SubmitChallenge(SubmitChallengeInput input)
        {
            Assert(State.LearnerList.Value.Addresses.Contains(Context.Sender), "Not a registered learner");
            Assert(State.CourseMap[input.CourseId] != null, "INVALID COURSE");
            var course = State.CourseMap[input.CourseId];
            Assert(course.IsActive, "INVALID COURSE");
            Assert(State.UserMap[RoleType.Learner][Context.Sender].Level < course.Level, "You have passed this level. Submit a challenge for a higher level");
            //TODO verify that above doesn't fail when learner is not registered

            var addresses = State.CourseAddressListMap[input.CourseId];
            if (addresses == null)
            {
                var addressList = new AddressList();
                addressList.Addresses.Add(Context.Sender);
                State.CourseAddressListMap[input.CourseId] = addressList;
            }
            else if(!addresses.Addresses.Contains(Context.Sender))
            {
                addresses.Addresses.Add(Context.Sender);
            }

            var submissonList = State.SubmissionMap[input.CourseId][Context.Sender];
            var submission = new Submission();
            if (submissonList != null)
            {
                //if learner has submitted before, confirm that the last submission has not  been approved
                if (submissonList.List.Last().IsApproved == true)
                {
                    Assert(false, "You have passed this level. Submit a challenge for a higher level");
                }
                submission.SubmissionUrl = input.SubmissionUrl;
                submission.IsApproved = false;
                //add submission to the SubmissionMap
                submissonList.List.Add(submission);
            }
            else
            {
                submission.SubmissionUrl = input.SubmissionUrl;
                submission.IsApproved = false;
                var _submissionList = new SubmissionList();
                _submissionList.List.Add(submission);
                State.SubmissionMap[input.CourseId][Context.Sender] = _submissionList;
            }

                Context.Fire(new SubmitChallengeEvent
                {
                    SubmittedBy = Context.Sender,
                    CourseId = input.CourseId,
                    SubmissionUrl = input.SubmissionUrl
                });
                return new Empty();
        }
        

        public override Empty ModerateChallenge(ModerateChallengeInput input)
        {

            var course = State.CourseMap[input.CourseId];
            bool isModerator, isHigherLevel = false;

            isModerator = State.ChiefModeratorList.Value.Addresses.Contains(Context.Sender);
            if (!isModerator)
            {
                if (State.LearnerList.Value.Addresses.Contains(Context.Sender))
                {
                    isHigherLevel = State.UserMap[RoleType.Learner][Context.Sender].Level.Sub(1) > course.Level;
                }
            }         

            //TODO handle submission if the learner has no submission for the course
            Assert(isModerator || isHigherLevel, "You Cannot moderate this challenge submission");
            var submission = State.SubmissionMap[input.CourseId][input.LearnerId];
            Assert(submission.List != null, "No such submisison exists");
            var lastSubmission = submission.List.Last();
            Assert(lastSubmission.ModeratedBy == null, "You cannot moderate a previously moderated submission");
            lastSubmission.IsApproved = input.IsApproved;
            lastSubmission.ModeratedBy = Context.Sender;
            //change student level to the challenge level
            State.UserMap[RoleType.Learner][input.LearnerId].Level = State.CourseMap[input.CourseId].Level;
            var courseInfo = State.CourseMap[input.CourseId];
            //TODO handle payment to moderator, and payment to student.
            State.TokenContract.Transfer.Send(new TransferInput
            {   To = Context.Sender,
                Amount = courseInfo.ModerationReward,
                Symbol = Context.Variables.NativeSymbol
            });

            //change moderation reward to add the moderation reward 
            //if moderator add, or add as a student
            if (isModerator) { State.UserMap[RoleType.Chiefmoderator][Context.Sender].Reward += courseInfo.ModerationReward; }
            else { State.UserMap[RoleType.Learner][Context.Sender].Reward += courseInfo.SubmissionReward; }

            if (input.IsApproved)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {   To = input.LearnerId,
                    Amount = courseInfo.SubmissionReward,
                    Symbol = Context.Variables.NativeSymbol
                });
                //change student reward to add the challenge reward
                State.UserMap[RoleType.Learner][input.LearnerId].Reward += courseInfo.SubmissionReward;
            }
            //TODO if the student had submitted before, then remove 1 / 3 of their reward.

            Context.Fire(new ModerateChallengeEvent
            {
                CourseId = input.CourseId,
                ModeratedBy = Context.Sender,
                SubmittedBy = input.LearnerId
            });
            return new Empty();
        }

        public override UserSubmissionListOutput GetCourseSubmission(Int64Value input)
        {
            var addressList = State.CourseAddressListMap[input.Value].Addresses;
            var submissions = new UserSubmissionListOutput();
            foreach (Address address in addressList)
            {
                var userSubmissionList = State.SubmissionMap[input.Value][address];
                if (userSubmissionList != null)
                {
                    var userSubmission = new UserSubmissionList
                    {
                        Address = address,
                        Submissions = userSubmissionList
                    };
                    submissions.UserSubmissions.Add(userSubmission);
                }
            }
            return submissions;
        }
        public override LearnerSubmissonsOutput GetLearnerSubmission(Address address)
        {
            var learnerAddress = address ?? Context.Sender;
            var courseCount = State.CourseId.Value;
            var learnerSubmissionsOutput = new LearnerSubmissonsOutput();
            for (var i = 1; i < courseCount; i++)
            {
                var userSubmissionList = State.SubmissionMap[i][learnerAddress];
                if (userSubmissionList != null)
                {
                    var learnerSubmission = new LearnerSubmisson
                    {
                        CourseId = i,
                        Submissions = userSubmissionList
                    };
                    learnerSubmissionsOutput.Submissions.Add(learnerSubmission);
                }
            }
            return learnerSubmissionsOutput;
        }

    }
}
