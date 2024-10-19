import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import { hasher } from "../helpers/hasher";
import { ElasticService } from "../services/elastic";
import { contract } from "../providers/rpc";

export async function proofDoc(index: string) {
  const docs = await ElasticService.getDocs(index);
  const hashes = docs.map((d) => hasher(d));
  const { root } = SimpleMerkleTree.of(hashes);
  const result = await contract.proof(index, root);
  console.log(result);
}
