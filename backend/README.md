# SmartContract

### Scripts
1. `npm run deploy:goreli`
2. `npm run verify:goreli`

### verify code (Migrations Contract)

1. [【Goreli】0x2fE0DF9c96F41Ce329f54FAc9ff689f0fC13fcA3](https://goerli.etherscan.io/address/0x2fE0DF9c96F41Ce329f54FAc9ff689f0fC13fcA3#code)
2. [【BSC testnet】0x9eCE03F901dFC53544E4abf610b6813c6305f262](https://testnet.bscscan.com/address/0x9eCE03F901dFC53544E4abf610b6813c6305f262#code)
3. [【Famtom】0xAa363921A48Eac63F802C57658CdEde768B3DAe1](https://testnet.ftmscan.com/address/0xAa363921A48Eac63F802C57658CdEde768B3DAe1#code)
4. [【Avalanche Fuji】0x6E73AE14C43145b8f8044C707642cc6e3C053224]( https://testnet.snowtrace.io/address/0x6E73AE14C43145b8f8044C707642cc6e3C053224#code)
5. [【Mumbai】]()

### deployed Contract address (Migrations Contract)

1. [【Harmony】0xAa363921A48Eac63F802C57658CdEde768B3DAe1](https://explorer.harmony.one/address/0xAa363921A48Eac63F802C57658CdEde768B3DAe1)
2. [【Arbitrum Goreli】0xAa363921A48Eac63F802C57658CdEde768B3DAe1](https://goerli-rollup-explorer.arbitrum.io/address/0xAa363921A48Eac63F802C57658CdEde768B3DAe1)

### Test Result

#### MyToken Contract

```zsh
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: MyToken Contract test
    initialization
      ✓ gets the myToken name
      ✓ gets the myToken symbol
      ✓ gets the myToken decimals
      ✓ gets the myToken totalSupply
    operate tokens!!
      ✓ mint (696ms)
      ✓ transfer (424ms)
      ✓ transfer2 (435ms)
      ✓ approve (73ms)
      ✓ burn (617ms)
      ✓ transferFrom (452ms)


  10 passing (5s)
```