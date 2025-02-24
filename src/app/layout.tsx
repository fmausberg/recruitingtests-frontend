"use client"
import Navbar from '../components/navbar-component/navbar';
import Footer from '../components/footer-component/footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar/>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}