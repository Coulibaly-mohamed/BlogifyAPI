// data/db.js
import { config } from "dotenv";
config();

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/nomdeladb');
    console.log('✅ Connexion à MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }
};

export default connectDB;
