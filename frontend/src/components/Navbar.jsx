function Navbar() {
  const scrollToTool = () => {
    document
      .getElementById("pdf-tool")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          <div className="logo-icon">✦</div>

          <span>
            PDF<span>AI</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#pdf-tool">Ask PDF</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <button
          className="nav-button"
          onClick={scrollToTool}
        >
          Get Started
          <span>→</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;