import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ENamFilters from "@/components/filters/ENamFilters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Filters = {
  state: string;
  district: string;
  market: string;
  commodity: string;
  search: string;
};

const STORAGE_KEY = "enam-filters";

const AreaSelectionPage = () => {
  const [filters, setFilters] = useState<Filters>({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setFilters(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFilters));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Select Your Trading Area</h1>
        <p className="text-muted-foreground">Choose state, district, market, and commodity. We auto-save your selections.</p>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardContent className="p-4">
            <ENamFilters onFiltersChange={handleFiltersChange} />
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button onClick={() => navigate('/bhav')}>View Prices</Button>
          <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default AreaSelectionPage;
