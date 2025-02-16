import fs from "node:fs";
import autocannon from "autocannon";

const BASE_URL = "http://localhost:3001";
const DURATIONS = [30, 60]; // duração de cada teste em segundos
const CONNECTIONS = [50, 100, 250];
const TEST_KEYS = ["bruno"];
const IMPLEMENTATIONS = [
  { name: "SQLite (Disk)", route: "/sqlite-in-disk" },
  { name: "SQLite (Memory)", route: "/sqlite-in-memory" },
  { name: "Redis", route: "/redis" },
];

type BenchmarkResult = {
  implementation: string;
  route: string;
  method: string;
  key: string;
  connections: number;
  duration: number;
  requestsPerSecond: number;
  latencyAvg: number;
  latencyP99: number;
  errors: number;
  timeouts: number;
};

/**
 * Executa um teste de carga para uma rota específica e retorna os resultados.
 */
async function runBenchmark(
  implementation: string,
  route: string,
  method: "GET" | "POST",
  connections: number,
  duration: number,
  key: string,
  bodyData: object | null = null,
): Promise<BenchmarkResult> {
  const url =
    method === "GET" ? `${BASE_URL}${route}?${key}` : `${BASE_URL}${route}`;
  const result = await autocannon({
    url,
    connections,
    duration,
    method,
    ...(bodyData
      ? {
          body: JSON.stringify(bodyData),
          headers: { "Content-Type": "application/json" },
        }
      : {}),
  });

  return {
    implementation,
    route,
    method,
    key,
    connections,
    duration,
    requestsPerSecond: result.requests.average,
    latencyAvg: result.latency.average,
    latencyP99: result.latency.p99,
    errors: result.errors,
    timeouts: result.timeouts,
  };
}

/**
 * Executa os benchmarks de maneira sequencial para evitar sobrecarga excessiva no servidor.
 */
(async () => {
  console.log("🚀 Iniciando benchmark...");

  const benchmarkResults: BenchmarkResult[] = [];

  // Para cada implementação (SQLite em disco, SQLite em memória e Redis)
  for (const impl of IMPLEMENTATIONS) {
    for (const key of TEST_KEYS) {
      const postBody = {
        key,
        value: {
          nome: key.charAt(0).toUpperCase() + key.slice(1),
          sobrenome: "Teste",
          idade: Math.floor(Math.random() * 40) + 20,
        },
      };

      for (const connections of CONNECTIONS) {
        for (const duration of DURATIONS) {
          // Teste de armazenamento (POST)
          console.log(
            `🔄 Testando POST ${impl.name} - ${connections} conexões - ${duration} segundos...`,
          );
          const benchmarkPost = await runBenchmark(
            impl.name,
            impl.route,
            "POST",
            connections,
            duration,
            key,
            postBody,
          );
          benchmarkResults.push(benchmarkPost);
          console.log(
            `✅ POST Concluído - ${impl.name} - ${connections} conexões - ${duration} segundos`,
          );

          // Teste de leitura (GET)
          console.log(
            `🔄 Testando GET ${impl.name} - ${connections} conexões - ${duration} segundos...`,
          );
          const benchmarkGet = await runBenchmark(
            impl.name,
            impl.route,
            "GET",
            connections,
            duration,
            key,
          );
          benchmarkResults.push(benchmarkGet);
          console.log(
            `✅ GET Concluído - ${impl.name} - ${connections} conexões - ${duration} segundos`,
          );
        }
      }
    }
  }

  // Gera o relatório em Markdown
  const markdownContent = `# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via \`POST\` e consultados via \`GET\`, comparando as implementações de cache:

- **SQLite (Disco)**
- **SQLite (Memória)**
- **Redis**

## 📊 Resultados

| Implementação | Método | Rota               | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|--------------|--------|--------------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
${benchmarkResults
  .map(
    (r) =>
      `| ${r.implementation} | ${r.method} | ${r.route} | ${r.key} | ${r.connections} | ${r.duration} | ${r.requestsPerSecond.toFixed(
        2,
      )} | ${r.latencyAvg.toFixed(2)} | ${r.latencyP99.toFixed(
        2,
      )} | ${r.errors} | ${r.timeouts} |`,
  )
  .join("\n")}

---

_Gerado automaticamente em ${new Date().toLocaleString()}_
`;

  const fileName = `benchmark-results-${new Date().getTime()}.md`;
  fs.writeFileSync(fileName, markdownContent);
  console.log(`✅ Teste concluído! Resultados salvos em \`${fileName}\`.`);
})();
