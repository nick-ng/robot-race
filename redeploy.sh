git checkout -f main
git pull
PORT=3010 docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build
PORT=3010 docker compose -f docker-compose.prod.yml up -d
