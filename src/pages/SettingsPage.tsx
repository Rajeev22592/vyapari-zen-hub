import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import LanguageToggle from "@/components/ui/LanguageToggle";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">App Settings</h1>
          <p className="text-muted-foreground">Customize your preferences</p>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark">Dark mode</Label>
              <Switch id="dark" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Language</Label>
              <LanguageToggle />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Data Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Anonymous analytics</Label>
              <Switch id="analytics" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="alerts">Price alerts</Label>
              <Switch id="alerts" />
            </div>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default SettingsPage;
