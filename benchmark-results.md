# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via `POST` e consultados via `GET`, comparando as implementações de cache com SQLite e Redis.

## 📊 Resultados

| Implementação | Método | Rota         | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|---------------|--------|--------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
| SQLite | POST | /sqlite | bruno | 50 | 30 | 78.34 | 645.00 | 1564.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 30 | 78.34 | 644.93 | 1555.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 50 | 60 | 120.84 | 414.42 | 1132.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 50 | 60 | 120.84 | 414.42 | 1137.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 200 | 30 | 313.34 | 640.86 | 1527.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 200 | 30 | 313.34 | 639.29 | 1511.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 200 | 60 | 484.57 | 413.02 | 862.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 200 | 60 | 483.34 | 413.28 | 865.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 500 | 30 | 776.37 | 640.77 | 1565.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 500 | 30 | 766.67 | 642.39 | 1626.00 | 0 | 0 |
| SQLite | POST | /sqlite | bruno | 500 | 60 | 1211.74 | 412.56 | 914.00 | 0 | 0 |
| SQLite | GET | /sqlite | bruno | 500 | 60 | 1208.34 | 413.14 | 896.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 30 | 0.00 | 0.00 | 0.00 | 150 | 150 |
| Redis | GET | /redis | bruno | 50 | 30 | 0.00 | 0.00 | 0.00 | 150 | 150 |
| Redis | POST | /redis | bruno | 50 | 60 | 0.00 | 0.00 | 0.00 | 300 | 300 |
| Redis | GET | /redis | bruno | 50 | 60 | 0.00 | 0.00 | 0.00 | 300 | 300 |
| Redis | POST | /redis | bruno | 200 | 30 | 0.00 | 0.00 | 0.00 | 600 | 600 |
| Redis | GET | /redis | bruno | 200 | 30 | 0.00 | 0.00 | 0.00 | 420 | 420 |
| Redis | POST | /redis | bruno | 200 | 60 | 0.00 | 0.00 | 0.00 | 1200 | 1200 |
| Redis | GET | /redis | bruno | 200 | 60 | 0.00 | 0.00 | 0.00 | 1067 | 1067 |
| Redis | POST | /redis | bruno | 500 | 30 | 0.00 | 0.00 | 0.00 | 1000 | 1000 |
| Redis | GET | /redis | bruno | 500 | 30 | 0.00 | 0.00 | 0.00 | 1190 | 1190 |
| Redis | POST | /redis | bruno | 500 | 60 | 0.00 | 0.00 | 0.00 | 2500 | 2500 |
| Redis | GET | /redis | bruno | 500 | 60 | 0.52 | 1280.62 | 9929.00 | 2500 | 2500 |

---

_Gerado automaticamente em 2/3/2025, 8:29:39 AM_
