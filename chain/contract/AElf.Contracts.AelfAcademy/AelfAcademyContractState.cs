using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;


namespace AElf.Contracts.AelfAcademy
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class AelfAcademyContractState : ContractState
    {
        
        public SingletonState<Address> Owner { get; set; }
        public MappedState<string, Address, long> VotedMap { get; set; }
        public Int64State HighestLevel { get; set; }
        public Int64State CourseCounter { get; set; }
        public Int64State Fund { get; set; }
        //TODO map fundingmap
        //public MappedState<string, Address> AdminMap { get; set; }
        //public SingletonState<userList> AdminUserList { get; set; }
        public MappedState<string, Address> ChiefModeratorMap { get; set; }
        //maps RoleType enum values[0, 1, 2] -> Address -> Name
        //public MappedState<RoleType, Address, User> UserMap { get; set; }
        public MappedState<RoleType, string, User> UserMap { get; set; }
        //courseMap maps course_id to course_
        public MappedState<long, course_> CourseMap { get; set; }

        //courseSubmissionMap maps course_id -> learner -> submission
        public MappedState<long, Address, submission_> SubmissionMap { get; set; }

        //TODO implement courseModerationMap and benchmark with getting moderations from above


        public MappedState<string, User> AdminMap { get; set; }
        public SingletonState<StringList> AdminUserList { get; set; }


    }
}