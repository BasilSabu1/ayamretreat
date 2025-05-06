"use client"

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ComingSoon() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Coming Soon | My Resorts</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">Coming Soon</h1>
        <p className="text-lg md:text-xl text-blue-700 mb-6">
          We&apos;re working  to bring this page . Stay tuned!
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition"
        >
          Go Back Home
        </button>
      </div>
    </>
  );
}
