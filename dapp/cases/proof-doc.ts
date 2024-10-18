import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import { DocNotFoundError } from "../helpers/error";
import { hasher } from "../helpers/hasher";
import { ElasticService } from "../services/elastic";

export async function proofDoc(index: string, id: string) {
  const doc = await ElasticService.doc(index, id);
  if (!doc) {
    throw new DocNotFoundError();
  }
  const hash = hasher(doc);
  const docs = await ElasticService.getDocs(index);
  const hashes = docs.map((d) => hasher(d));
  const merkle = SimpleMerkleTree.of(hashes);
  const pos = hashes.indexOf(hash);
  const proof = merkle.getProof(pos);
  console.log({
    root: merkle.root,
    hash,
    proof,
  });

  // TODO: get response from smart contracts with index, hash and proof
}

// proofDoc("log-2024.10.17.16.14", "YhNCm5IBGFhC3YblzXrZ");
