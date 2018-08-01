build:
	npm run build

deploy:
	gh-pages -d build_webpack

migrate:
	truffle migrate --reset
