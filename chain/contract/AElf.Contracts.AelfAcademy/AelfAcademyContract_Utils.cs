using System;
using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.AelfAcademy
{
    public partial class AelfAcademyContract
    {   
        private void AssertSenderIsOwner()
        {
            Assert(State.Owner.Value != null, "CONTRACT NOT INITIALIZED.");
            Assert(Context.Sender == State.Owner.Value, "PERMISSION DENIED.");
        }

        private bool isSenderCanModerate(long courseId)
        {
            //checks if the user is a chief moderator or is 2 levels above the course where the challenge belongs
            var isModerator = State.ChiefModeratorList.Value.Addresses.Contains(Context.Sender);
            if (isModerator)
            {
                return true;
            }
            var course = State.CourseMap[courseId];
            var isHigherLevel = State.UserMap[RoleType.Learner][Context.Sender].Level.Sub(1) > course.Level;
            return isHigherLevel;
        }

        private void AssertPositive(long amount)
        {
            Assert(amount > 0, "Input value should be positive.");
        }

        private void AssertSenderIsOwnerOrAdmin()
        {
            //var isOwner = (Context.Sender == State.Owner.Value);
            //var isAdmin = false;
            //if (State.AdminUserList.Value != null) 
            //{
            //    isAdmin = State.AdminUserList.Value.Addresses.Contains(Context.Sender);                
            //}
            //Assert(isOwner || isAdmin, "PERMISSION DENIED.");

            var isOwner = (Context.Sender == State.Owner.Value);
            var isAdmin = false;
            if (State.AdminUserList.Value == null)
            {
                Assert(isOwner, "PERMISSION DENIED.");
            } else
            {
                isAdmin = State.AdminUserList.Value.Addresses.Contains(Context.Sender);
                Assert(isOwner || isAdmin, "PERMISSION DENIED.");
            }
            


            //var isOwner = (Context.Sender == State.Owner.Value);            
            ////if (State.AdminUserList != null) {
            ////    var isAdmin = State.AdminUserList.Value.Addresses.Contains(Context.Sender);
            ////    Assert(isOwner || isAdmin, "PERMISSION DENIED.");
            ////    return;
            ////}
            //Assert(isOwner, "PERMISSION DENIED.");
        }


        /// <summary>
        /// Upper limit 2147483647 * 2.
        /// Must be unique.
        /// </summary>
        /// <param name="address"></param>
        /// <param name="course_id"></param>
        /// <returns></returns>
        private long CalculateSubmissionId(Address address, long course_id)
        {
            var hash = HashHelper.ComputeFrom(address);
            var originInteger = hash.ToByteArray().ToInt32(true);
            var addMaxValue = (long)originInteger + int.MaxValue + course_id;
            return addMaxValue;
        }
    }
}
