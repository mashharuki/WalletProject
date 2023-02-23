const WalletABI = `[
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "contract MultiSigWallet",
            "name": "wallet",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address[]",
            "name": "owners",
            "type": "address[]"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "required",
            "type": "uint256"
          }
        ],
        "name": "WalletCreated",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "wallets",
        "outputs": [
          {
            "internalType": "contract MultiSigWallet",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "walletsCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "address[]",
            "name": "_owners",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "_required",
            "type": "uint256"
          }
        ],
        "name": "createWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "limit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "offset",
            "type": "uint256"
          }
        ],
        "name": "getWallets",
        "outputs": [
          {
            "internalType": "contract MultiSigWallet[]",
            "name": "coll",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
]`;

module.exports = { 
  WalletABI
};