import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HelpSupportPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground">FAQs and contact options</p>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="font-medium">How to add commodities to watchlist?</div>
              <div className="text-muted-foreground">Open commodity and click "Add to Watchlist".</div>
            </div>
            <div>
              <div className="font-medium">How to change language?</div>
              <div className="text-muted-foreground">Go to Settings and switch language.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Your email" />
            <Input placeholder="Your message" />
            <div className="flex gap-2">
              <Button>Send</Button>
              <Button variant="outline">WhatsApp</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default HelpSupportPage;
