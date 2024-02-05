.PHONY: *

docs:
	rm -rf src || true
	speakeasy generate docs --schema /github/workspace/repo/openapi.json --out ./ --langs typescript,unity,curl --compile

build:
	pnpm run build

run-server:
	$(MAKE) build
	go run server.go