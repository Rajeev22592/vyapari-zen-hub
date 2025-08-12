import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BhavHighlights = () => {
  const highlights = [
    {
      commodity: "Gehu (Wheat)",
      price: "₹2,830",
      change: "+20",
      location: "Bikaner Mandi",
      trend: "up",
      category: "grain"
    },
    {
      commodity: "Jeera (Cumin)",
      price: "₹38,100",
      change: "-150",
      location: "Rajkot Mandi",
      trend: "down",
      category: "spice"
    },
    {
      commodity: "Sarson Oil",
      price: "₹1,450",
      change: "+25",
      location: "Delhi Mandi",
      trend: "up",
      category: "oil"
    }
  ];

  return (
    <section className="mx-4 my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          📊 Daily Bhav Highlights
        </h2>
        <Link to="/bhav">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <Card key={index} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.commodity}
                </CardTitle>
                <Badge 
                  variant={item.trend === "up" ? "default" : "destructive"}
                  className={`text-xs ${
                    item.trend === "up" 
                      ? "bg-gradient-success text-primary-foreground" 
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {item.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {item.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{item.price}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {item.location}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BhavHighlights;