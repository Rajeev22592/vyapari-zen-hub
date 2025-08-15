import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/home/HeroSection";
import ENamStats from "@/components/home/ENamStats";
import ENamFilters from "@/components/filters/ENamFilters";
import BhavHighlights from "@/components/home/BhavHighlights";
import CategorySegments from "@/components/home/CategorySegments";
import QuickActions from "@/components/home/QuickActions";
import NewsSection from "@/components/home/NewsSection";
import { useState } from "react";

const Index = () => {
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: ""
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="space-y-4">
        <HeroSection />
        <ENamStats />
        <div className="px-4">
          <ENamFilters onFiltersChange={handleFiltersChange} />
        </div>
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
