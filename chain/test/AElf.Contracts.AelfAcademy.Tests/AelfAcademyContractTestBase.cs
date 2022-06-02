using AElf.Boilerplate.TestBase;
using AElf.Contracts.MultiToken;
using AElf.Cryptography.ECDSA;
using AElf.Kernel.Token;
using AElf.Types;

namespace AElf.Contracts.AelfAcademy
{
    public class AelfAcademyContractTestBase : DAppContractTestBase<AelfAcademyContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);
        internal Address TokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);
        internal AelfAcademyContractContainer.AelfAcademyContractStub GetAelfAcademyContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<AelfAcademyContractContainer.AelfAcademyContractStub>(DAppContractAddress, senderKeyPair);
        }

        internal TokenContractContainer.TokenContractStub GetTokenContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<TokenContractContainer.TokenContractStub>(TokenContractAddress, senderKeyPair);
        }
    }
}