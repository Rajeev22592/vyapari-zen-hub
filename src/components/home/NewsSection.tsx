import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const news = [
    {
      title: "Aaj Ki Taaza Khabar",
      summary: "Gehu bhav mein halka tezi dekhi gayi. Barish ki wajah se kharif crop ko nuksan.",
      time: "2 hours ago",
      category: "Market Update",
      urgent: true
    },
    {
      title: "Government Policy Update",
      summary: "New MSP rates announced for upcoming season. Farmers to benefit from increased rates.",
      time: "4 hours ago",
      category: "Policy",
      urgent: false
    }
  ];

  return (
    <section className="mx-4 my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          📰 Today's News
        </h2>
        <Link to="/broadcast">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            All News <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {news.map((item, index) => (
          <Card key={index} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                {item.urgent && (
                  <Badge variant="destructive" className="text-xs animate-pulse">
                    Urgent
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  <Clock className="h-3 w-3" />
                  <span>{item.time}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs">
                  Read More →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;