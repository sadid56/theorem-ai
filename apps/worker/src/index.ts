import { buildWorkerServer } from "./server";

const PORT = Number(process.env.WORKER_PORT || 4001);
const HOST = process.env.WORKER_HOST || "0.0.0.0";

async function main() {
  const server = buildWorkerServer();
  try {
    await server.listen({ port: PORT, host: HOST });
    console.log(`Theorem AI Worker running on http://${HOST}:${PORT}`);
  } catch (err) {
    console.error("Worker startup error:", err);
    process.exit(1);
  }
}

main();
