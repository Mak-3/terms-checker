"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-linear-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Navbar */}
      <header
        className={`w-full max-w-7xl flex justify-between items-center py-6 px-6 z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            TermsCheck
          </h1>
        </div>

        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a
            href="#features"
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-indigo-600 transition-colors"
          >
            How it Works
          </a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">
            About
          </a>
        </nav>

        <div>
          <a href="/policy-check">
            <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
              Try Analyzer →
            </button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`text-center px-4 mt-8 md:mt-16 z-10 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="inline-block mb-4 md:mb-6">
          <span className="bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-indigo-200">
            🚀 AI-Powered Legal Analysis
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto px-2">
          Understand{" "}
          <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Terms & Conditions
          </span>
          <br />
          in seconds, not hours
        </h2>

        <p className="text-gray-600 mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed px-4">
          Stop blindly accepting terms. Get instant AI-powered analysis that
          categorizes risks and explains legal jargon in plain
          English—supporting{" "}
          <span className="font-semibold text-indigo-600">
            text, PDFs, and more
          </span>
          .
        </p>

        <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <a href="/policy-check" className="w-full sm:w-auto">
            <button className="group w-full sm:w-auto bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base md:text-lg font-bold flex items-center justify-center gap-2">
              Analyze Your Terms
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </a>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 rounded-xl border-2 border-gray-300 text-gray-700 text-base md:text-base font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
              Learn More
            </button>
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-gray-500 px-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">No Signup Required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">PDF Support</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <div
        className={`mt-12 md:mt-24 relative flex justify-center w-full px-4 z-10 transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        id="how-it-works"
      >
        <div className="bg-white/80 backdrop-blur-lg w-full max-w-5xl rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-200">
          <h3 className="text-gray-900 font-bold text-2xl md:text-3xl mb-2 md:mb-3 text-center">
            How It Works
          </h3>
          <p className="text-center text-gray-600 text-sm md:text-base mb-6 md:mb-10 max-w-2xl mx-auto px-2">
            Our AI analyzes your documents and categorizes clauses by risk
            level, giving you clear insights instantly.
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-red-200 h-full">
                <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-3 md:mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Critical Risks
                </h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  Flags dangerous clauses like data selling, unlimited
                  liability, and hidden fees that could seriously harm you.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-orange-200 h-full">
                <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-3 md:mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Medium Risks
                </h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  Highlights concerning terms like limited refunds and
                  third-party data sharing you should be aware of.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-green-200 h-full">
                <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-3 md:mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Standard Clauses
                </h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  Identifies benign, industry-standard terms so you can focus on
                  what actually matters.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
              <div className="group hover:scale-110 transition-all duration-300">
                <p className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  100%
                </p>
                <p className="text-gray-600 text-xs md:text-sm mt-1 md:mt-2 font-medium">
                  Secure & Private
                </p>
              </div>
              <div className="group hover:scale-110 transition-all duration-300">
                <p className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI
                </p>
                <p className="text-gray-600 text-xs md:text-sm mt-1 md:mt-2 font-medium">
                  Powered Analysis
                </p>
              </div>
              <div className="group hover:scale-110 transition-all duration-300">
                <p className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PDF
                </p>
                <p className="text-gray-600 text-xs md:text-sm mt-1 md:mt-2 font-medium">
                  Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div
        className={`mt-12 md:mt-24 mb-12 md:mb-20 max-w-4xl mx-auto text-center px-4 z-10 transition-all duration-1000 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        id="about"
      >
        <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl">
          <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Protect Yourself from Hidden Risks
          </h3>
          <p className="text-indigo-100 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
            Don't sign away your rights without knowing. Get instant, clear
            analysis of any terms and conditions— with support for text, PDFs,
            and more. Your documents stay private, always.
          </p>
          <a href="/policy-check">
            <button className="bg-white text-indigo-600 px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Now
            </button>
          </a>
        </div>
      </div>

      <footer className="w-full border-t border-gray-200 py-8 text-center text-gray-500 text-sm z-10">
        <p>© 2025 TermsCheck. Made with ❤️ to protect your rights.</p>
      </footer>
    </div>
  );
}
