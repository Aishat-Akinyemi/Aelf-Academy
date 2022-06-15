const DEFAULT_PRIV_KEY = process.env.REACT_APP_DEFAULT_PRIV_KEY;
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function environment(env) {
    switch (env) {
      case "tdvw":
        return {
          networkId: "tdvw",
          nodeUrl: "https://tdvw-test-node.aelf.io",
          contractAddress: CONTRACT_ADDRESS,
          explorerUrl: "https://explorer.aelf.io/",
          defaultPrivateKey: DEFAULT_PRIV_KEY,
          contractName: "Aelf Academy",
          // tokenContractName: 'AElf.ContractNames.Token',
          tokenContractName: 'AElf.ContractNames.Token',
          address: {
            prefix: 'ELF',
            suffix: 'AELF'
          },
          tokenSymbol: 'ELF',
        };
        case "local":
            return {
                networkId: "local",
                nodeUrl: "http://127.0.0.1:1235",
                contractAddress: CONTRACT_ADDRESS,
                explorerUrl: "https://explorer.aelf.io/",
                defaultPrivateKey: DEFAULT_PRIV_KEY,
                contractName: "Aelf Academy",
                tokenContractName: 'AElf.ContractNames.Token',
                address: {
                  prefix: 'ELF',
                  suffix: 'AELF'
                },
                tokenSymbol: 'ELF',
              };
      
      default:
        throw Error(`Unknown environment '${env}'.`);
    }
  }
  
  export default environment;