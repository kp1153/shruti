import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "श्रुति नागवंशी - मानवाधिकार कार्यकर्ता | जन मित्र न्यास",
  description:
    "जन मित्र न्यास की संस्थापक एवं प्रबंध न्यासी। सामाजिक न्याय, मानवाधिकार संरक्षण, दलित अधिकार और महिला सुरक्षा के लिए समर्पित समाजसेविका।",
  keywords:
    "श्रुति नागवंशी, Shruti Nagvanshi, जन मित्र न्यास, Janmitra Nyas, मानवाधिकार, human rights, सामाजिक न्याय, social justice, दलित अधिकार, महिला सुरक्षा, NGO, PVCHR, वाराणसी",
  authors: [{ name: "श्रुति नागवंशी" }],
  openGraph: {
    title: "श्रुति नागवंशी - मानवाधिकार कार्यकर्ता",
    description:
      "जन मित्र न्यास की संस्थापक एवं प्रबंध न्यासी। सामाजिक न्याय और मानवाधिकार संरक्षण के लिए कार्यरत।",
    type: "website",
    locale: "hi_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
