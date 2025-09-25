import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white fixed bottom-0 left-0 w-full z-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Janmitra Nyas. All rights
              reserved.
            </p>
          </div>
          <div className="text-gray-400 text-sm text-center md:text-right">
            <p>
              Website by{" "}
              <a
                href="https://www.web-developer-kp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF8800] font-semibold hover:text-orange-400 transition-colors underline decoration-dotted underline-offset-2"
              >
                Next.js Creative Solutions
              </a>
            </p>
            <p className="text-xs mt-1">Built with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
