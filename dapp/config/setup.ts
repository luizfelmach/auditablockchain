import { env } from "./env";

async function setup() {
  console.log(`elastic search: ${env.ES_HOST}`);
  console.log(`rpc node: ${env.RPC_NODE}`);
  console.log(`smart contract: ${env.SMART_CONTRACT}`);
  console.log();
}

setup();
