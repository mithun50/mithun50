import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { getDynamicProfile, getDynamicSkills } from "@/lib/data";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "About | Mithun Gowda B",
  description: "Learn more about Mithun Gowda B - Engineering student, full-stack developer, and open-source contributor.",
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([
    getDynamicProfile(),
    getDynamicSkills(),
  ]);

  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <PageTransition>
        <About profile={profile} />
        <Skills skills={skills} />
      </PageTransition>
      <Footer />
    </main>
  );
}
