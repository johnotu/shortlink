import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShortLink",
  description: "Short links, long reach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} d-flex h-100 text-center `}
      >
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-5">
            <div>
              <Link className="h3 float-start mb-0" href="/">
                ShortLink
              </Link>
              <nav className="nav nav-masthead justify-content-center float-end">
                <Link
                  className={`nav-link fw-bold py-1 px-0 active`}
                  href="/links"
                >
                  My Links
                </Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="mt-auto text-white-50">
            <p>
              Powered by{" "}
              <a href="https://nextjs.org/" className="text-white">
                Next.js
              </a>
              ,{" "}
              <a href="https://getbootstrap.com/" className="text-white">
                Bootstrap
              </a>
              .
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
