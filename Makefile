install:
	npm install

autossh:
	# Run on local laptop
	autossh -M 20000 -N rcurrie@plaza.gi.ucsc.edu -L 18500:localhost:18500 -L 18545:localhost:18545

debug:
	# Start a local server with dynamic reloading
	npm start

deploy-dapp:
	# Build and deploy the app via github pages
	npm run build
	gh-pages -d build_webpack

ganache:
	npx ganache-cli --port 18545

migrate:
	# Reset and update our contract on the local/ganache network
	npx truffle migrate --reset --network local

# publish:
# 	truffle migrate --reset --network=rinkeby
# 	Stewards.deployed().then(function(i) {app = i})
# 	app.set("QmYtrPfa9fpFzG2YTFRW8jxVA8Ry7ZEdADkLiatgdW5iXY")
