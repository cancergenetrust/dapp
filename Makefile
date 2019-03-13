debug:
	# Start a local server with dynamic reloading
	npm start

deploy:
	# Build and deploy the app via github pages
	npm run build
	gh-pages -d build_webpack

migrate:
	# Reset and update our contract on the local/ganache network
	truffle migrate --reset --network development

# publish:
# 	truffle migrate --reset --network=rinkeby
# 	Stewards.deployed().then(function(i) {app = i})
# 	app.set("QmYtrPfa9fpFzG2YTFRW8jxVA8Ry7ZEdADkLiatgdW5iXY")
