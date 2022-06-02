using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using AElf.Contracts.MultiToken;


namespace AElf.Contracts.AelfAcademy
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class AelfAcademyContractState : ContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        public SingletonState<long> CourseId { get; set; }
        public SingletonState<Address> Owner { get; set; }
        public Int64State HighestLevel { get; set; }
        //funding address => amount map
        public MappedState<Address, long> AdddressFundMap {get; set;}
        public SingletonState<AddressList> DonorList { get; set; }

        //maps RoleType enum values[0, 1, 2] -> Address -> Name
        //public MappedState<RoleType, Address, User> UserMap { get; set; }
        public MappedState<RoleType, Address, User> UserMap { get; set; }
        //courseMap maps course_id to course
        public MappedState<long, Course> CourseMap { get; set; }
        //list of address of admin
        public SingletonState<AddressList> AdminUserList { get; set; }
        //list of address of chief moderators
        public SingletonState<AddressList> ChiefModeratorList { get; set; }
        //list of address of learners
        public SingletonState<AddressList> LearnerList { get; set; }
        
        //courseSubmissionMap maps course_id -> learner -> submission
        public MappedState<long, Address, SubmissionList> SubmissionMap { get; set; }
        //maps course_id to list of Addresses
        public MappedState<long, AddressList> CourseAddressListMap { get; set; }    




    }
}