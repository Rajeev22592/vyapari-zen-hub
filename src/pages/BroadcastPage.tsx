import { Clock, TrendingUp, AlertCircle, Bookmark } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/services/news";

const BroadcastPage = () => {
  const { data } = useQuery({ queryKey: ["news", { page: 1 }], queryFn: () => fetchNews({ page: 1, perPage: 10 }) });
  const news = data?.data || [];

  const categories = [
    { id: "all", name: "All News", count: news.length },
    { id: "urgent", name: "Urgent", count: news.filter((n: any) => n.urgent).length },
    { id: "market", name: "Market", count: news.filter((n: any) => (n.category||"").toLowerCase().includes("market")).length },
    { id: "policy", name: "Policy", count: news.filter((n: any) => (n.category||"").toLowerCase().includes("policy")).length },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">News & Updates</h1>
            <p className="text-muted-foreground">Latest market developments</p>
          </div>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved
          </Button>
        </div>

        {/* Breaking News Banner */}
        <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-destructive rounded-full animate-pulse">
                <AlertCircle className="h-4 w-4 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="destructive" className="text-xs">BREAKING</Badge>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Heavy rains in Punjab may affect wheat harvesting. Prices expected to rise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {/* News Feed */}
            <div className="space-y-4">
              {news.map((article) => (
                <Card key={article.id} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={article.urgent ? "destructive" : "outline"}
                          className="text-xs"
                        >
                          {article.category}
                        </Badge>
                        {article.urgent && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{article.time}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="bg-muted/30 p-3 rounded-lg border-l-4 border-primary/30">
                      <p className="text-sm text-foreground leading-relaxed">
                        {article.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                      <Link to={`/broadcast/${article.id}`}>
                        <Button variant="outline" size="sm">
                          Read Full Article
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would be filtered versions */}
          <TabsContent value="urgent" className="space-y-4 mt-6">
            <div className="space-y-4">
              {news.filter(article => article.urgent).map((article) => (
                <Card key={article.id} className="bg-gradient-card border-border/50 shadow-soft">
                  <CardContent className="p-4">
                    <Badge variant="destructive" className="mb-2">Urgent</Badge>
                    <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default BroadcastPage;
