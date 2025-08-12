import { Settings, User, Bell, HelpCircle, Shield, Info, LogOut, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MorePage = () => {
  const menuItems = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your account details",
      action: () => {},
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage alerts and updates",
      action: () => {},
      badge: "3"
    },
    {
      icon: Settings,
      title: "App Settings",
      description: "Customize your experience",
      action: () => {},
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control your data and privacy",
      action: () => {},
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact support",
      action: () => {},
    },
    {
      icon: Info,
      title: "About Vyapari Darbaar",
      description: "App version and information",
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gradient-hero shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
                <AvatarImage src="/api/placeholder/64/64" alt="Profile" />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary-foreground">Rajesh Kumar</h2>
                <p className="text-primary-foreground/80">Kumar Grain Traders</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                    ✓ Verified Trader
                  </Badge>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-success/10 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">₹2.4L</div>
              <div className="text-sm text-muted-foreground">Monthly Trading</div>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-foreground">156</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </CardContent>
          </Card>
          <Card className="bg-grain/10 border-grain/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-grain-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Settings & More
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index}>
                    <button
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <Badge variant="destructive" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </button>
                    {index < menuItems.length - 1 && <Separator className="mx-4" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-muted/30 border-border/30">
          <CardContent className="p-4 text-center">
            <div className="space-y-2">
              <div className="text-lg font-bold text-foreground">Vyapari Darbaar</div>
              <div className="text-sm text-muted-foreground">Version 2.1.0</div>
              <div className="text-xs text-muted-foreground">
                © 2024 Vyapari Darbaar. All rights reserved.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default MorePage;