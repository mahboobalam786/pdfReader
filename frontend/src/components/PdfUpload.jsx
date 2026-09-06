function PdfUpload({
  selectedFile,
  onFileChange,
  onUpload,
  uploadStatus,
  isUploading,
}) {
  return (
    <section className="card upload-card">
      <h2>Upload Your PDF</h2>

      <p className="hint">
        Select a PDF document and upload it for
        AI analysis.
      </p>

      <label className="upload-area">
        <input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          disabled={isUploading}
        />

        <div className="upload-icon">↑</div>

        <div className="upload-content">
          <strong>
            {selectedFile
              ? selectedFile.name
              : "Choose a PDF file"}
          </strong>

          <span>
            {selectedFile
              ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
              : "Click here to browse your computer"}
          </span>
        </div>
      </label>

      {selectedFile && (
        <div className="selected-file">
          <span className="file-icon">PDF</span>

          <div>
            <strong>{selectedFile.name}</strong>

            <p>
              Ready to upload and analyze
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="btn btn-upload"
        onClick={onUpload}
        disabled={!selectedFile || isUploading}
      >
        {isUploading
          ? "Uploading..."
          : "Upload & Analyze"}

        {!isUploading && <span>→</span>}
      </button>

      {uploadStatus && (
        <p
          className={`status ${uploadStatus.type}`}
        >
          {uploadStatus.message}
        </p>
      )}
    </section>
  );
}

export default PdfUpload;