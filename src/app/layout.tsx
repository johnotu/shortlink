import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";
import PageHeader from "./components/page-header";
import { ToastContainer } from "react-toastify";

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
          <PageHeader />
          {children}
          <ToastContainer />
          <footer className="mt-auto text-black-50">
            <p>
              Powered by{" "}
              <a href="https://nextjs.org/" className="text-black">
                Next.js
              </a>
              ,{" "}
              <a href="https://getbootstrap.com/" className="text-black">
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
