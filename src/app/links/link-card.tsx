import dayjs from "dayjs";
import { UrlEntry } from "../types";
import { copyUrl } from "../utils";

export default function LinkCard({ urlEntry }: { urlEntry: UrlEntry }) {
  const { originalUrl, shortUrl, created } = urlEntry;
  return (
    <div className="card mx-auto mb-3 mt-3">
      <div className="card-body shadow-sm bg-none d-flex flex-column">
        <div className="d-flex column-gap-3 mb-3">
          <div className="col-2 d-flex align-items-center justify-content-center">
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
          </div>
          <div className="d-flex flex-column text-start col-8">
            <h5 className="card-title">{shortUrl}</h5>
            <p className="card-text">{originalUrl}</p>
          </div>
          <div className="col">
            <button
              className="btn btn-sm btn-outline-secondary d-flex column-gap-1"
              onClick={() => copyUrl({ url: shortUrl })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center column-gap-1 justify-content-start text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="main-grid-item-icon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <small className="mb-0 small">
            {dayjs(created).format("MMM DD, YYYY")}
          </small>
        </div>
      </div>
    </div>
  );
}
