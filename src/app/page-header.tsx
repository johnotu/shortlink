"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="mb-5">
      <div>
        <Link className="h3 float-start mb-0 display-6" href="/">
          ShortLink
        </Link>
        <nav className="nav nav-masthead justify-content-center float-end">
          <Link
            className={`nav-link fw-bold py-1 px-0 ${
              pathname === "/links" ? "active" : ""
            }`}
            href="/links"
          >
            My Links
          </Link>
        </nav>
      </div>
    </header>
  );
}
