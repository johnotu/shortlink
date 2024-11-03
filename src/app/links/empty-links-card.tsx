import Link from "next/link";

export default function EmptyLinksCard({
  searchTerm,
}: {
  searchTerm?: string;
}) {
  return (
    <div className="card mx-auto mb-3 mt-3">
      <div className="card-body shadow-sm bg-none d-flex flex-column">
        <div className="text-center">
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>

          {searchTerm ? (
            <h6 className="text-muted mt-3">
              No links found matching{" "}
              <span className="fw-bold">{searchTerm}</span>
            </h6>
          ) : (
            <>
              <h6 className="text-muted mt-3 ">
                You do not have any links yet
              </h6>
              <Link href="/" className="btn btn-dark mt-3">
                Create short link
              </Link>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
