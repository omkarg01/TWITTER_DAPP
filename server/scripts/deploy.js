const hre = require("hardhat");

async function main() {
    const TwitterContract = await hre.ethers.getContractFactory("TwitterContract");
    const twitterContract = await TwitterContract.deploy();

    await twitterContract.deployed();

    console.log(
        `${twitterContract.address} is the address of the deployed contract.`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();
