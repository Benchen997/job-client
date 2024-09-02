import Link from 'next/link';
import React from 'react';

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">To start:</h1>
      <Link href="/jobs">Job Display Table</Link>
    </main>
  );
}

