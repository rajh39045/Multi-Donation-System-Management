import BaseRepository from './BaseRepository.js';
import Organization from '../models/Organization.js';

class OrganizationRepository extends BaseRepository {
  constructor() {
    super(Organization);
  }
}

export default new OrganizationRepository();
