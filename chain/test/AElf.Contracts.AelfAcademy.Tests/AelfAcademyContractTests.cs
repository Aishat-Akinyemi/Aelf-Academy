//using System.Linq;
//using System.Threading.Tasks;
//using AElf.ContractTestBase.ContractTestKit;
//using AElf.CSharp.Core.Extension;
//using AElf.Types;
//using Google.Protobuf;
//using Google.Protobuf.WellKnownTypes;
//using Shouldly;
//using Xunit;

using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.CSharp.Core.Extension;
using AElf.Kernel;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.AelfAcademy
{
    public class AelfAcademyContractTests : AelfAcademyContractTestBase
    {
        [Fact]
        public async Task Initialize()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);

            // initializing with no admins and chief_moderators should fail
            await stub.Initialize.SendWithExceptionAsync(new InitializeInput { });

            //initialize with admin and moderator lists
            var admin = new AddUserInput { Username = "admin1", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new AddUserInput { Username = "mod1", Address = SampleAccount.Accounts.Skip(3).First().Address };
            await stub.Initialize.SendAsync(new InitializeInput { Admin = admin, ChiefModerator = chief_moderator });
            var academyInfo = await stub.GetAcademyInfo.CallAsync(new Empty());
            academyInfo.Admins.Users.Count.ShouldBe(1, "admin should be 1");
            academyInfo.ChiefModerators.Users.Count.ShouldBe(1, "chief moderator should be 1");

        }

        [Fact]
        public async Task Fund()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);
            //var keyPair1 = SampleAccount.Accounts.Skip(1).First().KeyPair;
            //var stub1 = GetAelfAcademyContractStub(keyPair1);
            //initialize with admin and moderator lists
            var admin = new AddUserInput { Username = "admin1", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new AddUserInput { Username = "mod1", Address = SampleAccount.Accounts.Skip(3).First().Address };
            await stub.Initialize.SendAsync(new InitializeInput { Admin = admin, ChiefModerator = chief_moderator });
            var initialBalance = (await stub.GetAcademyInfo.CallAsync(new Empty())).Balance;
            //fund 
            const long amount = 100_00000000;
            var tokenStub = GetTokenContractStub(keyPair);
            await tokenStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });

            await stub.FundAcademy.SendAsync(new Int64Value { Value = amount });
            var balanceAfterFunding = (await stub.GetAcademyInfo.CallAsync(new Empty())).Balance;
            balanceAfterFunding.ShouldBe(initialBalance + amount);
        }
        [Fact]
        public async Task Admin()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);

            var admin = new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new  AddUserInput { Username = "anike", Address = SampleAccount.Accounts.Skip(3).First().Address };
            //initialize
            await stub.Initialize.SendAsync(new InitializeInput { Admin = admin, ChiefModerator = chief_moderator });
            var initialAcademyInfo = await stub.GetAcademyInfo.CallAsync(new Empty());
            initialAcademyInfo.Admins.Users.Count.ShouldBe(1, "admin should be 1");

            var admin1 = new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(4).First().Address };
            await stub.AddAdmin.SendAsync(admin1);

            var academyInfo = await stub.GetAcademyInfo.CallAsync(new Empty());
            academyInfo.Admins.Users.Count.ShouldBe(2, "admin should be 2");

            //adding the same admin should return an exception
            await stub.AddAdmin.SendWithExceptionAsync(admin);

            //adding an admin with a non-admin account should fail
            var keypair1 = SampleAccount.Accounts.Skip(3).First().KeyPair;
            var stub1 = GetAelfAcademyContractStub(keypair1);
            var admin2 = new AddUserInput { Username = "seun", Address = SampleAccount.Accounts.Skip(5).First().Address };
            await stub1.AddAdmin.SendWithExceptionAsync(admin2);

        }

        [Fact]
        public async Task ChiefModerator()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);

            var admin = new AddUserInput { Username = "firstUser", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new  AddUserInput { Username = "secondUser", Address = SampleAccount.Accounts.Skip(2).First().Address };
            //initialize
            await stub.Initialize.SendAsync(new InitializeInput
            {
                Admin = admin,
                ChiefModerator = chief_moderator
            });

            var initialAcademyInfo = await stub.GetAcademyInfo.CallAsync(new Empty());
            initialAcademyInfo.ChiefModerators.Users.Count.ShouldBe(1, "moderator should be 1");

            var chiefModerators = new AddUserInput { Username = "thirdUser", Address = SampleAccount.Accounts.Skip(3).First().Address };
            await stub.AddChiefModerator.SendAsync(chiefModerators);
            var academyInfo = await stub.GetAcademyInfo.CallAsync(new Empty());
            academyInfo.ChiefModerators.Users.Count.ShouldBe(2, "moderator should be 2");

            //adding the same chiefModerator should return an exception
            await stub.AddChiefModerator.SendWithExceptionAsync(chiefModerators);

            //adding a chiefmoderator with a non-admin account should fail
            var keypair1 = SampleAccount.Accounts.Skip(4).First().KeyPair;
            var stub1 = GetAelfAcademyContractStub(keypair1);
            var chiefModerator1 = new AddUserInput { Username = "fourthUser", Address = SampleAccount.Accounts.Skip(4).First().Address };
            await stub1.AddAdmin.SendWithExceptionAsync(chiefModerator1);

        }

        [Fact]
        public async Task Learner()
        {   // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);
            var admin = new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new AddUserInput { Username = "anike", Address = SampleAccount.Accounts.Skip(2).First().Address };
            //initialize
            await stub.Initialize.SendAsync(new InitializeInput { Admin = admin, ChiefModerator = chief_moderator });
            var initial_learners = await stub.GetLearners.CallAsync(new Empty());
            initial_learners.Users.Count.ShouldBe(0);

            var keyPair2 = SampleAccount.Accounts.Skip(1).First().KeyPair;
            var stub2 = GetAelfAcademyContractStub(keyPair2);
            StringValue username = new StringValue { Value = "tara" };
            await stub2.AddLearner.SendAsync(username);
            var learners = await stub.GetLearners.CallAsync(new Empty());
            learners.Users.Count.ShouldBe(1);

            //cannot add a learner more than once
            await stub2.AddLearner.SendWithExceptionAsync(username);
        }

        [Fact]
        public async Task Courses()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var keyPair2 = SampleAccount.Accounts.Skip(1).First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);
            var adminStub = GetAelfAcademyContractStub(keyPair2);

            var admin = new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new AddUserInput { Username = "anike", Address = SampleAccount.Accounts.Skip(2).First().Address };
            //initialize
            await stub.Initialize.SendAsync(new InitializeInput { Admin = admin, ChiefModerator = chief_moderator });

            //the no of courses before we add courses should be 0
            var initialcourse = await stub.GetCourses.CallAsync(new Empty());
            initialcourse.CourseList.Count.ShouldBe(0);

            var course = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 1,
                ModerationReward = 12,
                SubmissionReward = 100,
                CourseTitle = "Get started with aelf"
            };

            //add course with admin account
            await stub.AddCourse.SendAsync(course);
            var courses = await adminStub.GetCourses.CallAsync(new Empty());
            courses.CourseList.Count.ShouldBe(1);

            //get course should return the course
            var _course = await adminStub.GetCourse.CallAsync(new Int64Value { Value = 1 });
            _course.CourseId.ShouldBe(1);
            _course.Contenturl.ShouldContain("htt");

            //add courses with admin account
            var course2 = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 2,
                ModerationReward = 10,
                SubmissionReward = 100,
                CourseTitle = "AElf 201"
            };
            await adminStub.AddCourse.SendAsync(course2);
            var course3 = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 3,
                ModerationReward = 10,
                SubmissionReward = 100,
                CourseTitle = "AELF 300"
            };
            await adminStub.AddCourse.SendAsync(course3);
            var highestLevel = await stub.GetHighestLevel.CallAsync(new Empty());
            highestLevel.Value.ShouldBe(3);

        }

        [Fact]
        public async Task Submission()
        {
            // Get a stub for testing.
            var keyPairOwner = SampleAccount.Accounts.First().KeyPair;
            var ownerStub = GetAelfAcademyContractStub(keyPairOwner);

            var keyPairL1 = SampleAccount.Accounts.Skip(3).First().KeyPair;
            var learner1Address = SampleAccount.Accounts.Skip(3).First().Address;
            var learner1Stub = GetAelfAcademyContractStub(keyPairL1);

            var keyPairAdmin = SampleAccount.Accounts.Skip(1).First().KeyPair;
            var adminStub = GetAelfAcademyContractStub(keyPairAdmin);

            var keyPairLearner2 = SampleAccount.Accounts.Skip(4).First().KeyPair;
            var learner2Address = SampleAccount.Accounts.Skip(4).First().Address;
            var learner2stub = GetAelfAcademyContractStub(keyPairLearner2);

            var admins = new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new AddUserInput { Username = "anike", Address = SampleAccount.Accounts.Skip(2).First().Address };
            //initialize
            await ownerStub.Initialize.SendAsync(new InitializeInput { Admin = admins, ChiefModerator = chief_moderator });

            //add learner account
            StringValue username = new StringValue { Value = "tara" };
            await learner1Stub.AddLearner.SendAsync(username);
            //add 2nd learner account
            StringValue username2 = new StringValue { Value = "fiona" };
            await learner2stub.AddLearner.SendAsync(username2);

            //fund 
            const long amount = 1000_00000000;
            var tokenStub = GetTokenContractStub(keyPairOwner);
            await tokenStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });
            await ownerStub.FundAcademy.SendAsync(new Int64Value { Value = amount });
            var initialContractBalance = (await ownerStub.GetAcademyInfo.CallAsync(new Empty())).Balance;

            //add courses with owner account
            var course1 = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 1,
                ModerationReward = 10_00000000,
                SubmissionReward = 50_00000000,
                CourseTitle = "Get started with aelf"
            };
            await ownerStub.AddCourse.SendAsync(course1);
            //submitting a challenge with a non-existent courseId should fail
            var submitLevel2ChallengeInput = new SubmitChallengeInput
            {
                CourseId = 2,
                SubmissionUrl = "https://ipfs.io//1"
            };
            await learner1Stub.SubmitChallenge.SendWithExceptionAsync(submitLevel2ChallengeInput);

            //submitting a challenge with a non-learner account should fail
            await ownerStub.SubmitChallenge.SendWithExceptionAsync(submitLevel2ChallengeInput);


            //successfully submitting a challenge should increase the count of submissions
            var submitValidChallengeInput = new SubmitChallengeInput
            {
                CourseId = 1,
                SubmissionUrl = "https://ipfs.io//1"
            };
            await learner1Stub.SubmitChallenge.SendAsync(submitValidChallengeInput);
            var courseSubmission = await learner1Stub.GetCourseSubmission.CallAsync(new Int64Value { Value = 1 });
            //total number of submissions for course should  be 1           
            courseSubmission.UserSubmissions.Count.ShouldBe(1);
            

            //should accept additional submission if previous submissions have not yet been approved by moderator
            var submitValidChallengeInput1 = new SubmitChallengeInput
            {
                CourseId = 1,
                SubmissionUrl = "https://ipfs.io//2"
            };
            await learner1Stub.SubmitChallenge.SendAsync(submitValidChallengeInput1);            

            await learner2stub.SubmitChallenge.SendAsync(submitValidChallengeInput1);
            await learner2stub.SubmitChallenge.SendAsync(submitValidChallengeInput1);
            //total number of submissions for course should  be 2
            courseSubmission = await learner1Stub.GetCourseSubmission.CallAsync(new Int64Value { Value = 1 });
            courseSubmission.UserSubmissions.Count.ShouldBe(2);

            //learner1 submission count for course1 should be 2
            var learnerSubmission = await learner1Stub.GetLearnerSubmission.CallAsync(learner1Address);
           
            //learner2 submission count for course1 should be 2
            var learner2Submission = await learner1Stub.GetLearnerSubmission.CallAsync(learner2Address);
          

        }

        [Fact]
        public async Task SubmissionAndModeration()
        {
            // Get a stub for testing.
            var keyPairOwner = SampleAccount.Accounts.First().KeyPair;
            var ownerStub = GetAelfAcademyContractStub(keyPairOwner);

            var keyPairL1 = SampleAccount.Accounts.Skip(3).First().KeyPair;
            var learner1Address = SampleAccount.Accounts.Skip(3).First().Address;
            var learner1Stub = GetAelfAcademyContractStub(keyPairL1);

            var keyPairMod = SampleAccount.Accounts.Skip(2).First().KeyPair;
            var moderatorStub = GetAelfAcademyContractStub(keyPairMod);
            var moderatorAdd = SampleAccount.Accounts.Skip(2).First().Address;

            var keyPairAdmin = SampleAccount.Accounts.Skip(1).First().KeyPair;
            var adminStub = GetAelfAcademyContractStub(keyPairAdmin);

            var keyPairLearner2 = SampleAccount.Accounts.Skip(4).First().KeyPair;
            var learner2Address = SampleAccount.Accounts.Skip(4).First().Address;
            var learner2stub = GetAelfAcademyContractStub(keyPairLearner2);

            var admins = new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(1).First().Address };
            var chief_moderator = new AddUserInput { Username = "anike", Address = SampleAccount.Accounts.Skip(2).First().Address };
            //initialize
            await ownerStub.Initialize.SendAsync(new InitializeInput { Admin = admins, ChiefModerator = chief_moderator });


            //add learner account
            StringValue username = new StringValue { Value = "tara" };
            await learner1Stub.AddLearner.SendAsync(username);
            //add 2nd learner account
            StringValue username2 = new StringValue { Value = "fiona" };
            await learner2stub.AddLearner.SendAsync(username2);

            //fund 
            const long amount = 1000_00000000;
            var tokenStub = GetTokenContractStub(keyPairOwner);
            await tokenStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });
            await ownerStub.FundAcademy.SendAsync(new Int64Value { Value = amount });
            var initialContractBalance = (await ownerStub.GetAcademyInfo.CallAsync(new Empty())).Balance;

            var initialModeratorBalance = (await tokenStub.GetBalance.CallAsync(new GetBalanceInput { Symbol = "ELF", Owner = moderatorAdd })).Balance; ;
            var initialLearnerBalance = (await tokenStub.GetBalance.CallAsync(new GetBalanceInput { Symbol = "ELF", Owner = learner2Address })).Balance;

            var initialModeratorReward = (await ownerStub.GetUserInfo.CallAsync(moderatorAdd)).Reward;
            var initialLearnerReward = (await ownerStub.GetUserInfo.CallAsync(learner2Address)).Reward;

            //add courses with owner account
            var course1 = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 1,
                ModerationReward = 10_00000000,
                SubmissionReward = 50_00000000,
                CourseTitle = "Get started with aelf"
            };
            await ownerStub.AddCourse.SendAsync(course1);
            //submitting a challenge with a non-existent courseId should fail
            var submitLevel2ChallengeInput = new SubmitChallengeInput
            {
                CourseId = 2,
                SubmissionUrl = "https://ipfs.io//1"
            };
            await learner1Stub.SubmitChallenge.SendWithExceptionAsync(submitLevel2ChallengeInput);

            //successfully submitting a challenge should increase the count of submissions
            var submitValidChallengeInput = new SubmitChallengeInput
            {
                CourseId = 1,
                SubmissionUrl = "https://ipfs.io//1"
            };
            await learner1Stub.SubmitChallenge.SendAsync(submitValidChallengeInput);
            //submitting a challenge with a non-learner account should fail
            await ownerStub.SubmitChallenge.SendWithExceptionAsync(submitLevel2ChallengeInput);
            //should accept additional submission if previous submissions have not yet been approved by moderator
            var submitValidChallengeInput1 = new SubmitChallengeInput
            {
                CourseId = 1,
                SubmissionUrl = "https://ipfs.io//2"
            };
            await learner1Stub.SubmitChallenge.SendAsync(submitValidChallengeInput1);
            var learnerSubmission = await learner1Stub.GetLearnerSubmission.CallAsync(SampleAccount.Accounts.Skip(3).First().Address);
            var courseSubmission = await learner1Stub.GetCourseSubmission.CallAsync(new Int64Value { Value = 1 });
            courseSubmission.UserSubmissions.Count.ShouldBe(1);

            //----------------------------------------------------------------------------------------------------------------------------------------------------------------------

            //Test Moderation
            //add courses with admin account
            var course2 = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 2,
                ModerationReward = 20_00000000,
                SubmissionReward = 80_00000000,
                CourseTitle = "AELF 201"
            };
            await adminStub.AddCourse.SendAsync(course2);
            var course3 = new CourseInput
            {
                ContentUrl = "https://...",
                Level = 3,
                ModerationReward = 50_00000000,
                SubmissionReward = 100_00000000,
                CourseTitle = "AELF 301"
            };
            await adminStub.AddCourse.SendAsync(course3);
            //learner 2 submits challenge for course 3
            var submitValidChallengeInput3 = new SubmitChallengeInput
            {
                CourseId = 3,
                SubmissionUrl = "https://ipfs.io//4"
            };
            
            await learner2stub.SubmitChallenge.SendAsync(submitValidChallengeInput3);

            //a non-moderator who is not 2 levels above the course cannot moderate
            await learner2stub.ModerateChallenge.SendWithExceptionAsync(new ModerateChallengeInput { CourseId = 1, LearnerId = learner1Address, IsApproved = true });

            //a moderator can moderate
            await moderatorStub.ModerateChallenge.SendAsync(new ModerateChallengeInput { CourseId = 3, LearnerId = learner2Address, IsApproved = true });

            var moderatorBalanceAfterModeration = (await tokenStub.GetBalance.CallAsync(new GetBalanceInput { Symbol = "ELF", Owner = moderatorAdd })).Balance;
            var learnerBalanceAfterModeration = (await tokenStub.GetBalance.CallAsync(new GetBalanceInput { Symbol = "ELF", Owner = learner2Address })).Balance;
            var moderationPaidReward = moderatorBalanceAfterModeration - initialModeratorBalance;
            var learnerPaidReward = learnerBalanceAfterModeration - initialLearnerBalance;
            var contractBalanceAfterModeration = (await ownerStub.GetAcademyInfo.CallAsync(new Empty())).Balance;
            (initialContractBalance - contractBalanceAfterModeration).ShouldBe(learnerPaidReward + moderationPaidReward);

            //get learner's and moderator's reward AFTER submission
            var subsequentModeratorReward = (await ownerStub.GetUserInfo.CallAsync(moderatorAdd)).Reward;
            var subsequentLearnerReward = (await ownerStub.GetUserInfo.CallAsync(learner2Address)).Reward;
            (subsequentLearnerReward - initialLearnerReward).ShouldBe(course3.SubmissionReward);
            (subsequentModeratorReward - initialModeratorReward).ShouldBe(course3.ModerationReward);


            //a moderator cannot approve an already moderated submission
            await moderatorStub.ModerateChallenge.SendWithExceptionAsync(new ModerateChallengeInput { CourseId = 3, LearnerId = learner2Address, IsApproved = true });

            //should not accept a submission for a course if it has already been approved by moderator
            await learner2stub.SubmitChallenge.SendWithExceptionAsync(submitValidChallengeInput3);
            //a learner 2 levels above another learner can moderate
            await learner2stub.ModerateChallenge.SendAsync(new ModerateChallengeInput { CourseId = 1, LearnerId = learner1Address, IsApproved = true });
            //a learner 2 levels above another learner can moderate            
            await moderatorStub.ModerateChallenge.SendWithExceptionAsync(new ModerateChallengeInput { CourseId = 2, LearnerId = learner1Address, IsApproved = true });
        }



    }
}