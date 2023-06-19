IMAGE_NAME = improving-web-safety-examples-phpcontainer

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run --rm $(IMAGE_NAME)
