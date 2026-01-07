import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { getDynamicProjects, getCategories } from "@/lib/data";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Projects | Mithun Gowda B",
  description: "Explore Mithun Gowda B's projects - AI frameworks, mobile apps, web development, and open-source contributions.",
};

export default async function ProjectsPage() {
  const projects = await getDynamicProjects();
  const categories = getCategories(projects);

  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <PageTransition>
        <Projects projects={projects} categories={categories} />
      </PageTransition>
      <Footer />
    </main>
  );
}
