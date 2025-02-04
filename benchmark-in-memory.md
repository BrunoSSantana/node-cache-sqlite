# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via `POST` e consultados via `GET`, comparando as implementações de cache com SQLite e Redis.

## 📊 Resultados

| Implementação | Método | Rota         | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|---------------|--------|--------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
| SQLite | POST | /sqlite | bruno | 50 | 30 | 4867.94 | 9.76 | 26.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 30 | 6214.27 | 7.55 | 20.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 50 | 60 | 4664.30 | 10.21 | 22.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 60 | 7069.40 | 6.58 | 14.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 100 | 30 | 4683.84 | 20.85 | 39.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 100 | 30 | 7099.74 | 13.60 | 21.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 100 | 60 | 4752.79 | 20.54 | 36.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 100 | 60 | 7046.60 | 13.70 | 21.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 250 | 30 | 4027.34 | 61.58 | 148.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 250 | 30 | 6454.00 | 38.26 | 75.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 250 | 60 | 3732.84 | 66.45 | 151.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 250 | 60 | 6376.07 | 38.72 | 73.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 30 | 8044.67 | 5.71 | 14.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 30 | 11692.80 | 3.78 | 8.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 60 | 8290.71 | 5.52 | 12.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 60 | 11928.94 | 3.70 | 7.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 30 | 9328.54 | 10.22 | 16.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 30 | 12098.87 | 7.76 | 17.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 60 | 8309.07 | 11.54 | 22.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 60 | 12280.77 | 7.64 | 13.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 30 | 9192.14 | 26.72 | 52.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 30 | 13275.20 | 18.35 | 25.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 60 | 9673.30 | 25.36 | 36.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 60 | 13488.54 | 18.05 | 28.00 | 0 | 0 |

---

_Gerado automaticamente em 2/3/2025, 8:56:38 PM_
