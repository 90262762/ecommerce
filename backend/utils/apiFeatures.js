export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'keyword'];
    excludedFields.forEach((field) => delete queryObj[field]);

    if (queryObj.category) queryObj.category = queryObj.category;
    this.query = this.query.find(queryObj);
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({
        name: { $regex: this.queryString.keyword, $options: 'i' },
      });
    }
    return this;
  }

  paginate(resultPerPage = 8) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
