# About the project
With every passing day, we are able to observe extensive use cases of ZKP in the web3 space. In the past few months, a lot of innovation has been observed in projects like ZKML, ZK-based DAO Voting, etc which would aid the community in the future. But currently, users are not able to use these ZK dapps because the verification part is computationally intensive resulting in the end users being forced to pay excessive gas fees. Also, naive users have more trust in L1 chains rather than L2 chains because of their credibility, thus moving the whole dapp onto L2 is not the best solution.

Here is where ZKP-Hype comes into the picture. In our approach, the dapp is deployed over in L1 but the ZKP computational part is moved to the L2 chain. By doing this, the user pays less gas fees and can still have their funds in the L1 chain.

# Architecture of the project
We have executed our planned architecture with these 3 verticals:-

![image](https://github.com/user-attachments/assets/e470ebb4-227b-439e-a8fc-067d9cbab96f)


Polyhedra-based ZKP Router:- Proofs and public inputs are relayed from L1 to L2 and computation result is relayed back to L1 using Polyhedra. We have created custom routers for this particular use case by integrating Polyhedra's zkBridge.

Noir Interchain Development Kit:- We have created an interchain dev kit for Noir developers using which they can compile, test, deploy the verifier, and run the off-chain agent with just a single command. Also, we have brought convenience to developers by providing debugging scripts using which they can verify the circuit on-chain.

Offchain-agent(Secondary):- Along with Noir Interchain Dev Kit, you get a prebuilt off-chain agent which you can pair with the custom ISM to add an additional verification layer for your project. This agent will run an off-chain verifier for the same circuit and will generate outputs based on the proof and public input received on the L1 router.

![image](https://github.com/gitshreevatsa/BNB-Polyhedra/assets/81912496/d130bbbe-f437-4963-beac-3e15c97077e2)

![interloom](https://github.com/gitshreevatsa/BNB-Polyhedra/assets/121667116/4489e302-c68b-4847-b63f-cd3721853001)


# Ethereum Consensus and Layered Circuits in Go

## Overview

This repository contains a Go implementation focused on two key areas:

1. **Ethereum Consensus Mechanisms**: Interfaces and types for implementing consensus engines, including extensions for algorithms like Proof of Work (PoW) and Proof of Stake Authority (PoSA).
2. **Layered Circuits**: Structures and methods for managing, validating, and processing complex layered circuits, potentially used in cryptographic or computational contexts.

## Consensus Package

The `consensus` package provides foundational interfaces and types for creating and extending Ethereum consensus engines.

### Key Interfaces

- **`Engine`**: Represents a consensus engine with methods for block handling, header verification, and block finalization.
- **`ChainReader` and `ChainHeaderReader`**: Interfaces for reading blockchain data such as headers and blocks.

### Specialized Consensus Engines

- **`PoW` (Proof of Work)**
- **`PoSA` (Proof of Stake Authority)**

These engines extend the `Engine` interface with methods tailored to their specific consensus algorithms.

## Layered Circuits Package

The `layered` package handles the representation and manipulation of multi-layered circuits, which can be used in cryptographic proofs or complex computations.

### Key Structures

- **`RootCircuit` and `Circuit`**: Represent multi-layered circuits and individual segments.
- **Gates**: Include `GateMul`, `GateAdd`, and `GateCst`, representing multiplication, addition, and constants within circuits.

### Key Functions

- **`Validate`**: Ensures the integrity of a `RootCircuit`, checking for valid connections and input/output consistency.
- **`Print`**: Debugging method that outputs the structure of circuits to the console.

## Detailed Functionality

### `dfsTopoSort`

Performs a topological sort on circuits, ensuring they are processed in the correct order. It calculates various properties of each circuit, such as the number of variables, sub-circuits, and hint inputs, and stores these properties in the context.

### `computeMinMaxLayers`

Calculates the minimum and maximum layers for variables in the circuit, which helps in understanding variable dependencies and optimizing circuit evaluation. The process involves:

- Building a directed acyclic graph (DAG) of dependencies.
- Performing a breadth-first search (BFS) to determine variable usage.
- Computing layers for sub-circuits and the overall output layer.

### `isSingleVariable`

Checks if an expression represents a single variable by ensuring it meets specific criteria, such as having exactly one term and a coefficient of one.

### `compile`

The `compile` function in the `compileContext` struct outlines the process for compiling circuits, including:

1. **Topological Sorting**
2. **Layer Computation**
3. **Preparing Layer Layouts**
4. **Solving Layer Layouts**
5. **Generating Wires**
6. **Recording Input Order**

## Improvements and Considerations

- **Error Handling**: Add more robust error checks and handling mechanisms.
- **Optimization**: Profile the code for performance bottlenecks, particularly in BFS and graph-building logic.
- **Documentation**: Add detailed comments to complex methods for better maintainability.
- **Testing**: Ensure comprehensive unit tests are in place to cover edge cases and complex scenarios.

## Conclusion

This repository provides a solid foundation for implementing Ethereum consensus mechanisms and managing layered circuits. Whether you are extending consensus engines or working on cryptographic circuits, the tools and structures provided here should prove valuable.

For further assistance or inquiries, feel free to reach out!

