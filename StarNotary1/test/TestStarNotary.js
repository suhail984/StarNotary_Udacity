const assert = require('assert');

const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    console.log("17",await instance.tokenIdToStarInfo.call(tokenId));
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert(value1 < value2,'Balance after sale should be greater.');
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
   // let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert(Number(balanceAfterUser2BuysStar) < Number(balanceOfUser2BeforeTransaction), "Gas is not considered.");
});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 6;
    await instance.createStar('Trstinf name nd symbol of star', starId, {from: user1});
    let resultName = await instance.name.call();
    assert.equal("Star1", resultName, "The name was not added corretly");
    let resultSymbol = await instance.symbol.call();
    assert.equal("Star", resultSymbol, "The Symbol was not added corretly");
});

it('lets 2 users exchange stars', async() => {
    // 1. create 2 Stars with different tokenId
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    // 3. Verify that the owners changed
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId1 = 7;
    let starId2 =8;
    await instance.createStar('user1 star', starId1,{from: user1});
    await instance.createStar('user2 star', starId2, {from: user2 });
    let owner1BeforExchange = (await instance.ownerOf.call(starId1)).valueOf().toString();
    let owner2BeforExchange = (await instance.ownerOf.call(starId2)).valueOf().toString();
    await instance.exchangeStars(starId1,starId2,{from:user1});
    let owner1AfterExchange = (await instance.ownerOf.call(starId1)).valueOf().toString();
    let owner2AfterExchange = (await instance.ownerOf.call(starId2)).valueOf().toString();
    assert.notEqual(owner1BeforExchange,owner1AfterExchange, "Oner of token1 not changes");
    assert.notEqual(owner2BeforExchange,owner2AfterExchange, "Oner of token2 not changes");


});

it('lets a user transfer a star', async() => {
    // 1. create a Star with different tokenId
    // 2. use the transferStar function implemented in the Smart Contract
    // 3. Verify the star owner changed.
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 9;
    await instance.createStar('user1 star', starId, {from:user1});
    let ownerBeforeTransfer = (await instance.ownerOf.call(starId));
    await instance.transferStar(user2,starId,{from:user1});
    let ownerAfterTransfer = (await instance.ownerOf.call(starId));
    assert.notEqual(ownerBeforeTransfer, ownerAfterTransfer, "Token is trnasfered")
});

it('lookUptokenIdToStarInfo test', async() => {
    // 1. create a Star with different tokenId
    // 2. Call your method lookUptokenIdToStarInfo
    // 3. Verify if you Star name is the same
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 10;
    await instance.createStar('LookUpStar', starId,{from: user1});
    let starName = (await instance.lookUptokenIdToStarInfo.call(starId));
    let expectedResult = "LookUpStar";
    assert.equal(starName,expectedResult, "Star name does not match");
});