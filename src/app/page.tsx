export default function Home() {
  return (
    <main className="">
      <div className="card mx-auto">
        <div className="card-body shadow-sm bg-none">
          <div className="d-flex column-gap-3 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>

            <h5 className="card-title">Shorten long URLs</h5>
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Paste your long URL here"
          />
          <div className="d-grid">
            <button className="btn btn-lg btn-dark">Shorten URL</button>
          </div>
        </div>
      </div>
    </main>
  );
}
