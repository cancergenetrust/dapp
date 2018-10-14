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
