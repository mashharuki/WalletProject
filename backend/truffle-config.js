require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const HDWalletProvider2 = require("@truffle/hdwallet-provider");

const {
  HD_MNEMONIC,
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_MUNBAI_APIKEY,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  BSCSCAN_API_KEY,
  SNOWTRACE_API_KEY,
  FAMTOMSCAN_API_KEY,
  AURORASCAN_API_KEY
} = process.env;


module.exports = {
  // bulid path for ABI json files
  contracts_build_directory: path.join(__dirname, "./../frontend/src/contracts"),
  // plugin
  plugins: [
    'truffle-plugin-verify'
  ],
  // api keys for API
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
    polygonscan: POLYGONSCAN_API_KEY,
    bscscan: BSCSCAN_API_KEY,
    snowtrace: SNOWTRACE_API_KEY,
    ftmscan: FAMTOMSCAN_API_KEY,
    aurorascan: AURORASCAN_API_KEY
  },
  networks: {
    goreli: {
      provider: () => new HDWalletProvider(HD_MNEMONIC, `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_API_KEY}`),
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mumbai: {
      provider: () => new HDWalletProvider(HD_MNEMONIC, `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUNBAI_APIKEY}`),
      network_id: 80001,
      // gas: 500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsctest: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    fuji: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: 43113,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    harmony: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC,'https://api.s0.b.hmny.io'),
      network_id: 1666700000,
    },
    ftm: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC,'https://rpc.testnet.fantom.network/'),
      network_id: 0xfa2,
    },
    op: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC,'https://goerli.optimism.io'),
      network_id: 420,
      confirmations: 10,
      skipDryRun: true
    },
    arbitrum: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC,'https://goerli-rollup.arbitrum.io/rpc'),
      network_id: 421613,
    },
    aurora: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC,'https://testnet.aurora.dev'),
      network_id: 0x4e454153,
      gas: 10000000,
    },
  },
  mocha: {

  },
  compilers: {
    solc: {
      version: "0.8.0",    
      // docker: true,        
        settings: {          
          optimizer: {
            enabled: false,
            runs: 200
          },
      //  evmVersion: "byzantium"
        }
    }
  },
};
