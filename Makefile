include .env

install:
	npm install

autossh:
	# Port forward to local machine react dev server and ethereum test server
	autossh -M 20000 -N plaza.gi.ucsc.edu -L 18500:localhost:18500 -L 18545:localhost:18545

debug:
	# Start a local server with dynamic reloading
	npm start

test-contracts:
	# Test our contracts
	npx truffle test

run:
	# Run the build version locally
	npx serve -s build -l tcp://127.0.0.1:18500

deploy:
	# Build and deploy the app via github pages
	npm run build
	npx gh-pages -d build

ganache:
	# Run ganache locally preserving state
	# npx ganache-cli --port 18545 -m $(CGT_PRODUCTION_MNENOMIC)
	npx ganache-cli --port 18545

truffle-console-local:
	# Open truffle console and connect to local ethereum node
	npx truffle console --network local

truffle-console-cgt-rinkeby:
	npx truffle console --network cgt_rinkeby
	
truffle-console-ucsf-rinkeby:
	npx truffle console --network ucsf_rinkeby

migrate-local:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --network local

migrate-rinkeby:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --network cgt_rinkeby
