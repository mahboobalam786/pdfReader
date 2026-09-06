const pdfService = require('../services/pdfService');
const aiService = require('../services/aiService');

async function askQuestion(req, res) {
  console.log('Ask question controller called');
  console.log('Question received:', req.body);

  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Question is required.',
      });
    }

    console.log('Getting stored PDF text...');

    const pdfText = pdfService.getStoredPdfText();

    if (!pdfText) {
      return res.status(400).json({
        success: false,
        message: 'No PDF text found. Please upload a PDF first.',
      });
    }

    console.log('PDF text found');
    console.log('Sending question to AI...');

    const answer = await aiService.getAnswerFromPdf(
      pdfText,
      question.trim()
    );

    console.log('AI answer received');

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error('Question error:', error.message);

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to get an answer from AI.',
    });
  }
}

module.exports = {
  askQuestion,
};