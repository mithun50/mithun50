import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata = {
  title: "Contact | Mithun Gowda B",
  description: "Get in touch with Mithun Gowda B for collaborations, opportunities, or a friendly chat about tech.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <PageTransition>
        <Contact />
      </PageTransition>
      <Footer />
    </main>
  );
}
