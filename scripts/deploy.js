const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const TimeLockContract = await ethers.getContractFactory("TimeLock");

  const deployedTimeLockContract = await TimeLockContract.deploy();

  await deployedTimeLockContract.deployed();

  console.log("TimeLock Contract Address:", deployedTimeLockContract.address);

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedTimeLockContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
