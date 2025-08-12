import { Users, TrendingUp, MapPin, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: "Trader Directory",
      description: "Connect with verified traders",
      path: "/directory",
      gradient: "bg-gradient-primary"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Detailed price trends & insights",
      path: "/analysis",
      gradient: "bg-gradient-success"
    },
    {
      icon: MapPin,
      title: "Area Selection",
      description: "Set your trading region",
      path: "/area-selection",
      gradient: "bg-gradient-card"
    },
    {
      icon: Newspaper,
      title: "News & Updates",
      description: "Latest market news",
      path: "/broadcast",
      gradient: "bg-accent"
    }
  ];

  return (
    <section className="mx-4 my-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        ⚡ Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.path} to={action.path}>
              <Card className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${action.gradient} shadow-soft group-hover:shadow-glow transition-shadow duration-300`}>
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;