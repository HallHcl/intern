const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL ของรูปตัวอย่างวิดีโอ
  videoUrl: { type: String, required: true }, // URL ของวิดีโอจริง
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', VideoSchema);
