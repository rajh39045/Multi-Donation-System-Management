import BaseRepository from './BaseRepository.js';
import Donation from '../models/Donation.js';

class DonationRepository extends BaseRepository {
  constructor() {
    super(Donation);
  }
}

export default new DonationRepository();
