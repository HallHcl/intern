// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // ✅ ใช้ axios สำหรับ fetch ข่าว
const ITStaff = require('./models/ITStaff');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection (ลบ options ที่เลิกใช้)
mongoose.connect('mongodb+srv://hallkong:741852963@cluster0.cez7m.mongodb.net/IT?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  // 📌 Proxy API ดึงข่าวจาก GNews (แก้ปัญหา CORS)
const API_KEY = "39626ec4ce97256e3c86baf2bb1b9552";
const BASE_URL = "https://gnews.io/api/v4/search";

app.get("/api/news", async (req, res) => {
    try {
      const { q = "technology" } = req.query;
      const response = await axios.get(`${BASE_URL}?q=${q}&token=${API_KEY}&lang=th`);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Error fetching news" });
    }
});

// API endpoint to get IT staff list
app.get('/api/it-staff', async (req, res) => {
  try {
    const staff = await ITStaff.find();
    res.json(staff);
  } catch (error) {
    console.error('Error fetching IT staff:', error);
    res.status(500).send('Error fetching IT staff');
  }
});

// POST endpoint for adding new IT staff
app.post('/api/it-staff', async (req, res) => {
  const { firstName, lastName, position, phone, email, profilePic } = req.body;

  if (!firstName || !lastName || !position || !phone || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newStaff = new ITStaff({
      firstName,
      lastName,
      position,
      phone,
      email,
      profilePic
    });

    await newStaff.save();
    res.status(201).json({ message: 'IT staff added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding staff' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
