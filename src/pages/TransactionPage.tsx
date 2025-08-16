import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, MapPin, User, TrendingUp, FileText, Phone, MessageCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TransactionPage = () => {
  const { t } = useLanguage();

  const activeDeals = [
    {
      id: 1,
      commodity: "गेहूं",
      quantity: "500 क्विंटल",
      price: "₹2,100/क्विंटल",
      totalAmount: "₹10,50,000",
      buyer: "सुनील गुप्ता",
      location: "दिल्ली मंडी",
      status: "pending",
      statusText: "पेंडिंग",
      date: "15 जनवरी 2024",
      deliveryDate: "20 जनवरी 2024",
      paymentTerms: "50% अग्रिम, 50% डिलीवरी पर"
    },
    {
      id: 2,
      commodity: "धान",
      quantity: "300 क्विंटल",
      price: "₹1,850/क्विंटल",
      totalAmount: "₹5,55,000",
      buyer: "प्रदीप सिंह",
      location: "लुधियाना मंडी",
      status: "confirmed",
      statusText: "कन्फर्म",
      date: "12 जनवरी 2024",
      deliveryDate: "18 जनवरी 2024",
      paymentTerms: "100% अग्रिम"
    }
  ];

  const completedDeals = [
    {
      id: 3,
      commodity: "सरसों",
      quantity: "200 क्विंटल",
      price: "₹4,800/क्विंटल",
      totalAmount: "₹9,60,000",
      buyer: "राजेश शर्मा",
      location: "जयपुर मंडी",
      status: "completed",
      statusText: "पूर्ण",
      date: "5 जनवरी 2024",
      completedDate: "10 जनवरी 2024",
      rating: 4.8
    },
    {
      id: 4,
      commodity: "चना",
      quantity: "150 क्विंटल",
      price: "₹5,200/क्विंटल",
      totalAmount: "₹7,80,000",
      buyer: "अमित कुमार",
      location: "कानपुर मंडी",
      status: "completed",
      statusText: "पूर्ण",
      date: "28 दिसंबर 2023",
      completedDate: "2 जनवरी 2024",
      rating: 4.9
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">मेरे सौदे</h1>
          <p className="text-muted-foreground">अपने सभी ट्रेडिंग लेन-देन देखें और प्रबंधित करें</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">सक्रिय सौदे</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">₹16.05L</div>
              <div className="text-sm text-muted-foreground">कुल लेन-देन</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">4.85⭐</div>
              <div className="text-sm text-muted-foreground">औसत रेटिंग</div>
            </CardContent>
          </Card>
        </div>

        {/* Deals Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">सक्रिय सौदे</TabsTrigger>
            <TabsTrigger value="completed">पूर्ण सौदे</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeDeals.map((deal) => (
              <Card key={deal.id} className="border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{deal.commodity}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        {deal.buyer}
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        {deal.location}
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(deal.status)} border-0`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(deal.status)}
                        {deal.statusText}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">मात्रा</div>
                      <div className="font-medium">{deal.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">दर</div>
                      <div className="font-medium">{deal.price}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">कुल राशि</div>
                      <div className="font-bold text-primary">{deal.totalAmount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">डिलीवरी तिथि</div>
                      <div className="font-medium">{deal.deliveryDate}</div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium mb-1">भुगतान शर्तें:</div>
                    <div className="text-sm text-muted-foreground">{deal.paymentTerms}</div>
                  </div>
                  
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
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedDeals.map((deal) => (
              <Card key={deal.id} className="border-border/50 shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{deal.commodity}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        {deal.buyer}
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        {deal.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(deal.status)} border-0 mb-2`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(deal.status)}
                          {deal.statusText}
                        </span>
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {deal.completedDate}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">मात्रा</div>
                      <div className="font-medium">{deal.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">दर</div>
                      <div className="font-medium">{deal.price}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">कुल राशि</div>
                      <div className="font-bold text-primary">{deal.totalAmount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">रेटिंग</div>
                      <div className="font-medium">⭐ {deal.rating}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      रसीद डाउनलोड करें
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      फिर से ऑर्डर करें
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default TransactionPage;