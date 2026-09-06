import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import PdfUpload from "./components/PdfUpload";
import QuestionBox from "./components/QuestionBox";
import Answer from "./components/Answer";

const API_BASE = "https://pdfreader-77ah.onrender.com";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setUploadStatus({
        type: "error",
        message: "Please select a PDF file only.",
      });

      setSelectedFile(null);
      setIsPdfUploaded(false);
      return;
    }

    setSelectedFile(file);
    setUploadStatus(null);
    setIsPdfUploaded(false);
    setQuestion("");
    setAnswer("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    setUploadStatus(null);
    setIsPdfUploaded(false);
    setQuestion("");
    setAnswer("");
    setError("");

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const response = await fetch(`${API_BASE}/api/pdf/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload PDF.");
      }

      setUploadStatus({
        type: "success",
        message: data.message || "PDF uploaded successfully!",
      });

      setIsPdfUploaded(true);
    } catch (uploadError) {
      setUploadStatus({
        type: "error",
        message:
          uploadError.message ||
          "Something went wrong during upload.",
      });

      setIsPdfUploaded(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAsk = async () => {
    if (!question.trim() || !isPdfUploaded || isLoading) return;

    setIsLoading(true);
    setError("");
    setAnswer("");

    try {


      const response = await fetch(`${API_BASE}/api/questions/ask`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: question.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get an answer."
        );
      }

      setAnswer(data.answer || "No answer received.");
    } catch (askError) {
      setError(
        askError.message ||
        "Something went wrong while asking the question."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <Hero />

      <main id="pdf-tool" className="container">
        <div className="tool-heading">
          <span className="section-badge">
            ✦ AI DOCUMENT TOOL
          </span>

          <h2>Ask Anything About Your PDF</h2>

          <p>
            Upload your document, ask your question,
            and get an AI-powered answer instantly.
          </p>
        </div>

        <div className="tool-grid">
          <div className="tool-left">
            <PdfUpload
              selectedFile={selectedFile}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              uploadStatus={uploadStatus}
              isUploading={isUploading}
            />

            <QuestionBox
              question={question}
              onQuestionChange={handleQuestionChange}
              onAsk={handleAsk}
              isPdfUploaded={isPdfUploaded}
              isLoading={isLoading}
            />
          </div>

          <div className="tool-right">
            <Answer
              answer={answer}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <section id="how-it-works" className="how-it-works">
        <div className="how-header">
          <span className="section-badge">
            SIMPLE PROCESS
          </span>

          <h2>How It Works</h2>

          <p>
            Get answers from your documents in
            three simple steps.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>

            <h3>Upload PDF</h3>

            <p>
              Choose the PDF document you want
              the AI to understand.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>

            <h3>Ask a Question</h3>

            <p>
              Type anything you want to know
              about the uploaded document.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>

            <h3>Get Your Answer</h3>

            <p>
              Our AI analyzes the PDF and gives
              you a clear answer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;