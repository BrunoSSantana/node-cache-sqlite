# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via `POST` e consultados via `GET`, comparando as implementações de cache com SQLite e Redis.

## 📊 Resultados

| Implementação | Método | Rota         | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|---------------|--------|--------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
| SQLite | POST | /sqlite | bruno | 50 | 30 | 3873.80 | 12.40 | 31.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 30 | 4826.27 | 9.86 | 22.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 50 | 60 | 3225.84 | 15.00 | 31.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 60 | 5500.54 | 8.59 | 17.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 100 | 30 | 3295.47 | 29.84 | 51.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 100 | 30 | 5495.20 | 17.70 | 26.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 100 | 60 | 3188.90 | 30.86 | 57.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 100 | 60 | 5178.94 | 18.81 | 32.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 250 | 30 | 3289.00 | 75.47 | 105.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 250 | 30 | 5092.40 | 48.60 | 81.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 250 | 60 | 3030.07 | 81.87 | 122.00 | 2 | 2 |
| SQLite | GET | /sqlite | bruno | 250 | 60 | 4984.65 | 49.65 | 74.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 30 | 7626.80 | 6.06 | 10.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 30 | 10123.21 | 4.45 | 8.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 60 | 5466.27 | 8.66 | 28.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 60 | 8521.12 | 5.37 | 16.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 30 | 8123.47 | 11.82 | 18.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 30 | 10614.94 | 8.92 | 14.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 60 | 8278.60 | 11.58 | 16.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 60 | 10798.27 | 8.76 | 13.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 30 | 8224.94 | 29.93 | 55.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 30 | 10539.27 | 23.25 | 40.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 60 | 8644.90 | 28.45 | 42.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 60 | 10883.07 | 22.49 | 33.00 | 0 | 0 |

---

_Gerado automaticamente em 2/3/2025, 7:48:57 PM_
