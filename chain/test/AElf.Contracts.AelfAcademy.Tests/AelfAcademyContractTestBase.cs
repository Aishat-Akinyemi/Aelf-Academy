using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.AelfAcademy
{
    public class AelfAcademyContractTestBase : DAppContractTestBase<AelfAcademyContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal AelfAcademyContractContainer.AelfAcademyContractStub GetAelfAcademyContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<AelfAcademyContractContainer.AelfAcademyContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}