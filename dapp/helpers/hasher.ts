import { keccak256, toUtf8Bytes } from "ethers";

function hasher(data: unknown) {
  return keccak256(toUtf8Bytes(JSON.stringify(data)));
}

export { hasher };
