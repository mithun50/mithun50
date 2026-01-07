import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import { getDynamicProfile, getDynamicProjects, getTopStarredProjects } from "@/lib/data";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [profile, allProjects, topProjects] = await Promise.all([
    getDynamicProfile(),
    getDynamicProjects(),
    getTopStarredProjects(6), // Top 6 starred repos for home
  ]);

  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <Hero profile={profile} />
      <FeaturedProjects projects={topProjects} totalCount={allProjects.length} />
      <Footer />
    </main>
  );
}
