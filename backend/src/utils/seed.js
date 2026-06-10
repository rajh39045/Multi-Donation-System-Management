import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Reward from '../models/Reward.js';
import Organization from '../models/Organization.js';
import connectDB from '../config/db.js';

dotenv.config();

const rewards = [
  {
    name: 'Premium Donor Badge',
    description: 'A special badge displayed on your profile for 30 days.',
    cost: 50,
  },
  {
    name: 'Eco-friendly Tote Bag',
    description: 'A reusable tote bag made from sustainable materials.',
    cost: 100,
  },
  {
    name: 'Impact Report PDF',
    description: 'A detailed report of how your donations have helped.',
    cost: 20,
  },
  {
    name: 'Surprise Gift Box',
    description: 'A curated box of items from our partners.',
    cost: 500,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Reward.deleteMany();
    await Organization.deleteMany();

    console.log('Data Cleared...');

    // Seed Rewards
    await Reward.insertMany(rewards);
    console.log('Rewards Seeded...');

    // Seed Admin
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@muti.com',
      password: 'password123',
      role: 'admin',
    });
    console.log('Admin Created...');

    // Seed Organization Owner
    const orgOwner = await User.create({
      name: 'NGO Owner',
      email: 'org@muti.com',
      password: 'password123',
      role: 'organization',
    });
    console.log('Org Owner Created...');

    // Seed Organization
    await Organization.create({
      name: 'Global Welfare Foundation',
      email: 'contact@globalwelfare.org',
      phone: '+1234567890',
      address: '123 Charity Lane, Hope City',
      description: 'Working towards a better future for everyone.',
      ownerId: orgOwner._id,
      isVerified: true,
    });
    console.log('Organization Created...');

    // Seed Volunteer
    await User.create({
      name: 'John Volunteer',
      email: 'volunteer@muti.com',
      password: 'password123',
      role: 'volunteer',
      phone: '9876543210'
    });
    console.log('Volunteer Created...');

    // Seed Donor
    await User.create({
      name: 'Jane Donor',
      email: 'donor@muti.com',
      password: 'password123',
      role: 'donor',
      credits: 100
    });
    console.log('Donor Created...');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
