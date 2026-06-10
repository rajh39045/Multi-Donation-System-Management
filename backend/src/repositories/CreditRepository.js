import BaseRepository from './BaseRepository.js';
import CreditHistory from '../models/CreditHistory.js';

class CreditRepository extends BaseRepository {
  constructor() {
    super(CreditHistory);
  }
}

export default new CreditRepository();
