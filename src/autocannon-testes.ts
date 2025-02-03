import fs from "node:fs";
import autocannon from "autocannon";

const BASE_URL = "http://localhost:3000"; // Altere conforme necessário
const DURATIONS = [30, 60]; // Testes com diferentes tempos (segundos)
const CONNECTIONS = [50, 200, 500]; // Testes com diferentes quantidades de conexões
const TEST_KEYS = ["bruno", "ana", "joao", "maria"]; // Simulando diferentes usuários

type BenchmarkResult = {
  route: string;
  method: string;
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
  route: string,
  method,
  connections: number,
  duration: number,
  bodyData: object | null = null
): Promise<BenchmarkResult> {
  const isPost = method === "POST";
  const result = await autocannon({
    url: `${BASE_URL}${route}`,
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
    route,
    method,
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
 * Executa os benchmarks simulando um cenário real de armazenamento e leitura de dados.
 */
(async () => {
  console.log("🚀 Iniciando benchmark...");

  const benchmarkPromises: Promise<BenchmarkResult>[] = [];

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
        benchmarkPromises.push(runBenchmark("/", "POST", connections, duration, postBody));

        // Teste de leitura de valores (GET)
        benchmarkPromises.push(runBenchmark(`/?${key}`, "GET", connections, duration));
      }
    }
  }

  const results = await Promise.all(benchmarkPromises);

  // Gera o conteúdo do arquivo Markdown
  const markdownContent = `# 🚀 Benchmark de Performance

Este teste simula um cenário realista onde valores são armazenados via \`POST\` e consumidos via \`GET\`.

## 📊 Resultados

| Método | Rota  | Chave | Conexões | Duração (s) | Req/s  | Latência Média (ms) | p99 (ms) | Erros | Timeouts |
|--------|-------|--------|----------|------------|--------|---------------------|----------|-------|----------|
${results
    .map(
      (r) =>
        `| ${r.method} | ${r.route} | ${r.route.includes('?') ? r.route.split('?')[1] : '-'} | ${r.connections} | ${r.duration} | ${r.requestsPerSecond.toFixed(2)} | ${r.latencyAvg.toFixed(2)} | ${r.latencyP99.toFixed(2)} | ${r.errors} | ${r.timeouts} |`
    )
    .join("\n")}

---

_Gerado automaticamente em ${new Date().toLocaleString()}_
`;

  // Salva os resultados em um arquivo Markdown
  fs.writeFileSync("benchmark-results.md", markdownContent);

  console.log("✅ Teste concluído! Resultados salvos em `benchmark-results.md`.");
})();
