"use client";

import Link from "next/link";
import LinkCard from "./link-card";
import { useEffect, useState } from "react";
import { UrlEntry } from "../types";
import EmptyLinksCard from "./empty-links-card";

export default function Links() {
  const [urlEntries, setUrlEntries] = useState<UrlEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUrlEntries, setFilteredUrlEntries] = useState<UrlEntry[]>([]);

  useEffect(() => {
    const savedUrlEntries = localStorage.getItem("urlEntries");
    if (savedUrlEntries) {
      setUrlEntries(JSON.parse(savedUrlEntries));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setFilteredUrlEntries([]);
      return;
    }
    const regex = new RegExp(searchTerm, "i");
    const filtered = urlEntries.filter((item) => regex.test(item.originalUrl));
    setFilteredUrlEntries(filtered);
  }, [searchTerm, urlEntries]);

  const displayEntries =
    searchTerm.trim().length < 3 ? urlEntries : filteredUrlEntries;

  return (
    <main className="">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="text-start mb-3">My Short Links</h4>

        <Link href="/">
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
            <line x1="19" x2="5" y1="12" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Search by original URL (min 3 characters)"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 && (
        <small className="text-muted">
          Please enter at least 3 characters to search
        </small>
      )}

      {urlEntries.length === 0 ? (
        <EmptyLinksCard />
      ) : displayEntries.length === 0 && searchTerm.trim().length >= 3 ? (
        <EmptyLinksCard searchTerm={searchTerm} />
      ) : (
        displayEntries.map((entry) => (
          <LinkCard key={entry.id} urlEntry={entry} />
        ))
      )}
    </main>
  );
}
