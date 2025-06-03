Espresso in the Modular Stack
How Espresso can optionally be used for data availability and sequencing

The Espresso Network has been designed with modularity in mind. We have seen that developers are best able to innovate when they have flexibility around designing their stack. 

Espresso offers several benefits for chain operators and their developers to choose from:

Confirmations: All chains that leverage Espresso benefit from fast, reliable confirmations—replacing the need for users, bridges, and beyond to depend on preconfirmations that come from centralized sequencers.

Data availability: All chains using Espresso also benefit from highly efficient data availability offered by the Espresso Network. However, many of the chains that are using Espresso also choose to leverage another form of DA, such as EigenDA, Celestia, Avail, or Ethereum itself. We have designed Espresso to respect and to be additively compatible with these choices. 

Decentralized sequencing: Chains integrating Espresso may additionally use it as a decentralized sequencing layer, leveraging the network to determine the order of transactions on the chain. However, this is not required: chains that use their own sovereign sequencers to determine transaction ordering can still benefit from Espresso’s confirmations. 


A few examples of how Ethereum rollups can use the Espresso network include:

A standard rollup or validium that uses the L1 or an alternative data availability solution, leverages its own centralized sequencer, and settles to Ethereum may leverage Espresso for confirmations.

A based rollup that uses Ethereum for DA, relies on the Ethereum proposer for sequencing, and looks to the L1 for settlement may also use Espresso for fast, reliable confirmations.

A validium that leverages its own centralized sequencer can use Espresso for data availability and also for more robust confirmations than the preconfirmations that its sequencer could offer.

A rollup or validium that wants to decentralize its sequencing without using the L1 proposer may use the Espresso leader as its sequencer for any given round and use Espresso for confirmations – while using its own choice of data availability.

A rollup that uses Espresso for DA, sequencing, and confirmations is what we like to call a caffeinated chain.

While we only cover Ethereum rollups here, this also applies to sovereign rollups and beyond. 

Chains (e.g. L2 rollups) interact with Espresso and with the layer 1 blockchain to facilitate trustless state checkpoints. Specifically, when we refer to L1 and L2s we mean the following: 

The L1 (layer 1) blockchain: This is the blockchain that chains using Espresso post state checkpoints to. HotShot must also checkpoint its state and history on the layer-1, which will serve as an interface to the rollups. Initially Espresso will run a smart contract on Ethereum that tracks HotShot's state commitments. Other projects can recycle these state commitments to reuse on other chains if they wish. 

The L2 (layer 2) chains: These are the chains that use Espresso for selling sequencing rights and confirmations. They could be anything from app-specific chains to fully-featured smart contract systems in their own right (like EVM rollups). Each chain is assumed here to be structured as a rollup: after receiving an ordered sequence of transactions, the transactions are executed off-chain in some deterministic VM, and periodically state updates are posted to the layer-1, along with a proof of validity (for ZK-rollups) or a potential fraud proof (for optimistic rollups).

This diagram shows the flow of information through the entire system, starting with transaction submission through clients to various integrated rollups and finally to being certified and checkpointed on the layer-1. 


The next sections dive into these components and their interactions in more detail.

Rollup Components
The internal architecture of each rollup will vary greatly depending on the type of rollup (e.g., ZK/optimistic; EVM/app-specific) but all rollups will have a few similar basic components. The internal structure of Rollup 1 is shown in detail in the diagram (for simplicity, the other rollups are abstracted).

A rollup must provide an interface for clients to interact with it. This can be any kind of API, although Ethereum-compatible JSON-RPC will be common. The API responds to queries about the rollup state by reading from a state database, which is populated by the executor, a component which executes every block provided by the sequencer. Finally, a prover (which may be part of a decentralized prover network) is triggered by updates to the state and is responsible for justifying those state updates. For ZK-rollups, the prover will be triggered by every block and produce a validity proof for the state update. For optimistic rollups, the prover will only be triggered if another node publishes an invalid state update, in which case the prover will generate a fraud proof.

In addition to answering state queries, the rollup API may also serve as an endpoint for clients to submit transactions. While clients can submit transactions directly to the Espresso Network's mempool, doing so may be inconvenient for a few reasons:

The Espresso Network's transaction submission interface is not specific to any one rollup. Clients will have to wrap their rollup-specific transactions into a more generic kind of transaction before submitting.

It requires clients to interact with two different services: the rollup API for state queries and the Espresso Network (HotShot) for transaction submissions. Depending on the client software, this may not even be possible. MetaMask, for example, requires a single URL for each chain that it can use for queries and transaction submission.

It is therefore recommended that rollup servers provide a transaction submission interface as part of their API, for those clients who are already using the rest of the API. Such an interface is actually required for conforming JSON-RPC implementations, since the eth_sendRawTransaction RPC method allows clients of the RPC to submit a transaction. Whatever its interface, the implementation of the rollup’s submission API can be as simple as wrapping rollup transactions into generic transactions and forwarding them to the HotShot mempool.

