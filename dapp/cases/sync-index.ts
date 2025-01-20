import { ElasticService } from "../services/elastic";
import { hasher } from "../helpers/hasher";
import { IndexNotFoundError } from "../helpers/error";
import { contract } from "../providers/rpc";

export async function syncIndex(index: string) {
  const exists = await ElasticService.indexExists(index);
  if (!exists) {
    throw new IndexNotFoundError();
  }
  const docs = await ElasticService.getDocs(index); // Will the docs always return in the same order ???
  const raw = docs.map((item) => JSON.stringify(item)).join("");
  const hash = hasher(raw);
  await contract.store(index, hash);
  console.log(`Fingerprint for '${index}': ${hash}`);
}
