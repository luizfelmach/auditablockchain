import { keccak256, toUtf8Bytes } from "ethers";
import { Hasher } from "../domain/interface";

export class Keccak256Adapter implements Hasher {
  hash(data: any): string {
    return keccak256(toUtf8Bytes(JSON.stringify(data)));
  }
}
