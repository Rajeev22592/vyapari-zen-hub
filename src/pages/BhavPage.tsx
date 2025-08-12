import { useState } from "react";
import { ArrowUpDown, Filter, TrendingUp, TrendingDown } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BhavPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const commodities = [
    { name: "Wheat (Gehu)", price: "₹2,830", change: "+20", changePercent: "+0.7%", location: "Bikaner", category: "grains", trend: "up" },
    { name: "Cumin (Jeera)", price: "₹38,100", change: "-150", changePercent: "-0.4%", location: "Rajkot", category: "spices", trend: "down" },
    { name: "Mustard Oil", price: "₹1,450", change: "+25", changePercent: "+1.8%", location: "Delhi", category: "oils", trend: "up" },
    { name: "Basmati Rice", price: "₹4,200", change: "+50", changePercent: "+1.2%", location: "Karnal", category: "rice", trend: "up" },
    { name: "Cashew Nuts", price: "₹850", change: "-10", changePercent: "-1.2%", location: "Kerala", category: "dry-fruits", trend: "down" },
    { name: "Turmeric (Haldi)", price: "₹12,500", change: "+200", changePercent: "+1.6%", location: "Sangli", category: "spices", trend: "up" },
  ];

  const categories = [
    { id: "all", name: "All", emoji: "📊" },
    { id: "grains", name: "Grains", emoji: "🌾" },
    { id: "spices", name: "Spices", emoji: "🌶️" },
    { id: "oils", name: "Oils", emoji: "🛢️" },
    { id: "rice", name: "Rice", emoji: "🍚" },
    { id: "dry-fruits", name: "Dry Fruits", emoji: "🧺" },
  ];

  const filteredCommodities = selectedCategory === "all" 
    ? commodities 
    : commodities.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Market Prices</h1>
            <p className="text-muted-foreground">Live commodity rates</p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4 mt-6">
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-success/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Markets Up</div>
                </CardContent>
              </Card>
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">12</div>
                  <div className="text-sm text-muted-foreground">Markets Down</div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <div className="text-sm text-muted-foreground">Total Markets</div>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Data Fresh</div>
                </CardContent>
              </Card>
            </div>

            {/* Commodity List */}
            <div className="space-y-3">
              {filteredCommodities.map((commodity, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground">{commodity.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {commodity.location}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-foreground">{commodity.price}</div>
                          <Badge 
                            variant={commodity.trend === "up" ? "default" : "destructive"}
                            className={`text-sm ${
                              commodity.trend === "up" 
                                ? "bg-gradient-success text-primary-foreground" 
                                : "bg-destructive text-destructive-foreground"
                            }`}
                          >
                            {commodity.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {commodity.change} ({commodity.changePercent})
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
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

export default BhavPage;