import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import { Fingerprint, Hasher } from "../domain/interface";

export class MerkleTreeAdapter implements Fingerprint {
  constructor(private readonly hasher: Hasher) {}

  get(data: any[]): string {
    const hashes = data.map((d) => this.hasher.hash(d));
    const { root } = SimpleMerkleTree.of(hashes);
    return root;
  }
}
