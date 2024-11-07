import { Keccak256Adapter } from "../adapters/keccak256-adapter";
import { MerkleTreeAdapter } from "../adapters/merkle-tree-adapter";
import { StorageElasticsearchAdapter } from "../adapters/storage-elasticsearch-adapter";
import { StorageEthereumAdapter } from "../adapters/storage-ethereum-adapter";
import { SyncData } from "../domain/sync-data";

export const SyncDataFactory = () => {
  const hasher = new Keccak256Adapter();
  const storageOnChain = new StorageEthereumAdapter();
  const storageOffChain = new StorageElasticsearchAdapter();
  const fingerprint = new MerkleTreeAdapter(hasher);
  return new SyncData(storageOnChain, storageOffChain, fingerprint);
};