Transaction Flow
Once a transaction is forwarded or submitted, it will be included in a block, and confirmed and made available by HotShot, after which blocks propagate back through the rollups’ executors and provers, which in turn forward their blocks to the L1. Espresso also sends a block commitment to the layer 1 sequencer contract, along with a quorum certificate that the contract uses to authenticate the block. This allows layer 1 rollup contracts to compare the rollup state update proof against a block commitment which is certified as having been finalized by HotShot consensus.

The diagram below shows in more detail the flow of a single transaction from a client through the system.


Transaction Lifecycle
User sends a transaction to a chain's server (e.g. an RPC service).

The chain forwards the transaction, along with an identifier for that rollup, to the chain's sequencer.

The chain's sequencer includes the transaction in a block, which is broadcast to subscribers. One of these subscribers, the rollup node, executes the transaction (along with any other transactions in the block belonging to that rollup). In the case of a ZK rollup, the node may produce a proof of correct execution, which can be broadcast to clients to quickly convince them of the new state.

A commitment to the block containing the transaction is persisted in the L1 sequencer contract (along with a proof that the block has been finalized by consensus).

A rollup node which has executed the block sends the new rollup state to the L1. It may include a validity proof (for ZK rollups) or open a window for fraud proofs (optimistic rollups).

The L1 rollup contract verifies any proofs related to the state update, using the certified block commitment from the sequencer contract to check that the state update corresponds to the correct block.

Confirmations
Centralized sequencers may give rollup users a pre-confirmation that their transaction will eventually be included in the finalized rollup state. These pre-confirmations can be trusted via a combination of reputation, security bonds, and/or fraud proofs.

Clients can also opt to wait for a stronger confirmation provided by HotShot (step 3). As long as no adversary controls more than one third of the HotShot stake, the client's transaction can never be rolled back. This is especially usefull for bridging, as they are sensitive to reorgs in the source chain of a bridge transaction.

In the case that a rollup posts their tx data to the L1, clients can also wait for their tx to be finalized on the L1, though in the case of Ethereum, this guarantee can take 15 minutes to attain, as opposed to a few seconds in the case of HotShot. 

Once a transaction is finalized, clients may want to read the updated rollup state, either to check the results of their transaction's execution or to prepare another transaction. They have several options (listed below) for doing this, depending on who they trust and how much work they are willing to do themselves. Depending on which option they choose, each client can get their preferred tradeoff between latency, trust, and the amount of work they are required to perform.

They can rely on the pre-confirmation provided by the sequencer to compute the next rollup state.

They can leverage Espresso's Global Confirmation Layer and immediately execute it themselves to compute the new state.

They can get a state update, at the cost of additional trust assumptions, by trusting a rollup server who has executed the transaction to give them the new state, even before a state update proof is generated.

In the case of a ZK rollup, they can wait for a state update proof to be generated (step 3) and check that proof. This requires less computation than executing the block, and it is still trustless.

Finally, if a client does not want to do any computation on their own (or in the case of an optimistic rollup, where there is no validity proof for the client to check) and does not want to trust a rollup server, they can wait until a state update is certified by the L1 (step 6) to fetch the updated state with no trust or computation.

Multi-Chain Blocks
In the case that a sequencer has won the right to sequence for multiple chains simultaneously, blocks produced by that sequencer (step 3) may include transactions from many different rollups. Chains need some way to prove they have executed all of the transactions belonging to them, and only those transactions, preferably without searching exhaustively through the entire block. Without this, chain nodes could censor users by simply ignoring some sequenced transactions, or they could create confusing state updates by executing transactions that were intended for another chain.

To support this efficiently, each transaction submitted to the sequencer must be associated with a chain-specific identifier (step 2). Each block produced by the sequencer contains transactions organized by namespace. The block also has a short, unique commitment, which depends on the transactions in the block and other metadata, like its height and timestamp. It is possible to create proofs relative to this commitment which convince a verifier that a given namespace in the block contains a certain list of transactions. This allows someone who only cares about a particular namespace, like a rollup node, to download just the data they care about (plus a short proof) from an untrusted server, and verify it.

Namespace proofs are small and computationally cheap to check, which makes them suitable for verification by an L1 smart contract or in a ZK circuit. This functionality is essential for ZK rollups that need to prove they have executed all the relevant transactions in a certain block in order to compute a new state, and for optimistic rollups that need to arbitrate a fraud challenge about the execution of relevant transactions in a block.

This namespaced block commitment is the commitment that is certified and stored in the L1 sequencer contract (step 4). When rollup contracts need to verify an inclusion proof for a sequence of rollup-specific transactions in a particular block, they can read the corresponding block commitment directly from the sequencer contract and use it to verify the proof.

