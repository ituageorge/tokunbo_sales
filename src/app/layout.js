import { Roboto } from "next/font/google";
import "./globals.css";
// import Header from "../components/layout/Header";
// import { AppProvider } from "../components/AppContext";
import { Toaster } from "react-hot-toast";
import Header from "../components/layout/Header";
import { AppProvider } from "../components/AppContext";
import {Providers} from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
<Providers> 
            <Toaster />

            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-12">
              &copy; 2023 All rights reserved
            </footer>
            </Providers>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
