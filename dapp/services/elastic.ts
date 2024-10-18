import { elastic } from "../providers/elastic";

export class ElasticService {
  static async indexExists(index: string) {
    return await elastic.indices.exists({ index });
  }

  static async doc(index: string, id: string): Promise<unknown | null> {
    try {
      const doc = await elastic.get({
        index,
        id,
      });
      return doc._source;
    } catch (err) {
      return null;
    }
  }

  static async getDocs(index: string) {
    const documents: any[] = [];

    const result = await elastic.search({
      index,
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
      const scrollResult = await elastic.scroll({
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
