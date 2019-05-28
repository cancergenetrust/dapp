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

deploy:
	# Build and deploy the app via github pages
	npm run build
	npx gh-pages -d build

ganache:
	# Run ganache locally preserving state
	# npx ganache-cli --deterministic --db ~/data/ganache --port 18545
	# CGT Test Private Key Local Debug: 0xd7541cff2c5478bf33b550768f3e9a39df6af17feca036e7b9d1dda720ade660
	# 0xcb4a4971afb1e10edb166b8cdae8763d4afefdab
	# CGT Test Mnenomic  "tenant ripple trip improve hover thumb output toddler before token strategy pigeon"
	# UCSF Private Key Local Debug: 0x5a1be6182eff7f23f677b0fdd77205c8e6a01ee0df450b45c117ea19ab2ae0e3
	# 0x70e8dcf7a13621d4351249d2e2e31ced98649631
	npx ganache-cli --port 18545 -i 999 -d -m "tenant ripple trip improve hover thumb output toddler before token strategy pigeon"

truffle-console-local:
	# Open truffle console and connect to local ethereum node
	# To update the top level hash for a steward - run from their account!
	# truffle migrate --reset --network=rinkeby
	# Stewards.deployed().then(function(i) {app = i})
	# app.set("QmYtrPfa9fpFzG2YTFRW8jxVA8Ry7ZEdADkLiatgdW5iXY")
	npx truffle console --network local

truffle-console-rinkeby:
	npx truffle console --network cgt_rinkeby

migrate-local:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --reset --network local

migrate-rinkeby:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --reset --network cgt_rinkeby
