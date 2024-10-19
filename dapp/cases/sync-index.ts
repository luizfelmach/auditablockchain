import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
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
  const hashes = docs.map((d) => hasher(d));
  const { root } = SimpleMerkleTree.of(hashes);
  await contract.store(index, root);
  console.log(`Merkle Root for '${index}': ${root}`);
}
