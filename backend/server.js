require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pdfRoutes = require('./routes/pdfRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'PDF Question Answer API is running' });
});

app.use('/api/pdf', pdfRoutes);
app.use('/api/questions', questionRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File is too large. Maximum size is 10MB.',
    });
  }

  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
