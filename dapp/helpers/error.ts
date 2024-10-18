export class IndexNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Index not founded in database");
    this.name = this.constructor.name;
  }
}

export class DocNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Index or document not founded in database");
    this.name = this.constructor.name;
  }
}
