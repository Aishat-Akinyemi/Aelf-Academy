
using System;
using System.Linq;
using AElf.Sdk.CSharp;
using AElf.CSharp.Core;
using AElf.Types;
using AElf.Contracts.MultiToken;
using Google.Protobuf.WellKnownTypes;
using Google.Protobuf;

namespace AElf.Contracts.AelfAcademy
{
    /// <summary>
    /// The C# implementation of the contract defined in aelf_academy_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public partial class AelfAcademyContract : AelfAcademyContractContainer.AelfAcademyContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            //assert that it hasn't been initialized before
            Assert(State.Owner.Value == null, "ALREADY INITIALIZED CONTRACT." );
            Assert(input.Admins != null && input.ChiefModerators != null, "you must initialize the academy with at least one ChiefModerator and one Admin");
            //set owner as caller account
            State.Owner.Value = Context.Sender;
            State.CourseId.Value = 1;
            State.HighestLevel.Value = 1;
            //add admin 
            AddUserList(input.Admins, RoleType.Admin);
            //add moderator
            AddUserList(input.ChiefModerators, RoleType.Chiefmoderator);
            State.TokenContract.Value =
            Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            return new Empty();
        }

        public override Empty AddChiefModerator(UserInputList input)
        {
            AssertSenderIsOwnerOrAdmin();
            AddUserList(input, RoleType.Chiefmoderator);
            return new Empty();
        }

        public override Empty AddLearner(StringValue input)
        {
            var user = new UserInputList();
            user.Users.Add(new AddUserInput { Username = input.Value, Address = Context.Sender});
            AddUserList(user, RoleType.Learner);
            return new Empty();
        }
        public override Empty AddAdminList(UserInputList input)    {
           AssertSenderIsOwnerOrAdmin();
           return AddUserList(input, RoleType.Admin);
        }

        private Empty AddUserList(UserInputList input, RoleType role)
        {
            foreach (var userInput in input.Users)
            {
                var usersList = State.UserMap[role][userInput.Address];
                //confirm that user hasn't been added to the role already
                Assert(State.UserMap[role][userInput.Address] == null, $"{userInput.Address} is already added");
                //create user variable
                var user = new User
                {
                    Username = userInput.Username,
                    Address = userInput.Address,
                    Reward = 0
                };
                //add to usermap based on role
                State.UserMap[role][userInput.Address] = user;
                //add to the corresponding  singleton list list (i.e. one of AdminList, ChiefModeratorList and LearnerList)               
                switch (role)
                {
                    case RoleType.Admin:
                        {                            
                            if (State.AdminUserList.Value == null)
                            {
                                State.AdminUserList.Value = new AddressList { Addresses = { userInput.Address } };
                            }
                            else
                            {
                                State.AdminUserList.Value.Addresses.Add(userInput.Address);
                            }
                            break;
                        }
                    case RoleType.Chiefmoderator:
                        {
                            if (State.ChiefModeratorList.Value == null)
                            {
                                State.ChiefModeratorList.Value = new AddressList { Addresses = { userInput.Address } };
                            }
                            else
                            {
                                State.ChiefModeratorList.Value.Addresses.Add(userInput.Address);
                            }
                            break;
                        }
                    case RoleType.Learner:
                        {
                            //add to singleton list
                            if (State.LearnerList.Value == null)
                            {
                                State.LearnerList.Value = new AddressList { Addresses = { userInput.Address } };
                            }
                            else
                            {
                                State.LearnerList.Value.Addresses.Add(userInput.Address);
                            }
                            break;
                        }
                    default: break;
                }
            } 
            return new Empty();
        }

        public override Empty FundAcademy(Int64Value input)
        {
            AssertPositive(input.Value);
            State.AdddressFundMap[Context.Sender] = State.AdddressFundMap[Context.Sender].Add(input.Value);
            //add to donor list
            if (State.DonorList.Value == null)
            {
                State.DonorList.Value = new AddressList { Addresses = { Context.Sender } };
            }
            else
            {
                State.DonorList.Value.Addresses.Add(Context.Sender);
            }
            //transfer amount from caller to contract account
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Amount = input.Value,
                Symbol = Context.Variables.NativeSymbol
            });
            return new Empty();
        }
        public override UserOutputList GetLearners (Empty input)
        {
            return GetUserOutputList(RoleType.Learner);
        }

        private  UserOutputList GetUserOutputList (RoleType role)
        {
            var userList = new UserOutputList();
            var addressList = new AddressList();
            switch (role)  {
                case RoleType.Admin: addressList = State.AdminUserList.Value; break;                    
                case RoleType.Chiefmoderator: addressList = State.ChiefModeratorList.Value; break;                    
                case RoleType.Learner: addressList = State.LearnerList.Value; break;
                default: break;
            }
            if (addressList != null)
            {
                foreach (var address in addressList.Addresses)
                {
                    userList.Users.Add(State.UserMap[role][address]);
                }
            }           
            
            return userList;
        }
        public override AcademyInfo GetAcademyInfo(Empty input)
        {
            return new AcademyInfo
            {
                Owner = State.Owner.Value,
                Admins = GetUserOutputList(RoleType.Admin),
                ChiefModerators = GetUserOutputList(RoleType.Chiefmoderator),
                Balance = State.TokenContract.GetBalance.Call(new GetBalanceInput {    
                    Owner = Context.Self,
                    Symbol = Context.Variables.NativeSymbol
                }).Balance
            };
        }

        public override UserInfo GetUserInfo(Address input)
        {
            var address = input ?? Context.Sender;
            var userInfo = new UserInfo();
            if(State.ChiefModeratorList.Value.Addresses.Contains(address))
            {
                var user = State.UserMap[RoleType.Chiefmoderator][address];
                userInfo.Username = user.Username;
                userInfo.Role = "Chief Moderator";
                userInfo.Reward = user.Reward;
            } else if (State.AdminUserList.Value.Addresses.Contains(address))
            {
                var user = State.UserMap[RoleType.Admin][address];
                userInfo.Username = user.Username;
                userInfo.Role = "Admin";
            } else if (State.LearnerList.Value.Addresses.Contains(address))
            {
                var user = State.UserMap[RoleType.Learner][address];
                userInfo.Username = user.Username;
                userInfo.Role = "Learner";
                userInfo.Level = user.Level;
                userInfo.Reward = user.Reward;
            }
            return userInfo;
        }

        public override Int64Value GetHighestLevel(Empty input)
        {
            return new Int64Value { Value = State.HighestLevel.Value };
        }

        public override FundingHistoryOutPut GetFundingHistory(Empty input)
        {
            var fundingHistory = new FundingHistoryOutPut();
            var donorList = State.DonorList.Value;            
            if (donorList != null)
            {
                foreach (var address in donorList.Addresses)
                {
                    var funding = new FundingMap {
                        Address = address,
                        Amount = State.AdddressFundMap[address]
                    };
                    fundingHistory.FundingList.Add(funding);
                }
            }
            return fundingHistory;
        }

    }
}