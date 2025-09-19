import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PrivacySecurityPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Privacy & Security</h1>
          <p className="text-muted-foreground">Manage your data and permissions</p>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Notifications: Enabled</p>
            <p>• Location: Disabled</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">Download my data</Button>
            <Button variant="destructive" className="w-full">Delete my account</Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default PrivacySecurityPage;
