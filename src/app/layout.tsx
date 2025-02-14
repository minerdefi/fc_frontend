import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "Forbes Capital",
  description: "grow your investment wealth...",
  icons: {
    icon: "/images/fc1.png",
    shortcut: "/images/fc1.png",
    apple: "/images/fc1.png",
    other: {
      rel: "apple-touch-icon",
      url: "/images/fc1.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen flex flex-col bg-white dark:bg-black pt-[4rem]">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
