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
 * Analisa os resultados e encontra a melhor implementação com base no desempenho.
 */
function analyzeResults(results: BenchmarkResult[]): string {
  const groupedByImplementation = results.reduce((acc, result) => {
    if (!acc[result.implementation]) acc[result.implementation] = [];
    acc[result.implementation].push(result);
    return acc;
  }, {} as Record<string, BenchmarkResult[]>);

  let bestThroughput = { implementation: "", reqPerSec: 0 };
  let bestLatency = { implementation: "", avgLatency: Infinity };
  let errorCounts = {} as Record<string, number>;
  let timeoutCounts = {} as Record<string, number>;

  for (const [implementation, tests] of Object.entries(
    groupedByImplementation,
  )) {
    const avgReqPerSec =
      tests.reduce((sum, r) => sum + r.requestsPerSecond, 0) / tests.length;
    const avgLatency =
      tests.reduce((sum, r) => sum + r.latencyAvg, 0) / tests.length;
    const totalErrors = tests.reduce((sum, r) => sum + r.errors, 0);
    const totalTimeouts = tests.reduce((sum, r) => sum + r.timeouts, 0);

    if (avgReqPerSec > bestThroughput.reqPerSec) {
      bestThroughput = { implementation, reqPerSec: avgReqPerSec };
    }
    if (avgLatency < bestLatency.avgLatency) {
      bestLatency = { implementation, avgLatency };
    }

    errorCounts[implementation] = totalErrors;
    timeoutCounts[implementation] = totalTimeouts;
  }

  // Calcula quanto % mais rápido foi
  const fastestReqPerSec = bestThroughput.reqPerSec;
  const improvements = Object.entries(groupedByImplementation)
    .map(([implementation, tests]) => {
      const avgReqPerSec =
        tests.reduce((sum, r) => sum + r.requestsPerSecond, 0) / tests.length;
      const improvement = ((fastestReqPerSec - avgReqPerSec) / avgReqPerSec) * 100;
      if(improvement === 0) return null
      return `- **${implementation}**: ${improvement.toFixed(2)}% mais lento`;
    }).filter(Boolean)
    .join("\n");

  return `
## 🏆 Análise de Resultados

- **Maior Throughput (req/s)**: ${bestThroughput.implementation} (${bestThroughput.reqPerSec.toFixed(2)} req/s)
- **Menor Latência Média**: ${bestLatency.implementation} (${bestLatency.avgLatency.toFixed(2)} ms)
- **Comparação de Velocidade**:
${improvements}

## ⚠️ Resumo de Falhas
${Object.entries(errorCounts)
  .map(([impl, count]) => `- **${impl}**: ${count} erros`)
  .join("\n")}
${Object.entries(timeoutCounts)
  .map(([impl, count]) => `- **${impl}**: ${count} timeouts`)
  .join("\n")}
  `;
}

/**
 * Executa os benchmarks e gera o relatório.
 */
(async () => {
  console.log("🚀 Iniciando benchmark...");

  const benchmarkResults: BenchmarkResult[] = [];

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
        }
      }
    }
  }

  const analysis = analyzeResults(benchmarkResults);

  const markdownContent = `# 🚀 Benchmark de Performance

Este teste compara as implementações de cache:

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

${analysis}

---

_Gerado automaticamente em ${new Date().toLocaleString()}_
`;

  fs.writeFileSync(`benchmark-results-${Date.now()}.md`, markdownContent);
  console.log("✅ Teste concluído! Resultados salvos.");
})();
