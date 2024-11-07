import { Keccak256Adapter } from "../adapters/keccak256-adapter";
import { MerkleTreeAdapter } from "../adapters/merkle-tree-adapter";
import { StorageElasticsearchAdapter } from "../adapters/storage-elasticsearch-adapter";
import { StorageEthereumAdapter } from "../adapters/storage-ethereum-adapter";
import { ProofData } from "../domain/proof-data";

export const ProofDataFactory = () => {
  const hasher = new Keccak256Adapter();
  const storageOnChain = new StorageEthereumAdapter();
  const storageOffChain = new StorageElasticsearchAdapter();
  const fingerprint = new MerkleTreeAdapter(hasher);
  return new ProofData(storageOnChain, storageOffChain, fingerprint);
};
