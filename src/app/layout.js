"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Provider store={store}>
          <header className="w-full bg-blue-600 text-white py-4 flex justify-center items-center">
            <h1 className="text-2xl font-bold">Beyond App</h1>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
