import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const dbURL = process.env.MONGO_URI;

app.get('/', async (req, res) => {
  res.send("Hello, This is backend.");
});

app.use(express.json());
app.use(cors());
app.use('/api/user', userRoutes);

mongoose.connect(dbURL)
  .then(() => console.log('✅ MongoDB connected Successfully!'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
