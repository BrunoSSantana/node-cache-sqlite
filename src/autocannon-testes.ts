import fs from "node:fs";
import autocannon from "autocannon";

const BASE_URL = "http://localhost:3001";
const DURATIONS = [30, 60]; // duração de cada teste em segundos
const CONNECTIONS = [50, 100, 250];
const TEST_KEYS = ["bruno"];
const IMPLEMENTATIONS = [
  { name: "SQLite", route: "/sqlite" },
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
  method,
  connections: number,
  duration: number,
  key: string,
  bodyData: object | null = null,
): Promise<BenchmarkResult> {
  const isPost = method === "POST";
  const url =
    method === "GET" ? `${BASE_URL}${route}?${key}` : `${BASE_URL}${route}`;
  const result = await autocannon({
    url,
    connections,
    duration,
    method,
    ...(isPost
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
 * Executa os benchmarks simulando um cenário realista de armazenamento e leitura de dados,
 * para ambas as implementações: SQLite e Redis.
 */
(async () => {
  console.log("🚀 Iniciando benchmark...");

  const benchmarkPromises: BenchmarkResult[] = [];

  // Para cada implementação (SQLite e Redis)
  for (const impl of IMPLEMENTATIONS) {
    // Para cada chave de teste
    for (const key of TEST_KEYS) {
      const postBody = {
        key,
        value: {
          nome: key.charAt(0).toUpperCase() + key.slice(1), // Capitaliza o nome
          sobrenome: "Teste",
          idade: Math.floor(Math.random() * 40) + 20, // Gera uma idade aleatória entre 20 e 60
        },
      };

      for (const connections of CONNECTIONS) {
        for (const duration of DURATIONS) {
          // Teste de registro de valores (POST)
          const benchmarkResultPost = await runBenchmark(
            impl.name,
            impl.route,
            "POST",
            connections,
            duration,
            key,
            postBody,
          );
          benchmarkPromises.push(benchmarkResultPost);
          console.log(
            `✅ Teste concluído! - POST ${impl.name} - ${key} - ${connections} conexões - ${duration} segundos`,
          );

          // Teste de leitura de valores (GET)
          const benchmarkResultGet = await runBenchmark(
            impl.name,
            impl.route,
            "GET",
            connections,
            duration,
            key,
          );
          benchmarkPromises.push(benchmarkResultGet);
          console.log(
            `✅ Teste concluído! - GET ${impl.name} - ${key} - ${connections} conexões - ${duration} segundos`,
          );
        }
      }
    }
  }

  const results = await Promise.all(benchmarkPromises);

  // Gera o conteúdo do arquivo Markdown com os resultados dos benchmarks
  const markdownContent = `# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via \`POST\` e consultados via \`GET\`, comparando as implementações de cache com SQLite e Redis.

## 📊 Resultados

| Implementação | Método | Rota         | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|---------------|--------|--------------|-------|----------|-------------|--------|---------------------|----------|-------|----------|
${results
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

  // Salva os resultados em um arquivo Markdown
  fs.writeFileSync(
    `benchmark-results-${new Date().getTime()}.md`,
    markdownContent,
  );

  console.log(
    "✅ Teste concluído! Resultados salvos em `benchmark-results.md`.",
  );
})();
