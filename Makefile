install:
	npm install

autossh:
	# Port forward to local machine react dev server and ethereum test server
	autossh -M 20000 -N plaza.gi.ucsc.edu -L 18500:localhost:18500 -L 18545:localhost:18545

debug:
	# Start a local server with dynamic reloading
	npm start

run:
	# Run the build version locally
	npx serve -s build -l tcp://127.0.0.1:18500

deploy-dapp:
	# Build and deploy the app via github pages
	npm run build
	gh-pages -d build_webpack

ganache:
	# Run ganache locally preserving state
	# npx ganache-cli --deterministic --db ~/data/ganache --port 18545
	npx ganache-cli --port 18545

truffle-console-local:
	# Open truffle console and connect to local ethereum node
	# To update the top level hash for a steward - run from their account!
	# truffle migrate --reset --network=rinkeby
	# Stewards.deployed().then(function(i) {app = i})
	# app.set("QmYtrPfa9fpFzG2YTFRW8jxVA8Ry7ZEdADkLiatgdW5iXY")
	npx truffle console --network local

migrate-local:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --network local

migrate-rinkeby:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --reset --network cgt_rinkeby
