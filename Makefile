build:
	cd dex_metrics_plot && $(MAKE) build
	cd service_provider && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down