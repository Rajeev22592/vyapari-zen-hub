import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Shield, Star, Upload, Phone, Mail, MapPin, Calendar, Edit, Save } from "lucide-react";

const ProfilePage = () => {
  const { t } = useLanguage();

  const userProfile = {
    name: "राम कुमार शर्मा",
    type: "किसान",
    phone: "+91 98765 43210",
    email: "ram.kumar@example.com",
    location: "कानपुर, उत्तर प्रदेश",
    joinDate: "जनवरी 2023",
    verified: true,
    rating: 4.8,
    totalTrades: 45,
    specialities: ["गेहूं", "धान", "सरसों"],
    description: "20 सालों से खेती कर रहा हूं। उच्च गुणवत्ता की फसल उगाता हूं और समय पर डिलीवरी करता हूं।"
  };

  const tradingStats = [
    { label: "कुल ट्रेड", value: "45", icon: "📊" },
    { label: "सफल ट्रेड", value: "42", icon: "✅" },
    { label: "रेटिंग", value: "4.8⭐", icon: "⭐" },
    { label: "सदस्यता", value: "1+ साल", icon: "📅" }
  ];

  const documents = [
    { name: "आधार कार्ड", status: "सत्यापित", icon: "✅" },
    { name: "किसान आईडी", status: "सत्यापित", icon: "✅" },
    { name: "बैंक पासबुक", status: "पेंडिंग", icon: "⏳" },
    { name: "भूमि रिकॉर्ड", status: "सत्यापित", icon: "✅" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">
                    {userProfile.name.charAt(0)}
                  </span>
                </div>
                <Button size="sm" className="absolute -bottom-1 -right-1 w-8 h-8 p-0 rounded-full">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold">{userProfile.name}</h1>
                  {userProfile.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      सत्यापित
                    </Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-2">{userProfile.type}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{userProfile.rating}</span>
                  <span className="text-sm text-muted-foreground">({userProfile.totalTrades} ट्रेड)</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {userProfile.specialities.map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                संपादित करें
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>संपर्क जानकारी</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  फोन नंबर
                </label>
                <Input value={userProfile.phone} />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  ईमेल
                </label>
                <Input value={userProfile.email} />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  स्थान
                </label>
                <Input value={userProfile.location} />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  सदस्यता तिथि
                </label>
                <Input value={userProfile.joinDate} disabled />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">विवरण</label>
              <Textarea 
                value={userProfile.description}
                className="resize-none h-20"
              />
            </div>
            
            <Button>
              <Save className="w-4 h-4 mr-2" />
              सेव करें
            </Button>
          </CardContent>
        </Card>

        {/* Trading Statistics */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>ट्रेडिंग आंकड़े</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tradingStats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Verification */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>दस्तावेज़ सत्यापन</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{doc.icon}</span>
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === "सत्यापित" ? "default" : "secondary"}>
                      {doc.status}
                    </Badge>
                    {doc.status === "पेंडिंग" && (
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        अपलोड
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">सत्यापन के फायदे:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• अधिक विश्वसनीयता</li>
                <li>• बेहतर ट्रेडिंग अवसर</li>
                <li>• प्राथमिकता सपोर्ट</li>
                <li>• उच्च रेटिंग</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;