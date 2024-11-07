export interface StorageOffChain {
  save(id: string, data: any[]): Promise<void>;
  recover(id: string): Promise<any[]>;
}

export interface StorageOnChain {
  save(id: string, fingerprint: string): Promise<void>;
  validate(id: string, hash: string): Promise<boolean>;
}

export interface Fingerprint {
  get(data: any[]): string;
}

export interface Hasher {
  hash(data: any): string;
}

export type Message = {
  data: any[];
  ack: () => void;
};

export type Callback = (message: Message) => void;

export interface Queue {
  consume(callback: Callback): Promise<void>;
}

export interface MessageProcessor {
  handle(messages: Message[]): Promise<void>;
}
