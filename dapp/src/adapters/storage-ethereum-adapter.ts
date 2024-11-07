import { StorageOnChain } from "../domain/interface";

export class StorageEthereumAdapter implements StorageOnChain {
  async save(id: string, fingerprint: string): Promise<void> {
    console.log("Salvando na blockchain");
  }

  async validate(id: string, hash: string): Promise<boolean> {
    return true;
  }
}
