import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/home/HeroSection";
import BhavHighlights from "@/components/home/BhavHighlights";
import CategorySegments from "@/components/home/CategorySegments";
import QuickActions from "@/components/home/QuickActions";
import NewsSection from "@/components/home/NewsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="space-y-2">
        <HeroSection />
        <BhavHighlights />
        <CategorySegments />
        <NewsSection />
        <QuickActions />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
