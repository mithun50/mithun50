import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata = {
  title: "Projects | Mithun Gowda B",
  description: "Explore Mithun Gowda B's projects - AI frameworks, mobile apps, web development, and open-source contributions.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <PageTransition>
        <Projects />
      </PageTransition>
      <Footer />
    </main>
  );
}
