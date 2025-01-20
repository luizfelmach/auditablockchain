import { hasher } from "../helpers/hasher";
import { ElasticService } from "../services/elastic";
import { contract } from "../providers/rpc";

export async function proofDoc(index: string) {
  const docs = await ElasticService.getDocs(index);
  const raw = docs.map((item) => JSON.stringify(item)).join("");
  const hash = hasher(raw);
  const result = await contract.proof(index, hash);
  console.log(result);
}
