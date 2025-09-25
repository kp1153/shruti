import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Lenin Raghuvanshi - Human Rights Activist | Janmitra Nyas",
  description:
    "Founder & Director of Janmitra Nyas NGO. Social justice advocate, human rights defender, and community development leader working for peace and equality.",
  keywords:
    "Lenin Raghuvanshi, Janmitra Nyas, human rights, social justice, NGO, peace activist, community development",
  authors: [{ name: "Lenin Raghuvanshi" }],
  openGraph: {
    title: "Lenin Raghuvanshi - Human Rights Activist",
    description:
      "Founder & Director of Janmitra Nyas NGO working for social justice and human rights.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
