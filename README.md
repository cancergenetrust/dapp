# The Cancer Gene Trust
[The Cancer Gene Trust](http://www.cancergenetrust.org) is a simple, real-time, global network for sharing somatic cancer data and associated clinical information. It's architecture is based on a decentralized, distributed content addressable real-time database. Stewards working directly with patient-participants publish de-identified genomic and basic clinical data. Researchers who find rare variants or combinations of variants in this global resource that are associated with specific clinical features of interest may then contact the data stewards for those participants. A submission consists of a manifest and references to files by multihash. Initial submissions will likely include de-identified clinical data, a list of somatic mutations, and gene expression data although any type of data can be submitted and shared.

# Submissions
Stewards maintain submissions in [IPFS](https://ipfs.io) and submit the top level hash to a contract on the Ethereum blockchain. Submissions consist of a JSON manifest with a list of files. Files typically consist of somatic variant vcf files and gene expression tsv file. Manifest's and files are stored and referenced by the [multihash](https://github.com/multiformats/multihash) of their content. Eash steward has a top level JSON index file containing it's dns domain, list of submissions by multihash. A steward's address is the account they use to update their top level hash via a contract on the Ethereum blockchain. This provides authentication and authorization for its submissions as well as any other content referenced via multihash within it including all submissions. 

# ĐApp
The prototype ĐApp currently only allows browsing submissions. Submitting data is via IPFS or the Submit repo which will eventually be folded into this application and manual contract interaction outlined below and in the code.

# Development
To run and debug the ĐApp along with a local ethereum test chain:

```
# Install all the npm modules
npm install

# Start a local test Ethereum chain
make ganache

# Deploy the contract to the chain
make migrate-local

# Nominate and make the first steward submission
npx truffle exec init.js --network local

# Run the application
make debug
