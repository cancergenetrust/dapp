build:
	npm run build

debug:
	npm start

deploy:
	gh-pages -d build_webpack

migrate:
	truffle migrate --reset
