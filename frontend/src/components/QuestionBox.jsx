function QuestionBox({
  question,
  onQuestionChange,
  onAsk,
  isPdfUploaded,
  isLoading,
}) {
  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      isPdfUploaded &&
      question.trim() &&
      !isLoading
    ) {
      onAsk();
    }
  };

  return (
    <section className="card question-card">
      <h2>Ask a Question</h2>

      <p className="hint">
        {isPdfUploaded
          ? "Your PDF is ready. Ask anything about its content."
          : "Upload a PDF first to start asking questions."}
      </p>

      <div className="question-row">
        <input
          type="text"
          placeholder="What is this PDF about?"
          value={question}
          onChange={onQuestionChange}
          onKeyDown={handleKeyDown}
          disabled={!isPdfUploaded || isLoading}
        />

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onAsk}
          disabled={
            !isPdfUploaded ||
            !question.trim() ||
            isLoading
          }
        >
          {isLoading
            ? "Thinking..."
            : "Ask Question"}

          {!isLoading && <span>→</span>}
        </button>
      </div>
    </section>
  );
}

export default QuestionBox;