Note that the sequencer does not authenticate the mapping from chain IDs to transaction sequences. Nothing stops a bad actor from submitting a transaction for one chain with the ID of another, or from submitting a transaction which is invalid in a particular chain with the ID of that chain. As such, chains will still need the ability to detect and exclude invalid transactions in their execution layers. This is fundamental to chains with permissionless sequencing.

A well-behaved chain should choose an ID for itself which is distinct from any IDs which are in use by other well-behaved chains. This is similar to how, in the Ethereum ecosystem, different EVM blockchains choose different chain IDs, and the responsibility ultimately falls on users to avoid using a malicious chain which copies the chain ID of some other system. In fact, EVM rollups could in theory use their EVM chain IDs as their Espresso chain identifiers.

Espresso ↔ Rollup
In order to keep HotShot nodes themselves as generic and simple as possible, there is no rollup-specific logic in Espresso itself, and thus Espresso never actively communicates with any rollup. Instead, HotShot query service nodes present a public interface which rollups are expected to query in order to integrate with Espresso. This interface takes the form of a REST API. See the API reference for details.

Usage
Rollup nodes may use these APIs differently depending on the role they are playing in the system (e.g., prover, full node, etc.). A prover can use the API to stream block data from a node, so that it can execute blocks as they are finalized and generate proofs. The prover also interacts with the L1, since it can only verify a rollup proof on the L1 if the L1 has already verified the sequencing of the corresponding block.


Prover / Sequencer Integration
A rollup may also include full nodes which store and provide access to rollup-related state, but do not run a prover. Such a full node can stream blocks and verify consensus proofs (QCs) directly from the HotShot APIs, without interacting with the L1. Avoiding interaction with the L1 allows state updates to be computed faster.


Full Node / Sequencer Integration
The rollup also interacts with HotShot via the submit API. This interaction is completely independent of the streaming interaction illustrated above. It is simply used to add transactions to HotShot’s mempool so that they may eventually be included in the sequence. Any rollup node which serves a rollup API (e.g. JSON-RPC) should be able to handle transaction submissions through HotShot's submit API.

The body of submit requests includes the transaction to submit as well as a rollup-specific numeric identifier. This identifier is associated with the transaction in the final sequence, so rollup proofs can use the ID to easily exclude transactions intended for other rollups. Each rollup should have its own protections against cross-rollup replay attacks, such as an EVM chain ID, in addition to this rollup ID.

Espresso ↔ L1
Espresso interacts with the L1 via the sequencer contract, which validates HotShot consensus and provides a certified, trustless interface for other participants to check the sequence of blocks. Note that the contract only deals with short block commitments, not full blocks, in order to minimize the cost of sending data to the L1. Anyone who has verified a commitment against the contract can get the corresponding block—and authenticate it against the commitment—from the HotShot availability API.

Espresso interacts with the sequencer contract via an interface like:

// HotShot.sol
Copy
struct QC { /* Fields omitted */ } 

// Root of a Merkle tree accumulating the verified sequence of block commitments.
bytes32 public commitmentsRoot;

// Event emitted when new blocks are sequenced.
event NewBlocks(uint firstBlockNumber, uint256[] commitments, bytes32[] frontier);
 
// Called to append a chain of new blocks, given proof that consensus has finalized them.
function newBlocks(QC[] calldata qcs, bytes calldata proof, bytes32[] calldata frontier) external;
The newBlocks method allows a sequencer node to append a list of newly sequenced block commitments to the log stored in the contract. It takes a list of quorum certificates, a validity proof, and a Merkle frontier corresponding to commitmentsRoot, and it validates that

Each QC extends from the previous QC in the chain (starting with the previously sequenced QC)

Each QC is properly signed (the contract will need to store and keep up-to-date the stake table)

There are enough QCs to prove finality for one or more block commitments. HotShot consensus currently requires a chain of at least 3 QCs before the first QC in the chain is considered finalized (an upcoming version of HotShot will only require a 2-chain of QCs)

If validation succeeds, it updates commitmentsRoot, which can then be used by other contracts to validate proofs of inclusion of block commitments in the sequence. On success, newBlocks emits a NewBlocks event informing clients (e.g. rollup provers) that new blocks have been appended. Those clients can read the new block commitments from the event logs using an Ethereum client. The event logs also include a snapshot of the Merkle frontier just before the new blocks were appended. A client can construct a Merkle path for any given commitment by appending commitments to the snapshotted frontier.

newBlocks will fail if the given batch has already been sequenced, since qcs will fail the check that it must extend from the last sequenced QC. This ensures that each batch of blocks will only be sequenced once — whoever calls this method first will be the one to sequence it. It is an open question whether the contract will explicitly incentivize sequencer nodes to call newBlocks.

To learn more about the sequencer contract, how it stores data, and how it validates QCs, read the section on its internal functionality