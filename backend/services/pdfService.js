const fs = require('fs');
const pdfParse = require('pdf-parse');

let storedPdfText = '';

async function extractTextFromPdf(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(fileBuffer);

  if (!pdfData.text || !pdfData.text.trim()) {
    throw new Error('Could not extract text from this PDF.');
  }

  return pdfData.text;
}

function storePdfText(text) {
  storedPdfText = text;
}

function getStoredPdfText() {
  return storedPdfText;
}

module.exports = {
  extractTextFromPdf,
  storePdfText,
  getStoredPdfText,
};
