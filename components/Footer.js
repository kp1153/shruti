import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Janmitra Nyas</p>
          <p>
            Website by{" "}
            <a
              href="https://www.web-developer-kp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300"
            >
              Next.js Creative Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
