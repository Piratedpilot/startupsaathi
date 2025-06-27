// app/verified/page.tsx

"use client"

export default function VerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Email Verified</h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully confirmed. You can now log in and start using StartupSaathi.
        </p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-green-600 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}
