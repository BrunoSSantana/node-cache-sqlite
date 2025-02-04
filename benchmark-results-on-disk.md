# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via `POST` e consultados via `GET`, comparando as implementações de cache com SQLite e Redis.

## 📊 Resultados

| Implementação | Método | Rota         | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|---------------|--------|--------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
| SQLite | POST | /sqlite | bruno | 50 | 30 | 3420.44 | 14.11 | 37.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 30 | 5913.07 | 7.95 | 16.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 50 | 60 | 2748.29 | 17.69 | 45.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 60 | 4273.07 | 11.19 | 24.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 100 | 30 | 2475.10 | 39.91 | 76.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 100 | 30 | 4374.07 | 22.36 | 39.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 100 | 60 | 2619.84 | 37.67 | 70.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 100 | 60 | 4181.42 | 23.41 | 51.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 250 | 30 | 2613.74 | 95.11 | 175.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 250 | 30 | 4350.11 | 56.96 | 70.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 250 | 60 | 2563.42 | 97.10 | 211.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 250 | 60 | 4149.55 | 59.75 | 154.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 30 | 7107.87 | 6.54 | 10.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 30 | 8716.34 | 5.25 | 13.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 60 | 6664.77 | 7.00 | 16.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 60 | 8444.55 | 5.44 | 13.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 30 | 7172.67 | 13.45 | 24.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 30 | 9189.34 | 10.39 | 16.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 60 | 7307.60 | 13.19 | 21.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 60 | 9320.00 | 10.23 | 16.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 30 | 7537.00 | 32.69 | 48.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 30 | 9975.27 | 24.60 | 42.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 60 | 7633.27 | 32.28 | 50.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 60 | 9812.77 | 25.01 | 35.00 | 0 | 0 |

---

_Gerado automaticamente em 2/3/2025, 9:23:59 PM_
