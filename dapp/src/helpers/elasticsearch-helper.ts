import { Client } from "@elastic/elasticsearch";
import { config } from "../main/config";

const { uri, apiKey } = config.elastisearch;

export default {
  _client: null as unknown as Client,

  async connect() {
    this._client = new Client({ node: uri, auth: { apiKey } });
  },

  async client() {
    if (!this._client) await this.connect();
    return this._client;
  },
};
