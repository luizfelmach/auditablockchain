import { BaseContract, JsonRpcProvider, Provider, Wallet } from "ethers";
import { env } from "../config/env";
import { Auditability } from "../../contracts/typechain-types";

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "index",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "proof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "index",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const provider = new JsonRpcProvider(env.RPC_NODE);

export const signer = new Wallet(env.PRIVATE_KEY, provider);

export const contract = new BaseContract(
  env.SMART_CONTRACT,
  abi,
  signer
) as Auditability;
