using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.CSharp.Core.Extension;
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

          

            //TODO test for academy info

           

            // Or maybe you want to get its return value.
            // var output = (await stub.Hello.SendAsync(new Empty())).Output;

            // Or transaction result.
            // var transactionResult = (await stub.Hello.SendAsync(new Empty())).TransactionResult;
        }

        [Fact]
        public async Task Test()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetAelfAcademyContractStub(keyPair);

            // Use CallAsync or SendAsync method of this stub to test.
            await stub.Initialize.SendAsync(new InitializeInput
            {
                
            });

            UserInputList adminList = new UserInputList();
            adminList.Users.Add(new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(3).First().Address });
            adminList.Users.Add(new AddUserInput { Username = "aishat", Address = SampleAccount.Accounts.Skip(3).First().Address });
            await stub.AddAdminList.SendAsync(adminList);
            var getAdminListResult = await stub.GetAdminList.CallAsync(new Empty());
            getAdminListResult.Users.Count.ShouldBe(2, "count should be 2");
            


            // Or maybe you want to get its return value.
            // var output = (await stub.Hello.SendAsync(new Empty())).Output;

            // Or transaction result.
            // var transactionResult = (await stub.Hello.SendAsync(new Empty())).TransactionResult;
        }
    }
}