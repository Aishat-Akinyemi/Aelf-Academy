
using System;
using System.Linq;

using AElf.Sdk.CSharp;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Google.Protobuf;

namespace AElf.Contracts.AelfAcademy
{
    /// <summary>
    /// The C# implementation of the contract defined in aelf_academy_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class AelfAcademyContract : AelfAcademyContractContainer.AelfAcademyContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            //assert that it hasn't been initialized before
            Assert(State.Owner.Value == null, "Already initialized.");
            //Assert(input.Admin != null && input.Moderator != null, "you must initialize the academy with at least one ChiefModerator and one Admin");
            //set owner as caller account
            State.Owner.Value = Context.Sender;
            //add admin 
           
            //add moderator
           

            return new Empty();
        }

        public override Empty AddCourse(AddCourseInput input)
        {
            return base.AddCourse(input);
        }

        //public override Empty AddAdmin(AddUserInput input)
        //{
        //    var userId = CalculateFeatureValue(input.Address);
        //    //the value for RoleType.Admin is 0
        //    Assert(State.AdminMap[userId] == null, $"{userId} is already added as an Admin");
        //    State.AdminMap[userId] = input.Address;
        //    User thisUser = new User();
        //    thisUser.Username = input.Username;
        //    thisUser.Reward = 0;
        //    State.UserMap[RoleType.Admin][userId] = thisUser;
        //    Context.Fire(new AdminAddedEvent
        //    {
        //        AddedBy = Context.Sender,
        //        AdminAddress = input.Address
        //    });
        //    return new Empty();
        //}

    
        //public override Empty AddChiefModerator(AddUserInput input)
        //{
        //    var userId = CalculateFeatureValue(input.Address);
        //    //the value for RoleType.CHIEFMODERATOR is 2
        //    Assert(State.UserMap[RoleType.Chiefmoderator][userId] == null, $"{input.Address} is already added as a Chief Moderator");
        //    State.ChiefModeratorMap[userId] = input.Address;
        //    User thisUser = new User();
        //    thisUser.Username = input.Username;
        //    thisUser.Reward = 0;
        //    State.UserMap[RoleType.Chiefmoderator][userId] = thisUser;
        //    Context.Fire(new ChiefModeratorAddedEvent
        //    {
        //        AddedBy = Context.Sender,
        //        ModeratorAddress = input.Address
        //    });
        //    return new Empty();
        //}

        public override Empty AddLearner(StringValue input)
        {
            return new Empty();
        }

        public override Empty SubmitChallenge(SubmitChallengeInput input)
        {
            return new Empty();
        }

        public override Empty ModerateChallenge(ModerateChallengeInput input)
        {
            return new Empty();
        }

        public override AcademyInfo GetAcademyInfo(Empty input)
        {
            var ai = new AcademyInfo();
           
            //var en = State.AdminMap.Value;
            //    return new AcademyInfo({

            //        Owner = State.Owner.Value,
            //        Fund = 0, //TODO handle funds
            //        Admins = State.UserMap[0],


            //    });
            return base.GetAcademyInfo(input);

        }

        public override UserInfo GetUserInfo(Int64Value input)
        {
            return base.GetUserInfo(input);
        }

        public override Int64Value GetHighestLevel(Empty input)
        {
            return base.GetHighestLevel(input);
        }

        public override Course GetCourse(Int64Value input)
        {
            return base.GetCourse(input);
        }

        public override Courses GetCourses(Empty input)
        {
            return base.GetCourses(input);
        }

        public override Address GetOwner(Empty input)
        {
            return base.GetOwner(input);
        }

        public override CourseSubmissions GetCourseSubmission(Int64Value input)
        {
            return base.GetCourseSubmission(input);
        }
        public override CourseSubmissions GetOutstandingCourseSubmission(Int64Value input)
        {
            return base.GetOutstandingCourseSubmission(input);
        }
        public override LearnerSubmissons GetLearnerSubmission(Int64Value input)
        {
            return base.GetLearnerSubmission(input);
        }
        public override CourseSubmissions GetModeratorsModerations(Int64Value input)
        {
            return base.GetModeratorsModerations(input);
        }

        public override Empty AddAdminList(UserInputList input)
        {
            
            //TODO assert sender is Admin or Owner
            //foreach (var map in UserInputList)
            //{
            //    var userId = CalculateFeatureValue(map.Key);
            //}           
            foreach (var userInput in input.Users)
            {                
                
                //Assert(State.AdminMap[userId] == null, $"{userId} is already added as an Admin");
                //create user variable
                var user = new User {
                    Username = userInput.Username,
                    Address = userInput.Address,
                    Reward = 0
                };
                //add to the main map
                State.AdminMap[userInput.Address] = user;

                //add to singleton list
                if (State.AdminUserList.Value == null)
                {
                    State.AdminUserList.Value = new AddressList { Value = { userInput.Address } };
                }
                else
                {
                    State.AdminUserList.Value.Value.Add(userInput.Address);
                }
                
            }
            return new Empty();
        }

        public override UserOutputList GetAdminList(Empty input)
        {
            var adminList = new UserOutputList();
            
            foreach ( var userId in State.AdminUserList.Value.Value)
            {                
                adminList.Users.Add(State.AdminMap[userId]);
            }
            return adminList;   
        }

        /// <summary>
        /// Upper limit 2147483647 * 2.
        /// Must be unique.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        private string CalculateFeatureValue(Address address)
        {
            var hash = HashHelper.ComputeFrom(address);
            var originInteger = hash.ToByteArray().ToInt32(true);
            var addMaxValue = (long)originInteger + int.MaxValue;
            return addMaxValue.ToString();
        }
    }
}