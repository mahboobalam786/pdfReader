function Answer({
  answer,
  error,
  isLoading,
}) {
  return (
    <section className="card answer-card">
      <div className="answer-header">
        <div>
          <h2>AI Answer</h2>

          <p className="answer-subtitle">
            Your answer based on the uploaded PDF
          </p>
        </div>

        <div className="ai-mini-badge">
          ✦ AI
        </div>
      </div>

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>

          <div>
            <strong>Analyzing your PDF</strong>

            <p>
              AI is finding the best answer...
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="status error">
          {error}
        </p>
      )}

      {!isLoading && !error && answer && (
        <div className="answer-box">
          <p>{answer}</p>
        </div>
      )}

      {!isLoading && !error && !answer && (
        <div className="answer-empty">
          <div className="empty-icon">
            ✦
          </div>

          <h3>Ready for your question</h3>

          <p>
            Upload a PDF and ask a question.
            Your AI-powered answer will appear here.
          </p>
        </div>
      )}
    </section>
  );
}

export default Answer;