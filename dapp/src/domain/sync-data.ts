import { Fingerprint, StorageOffChain, StorageOnChain } from "./interface";

export class SyncData {
  constructor(
    private readonly storageOnChain: StorageOnChain,
    private readonly storageOffChain: StorageOffChain,
    private readonly fingerprint: Fingerprint
  ) {}

  async perform(id: string, data: any[]) {
    const fingerprint = this.fingerprint.get(data);
    await this.storageOnChain.save(id, fingerprint);
    await this.storageOffChain.save(id, data);
  }
}
