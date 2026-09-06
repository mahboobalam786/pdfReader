function Hero() {
  const scrollToTool = () => {
    document
      .getElementById("pdf-tool")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="hero">
      <div className="hero-background-circle circle-one"></div>
      <div className="hero-background-circle circle-two"></div>

      <div className="hero-content">
        <div className="hero-badge">
          ✦ AI POWERED PDF ASSISTANT
        </div>

        <h1>
          Understand Your
          <span> PDFs Faster.</span>
        </h1>

        <p>
          Upload your PDF, ask questions about its
          content and get clear AI-powered answers
          in seconds.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-primary"
            onClick={scrollToTool}
          >
            Start Asking Questions
            <span>→</span>
          </button>

          <a href="#how-it-works">
            How It Works
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="floating-small-card card-one">
          <span>✓</span>
          PDF Uploaded
        </div>

        <div className="floating-small-card card-two">
          ✦ AI Answer
        </div>

        <div className="document-card">
          <div className="document-top">
            <span className="pdf-label">
              PDF
            </span>

            <span className="ai-label">
              ✦ AI
            </span>
          </div>

          <div className="document-icon">
            <div className="pdf-icon">
              <span>PDF</span>
            </div>
          </div>

          <h3>Your Document</h3>

          <p>Upload • Understand • Ask</p>

          <div className="document-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="ai-status">
            <span className="status-dot"></span>
            AI Ready
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;