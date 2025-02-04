## 📌 **Reavaliação da Comparação: SQLite vs Redis**
1. **SQLite tem um impacto significativo quando sai da memória**:
   - No primeiro teste (em memória), o SQLite apresentava **requisições por segundo (Req/s) significativamente mais altas**.
   - No segundo teste (provavelmente usando disco), o desempenho **caiu drasticamente**.
   - Exemplo: Para **250 conexões e 60s**, o SQLite caiu de **3,732 Req/s (POST) e 6,376 Req/s (GET)** para **2,563 Req/s (POST) e 4,149 Req/s (GET)**.

2. **A latência do SQLite aumentou muito**:
   - A latência média **dobrou ou mais** em vários casos, especialmente com alto volume de conexões.
   - O **p99 (percentil 99) do SQLite no POST de 250 conexões por 60s foi de 211ms!**, contra **151ms no primeiro teste**.
   - Isso **confirma que o SQLite não está conseguindo lidar bem com I/O de disco**, enquanto o Redis se mantém mais estável.

3. **O SQLite é competitivo somente em memória**:
   - No primeiro teste, o SQLite teve desempenho **aceitável**, apesar de **inferior ao Redis**.
   - No segundo teste, a dependência do disco tornou o **SQLite muito mais lento e instável**.
   - O impacto é especialmente grande **quando as conexões aumentam**.

---

### ✅ **Conclusão Consolidada**
- **SQLite pode ser competitivo apenas se rodar inteiramente em memória** (`:memory:` ou `PRAGMA journal_mode=OFF`).
- **Se precisar gravar no disco, o SQLite não escala bem e perde feio para o Redis**, especialmente com alta concorrência.
- **Redis é a escolha ideal para cache** devido à **baixa latência e estabilidade, independente do número de conexões**.
- **Se o SQLite for usado como cache, ele deve ser otimizado para rodar em memória** para evitar gargalos de I/O.