# ND1309 C2 Ethereum Smart Contracts, Tokens and Dapps - Project Starter 
**PROJECT: Decentralized Star Notary Service Project** - For this project, you will create a DApp by adding functionality with your smart contract and deploy it on the public testnet.

### ToDo
This Starter Code has already implemented the functionalities you implemented in the StarNotary (Version 2) exercise, and have comments in all the files you need to implement your tasks.



### Dependencies
For this project, you will need to have:
1. **Node and NPM** installed - NPM is distributed with [Node.js](https://www.npmjs.com/get-npm)
```bash
# Check Node version
node -v
# Check NPM version
npm -v
```


2. **Truffle v5.X.X** - A development framework for Ethereum. 
```bash
# Unsinstall any previous version
npm uninstall -g truffle
# Install
npm install -g truffle
# Specify a particular version
npm install -g truffle@5.0.2
# Verify the version
truffle version
```


2. **Metamask: 5.3.1** - If you need to update Metamask just delete your Metamask extension and install it again.


3. [Ganache](https://www.trufflesuite.com/ganache) - Make sure that your Ganache and Truffle configuration file have the same port.


4. **Other mandatory packages**:
```bash
cd app
# install packages
npm install --save  openzeppelin-solidity@2.3
**npm install --save  truffle-hdwallet-provider@1.0.17**
npm install --save @truffle/hdwallet-provider@2.1.15
npm install webpack-dev-server -g
npm install web3
```


### Run the application
1. Clean the frontend 
```bash
cd app
# Remove the node_modules  
# remove packages
rm -rf node_modules
# clean cache
npm cache clean
rm package-lock.json
# initialize npm (you can accept defaults)
npm init
# install all modules listed as dependencies in package.json
npm install
```


2. Start Truffle by running
```bash
# For starting the development console
truffle develop
# truffle console

# For compiling the contract, inside the development console, run:
compile

# For migrating the contract to the locally running Ethereum network, inside the development console
migrate --reset

# For running unit tests the contract, inside the development console, run:
test
```

3. Frontend - Once you are ready to start your frontend, run the following from the app folder:
```bash
cd app
npm run dev
```

---

### Important
When you will add a new Rinkeyby Test Network in your Metamask client, you will have to provide:

| Network Name | New RPC URL | Chain ID |
|---|---|---|
|Private Network 1|`http://127.0.0.1:8545/`|1337 |

The chain ID above can be fetched by:
```bash
cd app
node index.js
```

## Troubleshoot
#### Error 1 
```
'webpack-dev-server' is not recognized as an internal or external command
```
**Solution:**
- Delete the node_modules folder, the one within the /app folder
- Execute `npm install` command from the /app folder

After a long install, everything will work just fine!


#### Error 2
```
ParserError: Source file requires different compiler version. 
Error: Truffle is currently using solc 0.5.16, but one or more of your contracts specify "pragma solidity >=0.X.X <0.X.X".
```
**Solution:** In such a case, ensure the following in `truffle-config.js`:
```js
// Configure your compilers  
compilers: {    
  solc: {      
    version: "0.5.16", // <- Use this        
    // docker: true,
    // ...
```

## Raise a PR or report an Issue
1. Feel free to raise a [Pull Request](https://github.com/udacity/nd1309-p2-Decentralized-Star-Notary-Service-Starter-Code/pulls) if you find a bug/scope of improvement in the current repository. 

2. If you have suggestions or facing issues, you can log in issue. 

---

Do not use the [Old depreacted zipped starter code](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/January/5c51c4c0_project-5-starter-code/project-5-starter-code.zip)


Deployed on Sepolia test network---------------------------------------------------------------------
1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x5ed98bc68765a443da8b3c80afc20b0256c9c502bf2ae6285c622ca01e9bde67
   > Blocks: 1            Seconds: 9
   > contract address:    0x997F1Aa215BA983bbe579E28884bC2dA346A2464
   > block number:        4969342
   > block timestamp:     1703707764
   > account:             0x36553b793Fe7a75e75138510dF5dd71ddbd443d6
   > balance:             0.998844808048267654
   > gas used:            226587 (0x3751b)
   > gas price:           5.098226958 gwei
   > value sent:          0 ETH
   > total cost:          0.001155191951732346 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 4969343)
   > confirmation number: 2 (block: 4969344)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.001155191951732346 ETH


2_deploy_contracts.js
=====================

   Deploying 'StarNotary'
   ----------------------
   > transaction hash:    0xa706ce4c334bc9030a932a67796e8de6abda4e4acffb777d2f1efd3870bfb2c9
   > Blocks: 1            Seconds: 17
   > contract address:    0x5F9382e1926D16dDAC6051348906ecB68164a048
   > block number:        4969346
   > block timestamp:     1703707836
   > account:             0x36553b793Fe7a75e75138510dF5dd71ddbd443d6
   > balance:             0.986537485777632283
   > gas used:            2269996 (0x22a32c)
   > gas price:           5.320788409 gwei
   > value sent:          0 ETH
   > total cost:          0.012078168405276364 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 4969347)
   > confirmation number: 2 (block: 4969348)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.012078168405276364 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.01323336035700871 ETH


Token Created on Sepolia-------------------------------------------------------------------------------
transaction hash -0x8ffbffb7ad8febebf778c287a27287996e8bc2ce98c1f8fccde99985ffc5693c
