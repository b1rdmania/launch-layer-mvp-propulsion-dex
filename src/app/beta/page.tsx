import Link from "next/link";

export default function BetaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
      <h1 className="text-3xl font-bold mb-6">Beta UX</h1>
      <p className="mb-8 text-lg text-gray-700">This is a placeholder for the upcoming Beta user experience. Stay tuned for new features and design!</p>
      <Link href="/" className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
        ← Back to DEX
      </Link>
    </div>
  );
} 