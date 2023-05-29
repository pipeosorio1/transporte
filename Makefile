docker:
	docker-compose up -d --build

docker-prod:
	docker-compose -f docker-compose.production.yml up -d --build

docker-down:
	docker-compose down

docker-log:
	docker logs --tail 1000 -f transporte