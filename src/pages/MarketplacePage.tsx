import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Star, Phone, MessageCircle, Plus, Eye, Filter } from "lucide-react";

const MarketplacePage = () => {
  const { t } = useLanguage();

  const listings = [
    {
      id: 1,
      farmer: "राम कुमार",
      commodity: "गेहूं",
      quantity: "500 क्विंटल",
      price: "₹2,100/क्विंटल",
      location: "कानपुर, UP",
      quality: "Grade A",
      posted: "2 घंटे पहले",
      rating: 4.8,
      verified: true,
      description: "उच्च गुणवत्ता का गेहूं, नमी 12%, सीधे खेत से।"
    },
    {
      id: 2,
      farmer: "सुनील पटेल",
      commodity: "धान",
      quantity: "800 क्विंटल",
      price: "₹1,850/क्विंटल",
      location: "लुधियाना, Punjab",
      quality: "Grade B+",
      posted: "1 दिन पहले",
      rating: 4.6,
      verified: true,
      description: "ताजा धान की फसल, तुरंत डिलीवरी उपलब्ध।"
    },
    {
      id: 3,
      farmer: "प्रदीप शर्मा",
      commodity: "सरसों",
      quantity: "200 क्विंटल",
      price: "₹4,800/क्विंटल",
      location: "जयपुर, Rajasthan",
      quality: "Premium",
      posted: "3 घंटे पहले",
      rating: 4.9,
      verified: true,
      description: "शुद्ध सरसों के दाने, तेल की मात्रा अधिक।"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
            <p className="text-muted-foreground">किसानों से सीधे खरीदें या बेचें</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            नई लिस्टिंग
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <Input placeholder="कमोडिटी या स्थान खोजें..." className="flex-1" />
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            फिल्टर
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">खरीदें</TabsTrigger>
            <TabsTrigger value="sell">बेचें</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            {/* Listings */}
            {listings.map((listing) => (
              <Card key={listing.id} className="border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">
                          {listing.farmer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{listing.farmer}</h3>
                          {listing.verified && (
                            <Badge variant="secondary" className="text-xs">
                              सत्यापित
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{listing.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{listing.price}</div>
                      <div className="text-xs text-muted-foreground">{listing.posted}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">कमोडिटी</div>
                      <div className="font-medium">{listing.commodity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">मात्रा</div>
                      <div className="font-medium">{listing.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">गुणवत्ता</div>
                      <Badge variant="outline">{listing.quality}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">स्थान</div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        {listing.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{listing.description}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      कॉल करें
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      मैसेज
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="sell" className="space-y-4">
            <Card className="border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle>अपनी फसल बेचें</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">कमोडिटी का नाम</label>
                    <Input placeholder="गेहूं, धान, सरसों..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">मात्रा (क्विंटल में)</label>
                    <Input placeholder="500" type="number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">मूल्य (प्रति क्विंटल)</label>
                    <Input placeholder="₹2,100" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">गुणवत्ता</label>
                    <Input placeholder="Grade A, Premium..." />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">विवरण</label>
                  <textarea 
                    className="w-full p-3 border rounded-md resize-none h-20 text-sm"
                    placeholder="अपनी फसल के बारे में विस्तार से बताएं..."
                  />
                </div>
                <Button className="w-full">
                  लिस्टिंग बनाएं
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default MarketplacePage;