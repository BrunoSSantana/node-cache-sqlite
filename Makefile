# Define o nome do arquivo de banco de dados
DB_FILE=db.sqlite

# Comando para criar o arquivo de banco de dados se não existir
db-init:
	@if [ ! -f $(DB_FILE) ]; then \
		echo "Creating SQLite database file..."; \
		touch $(DB_FILE); \
	else \
		echo "Database file already exists."; \
	fi

# Comando para rodar o docker-compose
docker-up: db-init
	@docker compose up --build

# Comando para parar o docker-compose
docker-down:
	@docker compose down

# Comando para remover o volume do banco de dados (remover o arquivo .sqlite)
clean:
	@rm -f $(DB_FILE)
	@docker compose down --volumes
