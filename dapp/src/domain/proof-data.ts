import { Fingerprint, StorageOffChain, StorageOnChain } from "./interface";

export class ProofData {
  constructor(
    private readonly storageOnChain: StorageOnChain,
    private readonly storageOffChain: StorageOffChain,
    private readonly fingerprint: Fingerprint
  ) {}

  async perform(id: string) {
    const data = await this.storageOffChain.recover(id);
    const fingerprint = this.fingerprint.get(data);
    const result = await this.storageOnChain.validate(id, fingerprint);
    return result;
  }
}
