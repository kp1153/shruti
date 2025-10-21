export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="max-w-8xl mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-2">
          <p>
            © {new Date().getFullYear()} — सर्वाधिकार सुरक्षित, जनमित्र न्यास
          </p>
          <p>
            वेब डेवलपर{" "}
            <a
              href="https://web-developer-kp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              कामता प्रसाद
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
