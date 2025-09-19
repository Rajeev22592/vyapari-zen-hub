import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Filter } from "lucide-react";

type Notification = { id: string; title: string; time: string; read: boolean; category: string };

const NotificationsPage = () => {
  const notifications: Notification[] = [
    { id: "1", title: "Price alert: Wheat up 2%", time: "Just now", read: false, category: "price" },
    { id: "2", title: "New policy update posted", time: "1h", read: false, category: "news" },
    { id: "3", title: "Trader Suresh accepted your request", time: "Yesterday", read: true, category: "network" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Your latest alerts and updates</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Filter</Button>
            <Button size="sm"><Check className="h-4 w-4 mr-1" /> Mark all read</Button>
          </div>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Recent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className={`flex items-center justify-between p-3 rounded-md ${n.read ? 'bg-muted/30' : 'bg-primary/5'}`}>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.time}</div>
                  </div>
                </div>
                {!n.read && <Button variant="ghost" size="sm"><Check className="h-4 w-4 mr-1" /> Read</Button>}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default NotificationsPage;
