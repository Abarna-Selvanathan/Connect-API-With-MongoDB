const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./Routes/root');
const MONGO_URI = "mongodb+srv://Abarna:abarna07@cluster0.pa7ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));
app.use('/api', orderRoutes);
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
}); 