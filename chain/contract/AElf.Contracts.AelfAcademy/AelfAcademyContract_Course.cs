using System;
using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
namespace AElf.Contracts.AelfAcademy
{
    public partial class AelfAcademyContract
    {
        public override Empty AddCourse(CourseInput input)
        {
            AssertSenderIsOwnerOrAdmin();
            var currentCourseId = State.CourseId.Value;
            var course = new Course
            {
                SubmissionReward = input.SubmissionReward,
                ModerationReward = input.ModerationReward,
                Level = input.Level,
                ContentUrl = input.ContentUrl,
                IsActive = true,
                CourseTitle = input.CourseTitle
            };
            State.CourseMap[currentCourseId] = course;
            State.CourseId.Value = currentCourseId.Add(1);
            var highestLevel = State.HighestLevel.Value;
            if(input.Level > highestLevel)
            {
                State.HighestLevel.Value = input.Level;
            }

            Context.Fire(new CourseAddedEvent
            {
                CourseId = currentCourseId,
                ModerationReward = input.ModerationReward,
                SubmissionReward =  input.SubmissionReward,
                Level = input.Level,
                AddedBy= Context.Sender,
                CourseTitle = input.CourseTitle
            });
            return new Empty();
        }

        public override CourseOutput GetCourse(Int64Value input)
        {
            var c = State.CourseMap[input.Value];
            return new CourseOutput
            {
                CourseId = input.Value,
                SubmissionReward = c.SubmissionReward,
                ModerationReward = c.ModerationReward,
                Level = c.Level,
                Contenturl = c.ContentUrl,
                IsActive = c.IsActive,
                CourseTitle = c.CourseTitle
            };
        }

        public override CoursesOutput GetCourses(Empty input)
        {
            var courseCount = State.CourseId.Value;
            var coursesList = new CoursesOutput();
            for (var i = 1; i < courseCount; i++)
            {
                var c = State.CourseMap[i];
                if (c != null)
                {
                    coursesList.CourseList.Add(GetCourse(new Int64Value { Value = i }));
                }
            }
            return coursesList;
            //keeping below for reference
            //var courseCount = State.CourseId.Value;
            //var coursesList = new CoursesOutput();
            //var idList = new Int64List();
            //for (var i = 1L; i < courseCount; i++)
            //{
            //    var c = State.CourseMap[i];
            //    if (c.ContentUrl != null)
            //    {
            //        idList.Ids.Add(i);
            //    }
            //} 
            //if (idList.Ids.Count > 0)
            //{
            //    foreach (var id in idList.Ids)
            //    {
            //        coursesList.CourseList.Add(GetCourse(new Int64Value { Value = id }));
            //    }
            //}
            //return coursesList;
        }

    }
}
