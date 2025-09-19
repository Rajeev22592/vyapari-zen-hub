import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-4">
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardContent className="p-6 space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Vyapari Darbaar</h1>
            <div className="text-sm text-muted-foreground">Version 2.1.0</div>
            <p className="text-sm">
              A platform connecting farmers and traders with real-time prices, directories, and insights.
            </p>
            <div className="text-sm">
              Credits: React, Vite, Tailwind CSS, shadcn-ui, Recharts
            </div>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default AboutPage;
