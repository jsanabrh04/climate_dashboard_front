'use client';

import Navbar from "../components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </>
  );
}
