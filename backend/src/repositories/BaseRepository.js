class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async find(query = {}, options = {}) {
    const { sort = { createdAt: -1 }, limit = 10, skip = 0, populate = '' } = options;
    return await this.model.find(query).sort(sort).limit(limit).skip(skip).populate(populate);
  }

  async findOne(query, populate = '') {
    return await this.model.findOne(query).populate(populate);
  }

  async findById(id, populate = '') {
    return await this.model.findById(id).populate(populate);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async count(query = {}) {
    return await this.model.countDocuments(query);
  }
}

export default BaseRepository;
