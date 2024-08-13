# About the project
With every passing day, we are able to observe extensive use cases of ZKP in the web3 space. In the past few months, a lot of innovation has been observed in projects like ZKML, ZK-based DAO Voting, etc which would aid the community in the future. But currently, users are not able to use these ZK dapps because the verification part is computationally intensive resulting in the end users being forced to pay excessive gas fees. Also, naive users have more trust in L1 chains rather than L2 chains because of their credibility, thus moving the whole dapp onto L2 is not the best solution.

Here is where ZKP-Hype comes into the picture. In our approach, the dapp is deployed over in L1 but the ZKP computational part is moved to the L2 chain. By doing this, the user pays less gas fees and can still have their funds in the L1 chain.

# Architecture of the project
We have executed our planned architecture with these 3 verticals:-

Polyhedra-based ZKP Router:- Proofs and public inputs are relayed from L1 to L2 and computation result is relayed back to L1 using Polyhedra. We have created custom routers for this particular use case by integrating Polyhedra's zkBridge.

Noir Interchain Development Kit:- We have created an interchain dev kit for Noir developers using which they can compile, test, deploy the verifier, and run the off-chain agent with just a single command. Also, we have brought convenience to developers by providing debugging scripts using which they can verify the circuit on-chain.

Offchain-agent(Secondary):- Along with Noir Interchain Dev Kit, you get a prebuilt off-chain agent which you can pair with the custom ISM to add an additional verification layer for your project. This agent will run an off-chain verifier for the same circuit and will generate outputs based on the proof and public input received on the L1 router.

![image](https://github.com/gitshreevatsa/BNB-Polyhedra/assets/81912496/d130bbbe-f437-4963-beac-3e15c97077e2)

![interloom](https://github.com/gitshreevatsa/BNB-Polyhedra/assets/121667116/4489e302-c68b-4847-b63f-cd3721853001)


