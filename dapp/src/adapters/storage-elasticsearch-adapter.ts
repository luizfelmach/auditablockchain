import { StorageOffChain } from "../domain/interface";
import elasticsearchHelper from "../helpers/elasticsearch-helper";

export class StorageElasticsearchAdapter implements StorageOffChain {
  async save(id: string, data: any[]): Promise<void> {
    const client = await elasticsearchHelper.client();

    const operations = data.flatMap((doc) => [{ index: { _index: id } }, doc]);

    const bulkResponse = await client.bulk({ refresh: true, operations });
  }

  async recover(id: string): Promise<any[]> {
    const client = await elasticsearchHelper.client();
    const documents: any[] = [];

    const result = await client.search({
      index: id,
      scroll: "1m",
      size: 100,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    let scrollId = result._scroll_id;
    let hits = result.hits.hits;

    documents.push(...hits);

    while (hits.length > 0) {
      const scrollResult = await client.scroll({
        scroll_id: scrollId,
        scroll: "1m",
      });

      scrollId = scrollResult._scroll_id;
      hits = scrollResult.hits.hits;

      documents.push(...hits);
    }

    return documents.map((d) => d._source);
  }
}
