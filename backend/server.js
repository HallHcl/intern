// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // ✅ ใช้ axios สำหรับ fetch ข่าว
const ITStaff = require('./models/ITStaff');
const Ticket = require('./models/Ticket'); // เพิ่มบรรทัดนี้เพื่อ import Ticket model
const User = require('./models/User'); // Uncomment this line
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const app = express();
const port = 5000;

dotenv.config();

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
const API_KEY = "94853facc0e74c1d96a16e60ee0d5268";
const BASE_URL = 'https://newsapi.org/v2/everything';

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);  // ส่งข้อมูล ticket กลับไปยัง frontend
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets', error: err });
  }
});

// POST endpoint to create a ticket
app.post('/api/tickets', async (req, res) => {
  const { branchCode, anydeskNumber, details, issueType } = req.body;

  // Validate required fields
  if (!branchCode || !details || !issueType) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  // Create new ticket object
  const newTicket = new Ticket({
    branchCode,
    anydeskNumber,
    details,
    issueType
  });

  try {
    // Save ticket to database
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully' });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง ticket' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const { q = 'ไอที' } = req.query;
    const response = await axios.get(BASE_URL, {
      params: {
        q,
        apiKey: API_KEY,
        language: 'th',
        sortBy: 'publishedAt',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Error fetching news' });
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

app.use('/api/auth', authRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
