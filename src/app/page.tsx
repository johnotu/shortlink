"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UrlEntry } from "./types";
import { copyUrl } from "./utils";

export default function Home() {
  const [originalUrl, setOriginalurl] = useState("");
  const [urlEntries, setUrlEntries] = useState<UrlEntry[]>([]);

  useEffect(() => {
    const savedUrlEntries = localStorage.getItem("urlEntries");
    if (savedUrlEntries) {
      setUrlEntries(JSON.parse(savedUrlEntries));
    }
  }, []);

  const generateShortUrl = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      new URL(originalUrl);
      const shortCode = generateShortUrl();
      const newUrlEntry: UrlEntry = {
        id: Date.now(),
        originalUrl,
        shortUrl: `https://shrtl.nk/${shortCode}`,
        created: Date.now(),
        copyCount: 0,
      };
      const updatedEntries = [newUrlEntry, ...urlEntries];
      setUrlEntries(updatedEntries);
      localStorage.setItem("urlEntries", JSON.stringify(updatedEntries));

      setOriginalurl("");
    } catch {
      toast.error(
        "Invalid URL. Please provide a valid URL with http or https."
      );
    }
  };

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
          <form noValidate onSubmit={handleSubmit}>
            <div className="d-flex justify-content-start flex-column">
              <input
                type="text"
                className="form-control"
                placeholder="Paste your long URL here"
                value={originalUrl}
                onChange={(event) => setOriginalurl(event.target.value)}
                required
              />
            </div>
            <div className="d-grid mt-3">
              <button role="submit" className="btn btn-lg btn-dark">
                Shorten URL
              </button>
            </div>
          </form>
        </div>
      </div>

      {urlEntries.length > 0 && (
        <>
          <h4 className="text-start mb-3 mt-5">Recent Short Links</h4>
          <div className="card mx-auto">
            <div className="card-body shadow-sm bg-none">
              <ol className="list-group list-group-numbered">
                {urlEntries
                  .sort((a, b) => b.created - a.created)
                  .slice(0, 5)
                  .map((entry) => (
                    <li
                      key={entry.id}
                      className="list-group-item d-flex align-items-start justify-content-between mb-3"
                    >
                      <h5 className="card-title text-start ms-2 me-auto">
                        {entry.shortUrl}
                      </h5>
                      <button
                        className="btn btn-sm btn-outline-secondary d-flex column-gap-1"
                        onClick={() => copyUrl({ url: entry.shortUrl })}
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
                          <rect
                            height="13"
                            rx="2"
                            ry="2"
                            width="13"
                            x="9"
                            y="9"
                          />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                      </button>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
