import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata = {
  title: "About | Mithun Gowda B",
  description: "Learn more about Mithun Gowda B - Engineering student, full-stack developer, and open-source contributor.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <PageTransition>
        <About />
        <Skills />
      </PageTransition>
      <Footer />
    </main>
  );
}
