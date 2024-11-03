import Link from "next/link";
import LinkCard from "../components/link-card";

export default function Links() {
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
        className="form-control mb-3"
        placeholder="Search links"
      />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
    </main>
  );
}
