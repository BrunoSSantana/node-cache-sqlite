# 🚀 Benchmark de Performance

Este teste compara as implementações de cache:

- **SQLite (Disco)**
- **SQLite (Memória)**
- **Redis**

## 📊 Resultados

| Implementação | Método | Rota               | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|--------------|--------|--------------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
| SQLite (Disk) | POST | /sqlite-in-disk | bruno | 50 | 30 | 2845.87 | 17.07 | 37.00 | 0 | 0 |
| SQLite (Disk) | GET | /sqlite-in-disk | bruno | 50 | 30 | 4816.87 | 9.86 | 22.00 | 0 | 0 |
| SQLite (Disk) | POST | /sqlite-in-disk | bruno | 50 | 60 | 3038.75 | 15.95 | 32.00 | 0 | 0 |
| SQLite (Disk) | GET | /sqlite-in-disk | bruno | 50 | 60 | 4661.77 | 10.21 | 22.00 | 0 | 0 |
| SQLite (Disk) | POST | /sqlite-in-disk | bruno | 100 | 30 | 3147.67 | 31.26 | 57.00 | 0 | 0 |
| SQLite (Disk) | GET | /sqlite-in-disk | bruno | 100 | 30 | 4892.30 | 19.94 | 39.00 | 0 | 0 |
| SQLite (Disk) | POST | /sqlite-in-disk | bruno | 100 | 60 | 2324.04 | 42.52 | 90.00 | 0 | 0 |
| SQLite (Disk) | GET | /sqlite-in-disk | bruno | 100 | 60 | 3787.44 | 25.90 | 49.00 | 0 | 0 |
| SQLite (Disk) | POST | /sqlite-in-disk | bruno | 250 | 30 | 1816.90 | 136.88 | 243.00 | 0 | 0 |
| SQLite (Disk) | GET | /sqlite-in-disk | bruno | 250 | 30 | 3493.80 | 71.05 | 146.00 | 0 | 0 |
| SQLite (Disk) | POST | /sqlite-in-disk | bruno | 250 | 60 | 2016.62 | 120.46 | 247.00 | 36 | 36 |
| SQLite (Disk) | GET | /sqlite-in-disk | bruno | 250 | 60 | 3571.70 | 69.49 | 114.00 | 0 | 0 |
| SQLite (Memory) | POST | /sqlite-in-memory | bruno | 50 | 30 | 2081.00 | 23.51 | 50.00 | 0 | 0 |
| SQLite (Memory) | GET | /sqlite-in-memory | bruno | 50 | 30 | 3814.14 | 12.60 | 31.00 | 0 | 0 |
| SQLite (Memory) | POST | /sqlite-in-memory | bruno | 50 | 60 | 3198.97 | 15.12 | 30.00 | 0 | 0 |
| SQLite (Memory) | GET | /sqlite-in-memory | bruno | 50 | 60 | 3053.82 | 15.88 | 46.00 | 0 | 0 |
| SQLite (Memory) | POST | /sqlite-in-memory | bruno | 100 | 30 | 2062.84 | 48.02 | 119.00 | 0 | 0 |
| SQLite (Memory) | GET | /sqlite-in-memory | bruno | 100 | 30 | 3838.57 | 25.54 | 64.00 | 0 | 0 |
| SQLite (Memory) | POST | /sqlite-in-memory | bruno | 100 | 60 | 1982.02 | 49.94 | 90.00 | 0 | 0 |
| SQLite (Memory) | GET | /sqlite-in-memory | bruno | 100 | 60 | 3690.67 | 26.60 | 57.00 | 0 | 0 |
| SQLite (Memory) | POST | /sqlite-in-memory | bruno | 250 | 30 | 2662.70 | 93.34 | 187.00 | 0 | 0 |
| SQLite (Memory) | GET | /sqlite-in-memory | bruno | 250 | 30 | 4661.80 | 53.13 | 88.00 | 0 | 0 |
| SQLite (Memory) | POST | /sqlite-in-memory | bruno | 250 | 60 | 2979.57 | 83.14 | 136.00 | 4 | 4 |
| SQLite (Memory) | GET | /sqlite-in-memory | bruno | 250 | 60 | 5243.30 | 47.17 | 58.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 30 | 7770.60 | 5.94 | 9.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 30 | 7886.07 | 5.84 | 13.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 50 | 60 | 7185.10 | 6.46 | 14.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 50 | 60 | 8107.67 | 5.67 | 14.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 30 | 6824.14 | 14.16 | 29.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 30 | 9190.87 | 10.38 | 21.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 100 | 60 | 7055.47 | 13.67 | 24.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 100 | 60 | 8320.80 | 11.52 | 21.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 30 | 6918.27 | 35.66 | 55.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 30 | 8603.47 | 28.58 | 42.00 | 0 | 0 |
| Redis | POST | /redis | bruno | 250 | 60 | 6992.94 | 35.29 | 56.00 | 0 | 0 |
| Redis | GET | /redis | bruno | 250 | 60 | 9973.17 | 24.58 | 36.00 | 0 | 0 |


## 🏆 Análise de Resultados

- **Maior Throughput (req/s)**: Redis (7902.38 req/s)
- **Menor Latência Média**: Redis (16.48 ms)
- **Comparação de Velocidade**:
- **SQLite (Disk)**: 134.64% mais lento
- **SQLite (Memory)**: 141.48% mais lento

## ⚠️ Resumo de Falhas
- **SQLite (Disk)**: 36 erros
- **SQLite (Memory)**: 4 erros
- **Redis**: 0 erros
- **SQLite (Disk)**: 36 timeouts
- **SQLite (Memory)**: 4 timeouts
- **Redis**: 0 timeouts

---

_Gerado automaticamente em 2/16/2025, 1:13:57 PM_
