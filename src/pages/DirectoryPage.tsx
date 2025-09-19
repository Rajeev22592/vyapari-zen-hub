import { useState } from "react";
import { Search, MapPin, Phone, Star, Filter, UserPlus } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTraders } from "@/services/traders";

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLanguage();

  const { data } = useQuery({ queryKey: ["traders", { search: searchTerm }], queryFn: () => fetchTraders({ search: searchTerm, page: 1, perPage: 20 }) });
  const traders = data?.data || [];

  const filteredTraders = traders;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("directory.title")}</h1>
            <p className="text-muted-foreground">{t("directory.subtitle")}</p>
          </div>
          <Link to="/directory/join">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              {t("directory.join")}
            </Button>
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("directory.search")}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-success/10 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">2,456</div>
              <div className="text-sm text-muted-foreground">{t("directory.stats.active")}</div>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-foreground">1,890</div>
              <div className="text-sm text-muted-foreground">{t("directory.stats.verified")}</div>
            </CardContent>
          </Card>
          <Card className="bg-grain/10 border-grain/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-grain-foreground">156</div>
              <div className="text-sm text-muted-foreground">{t("directory.stats.cities")}</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">{t("directory.stats.rating")}</div>
            </CardContent>
          </Card>
        </div>

        {/* Trader List */}
        <div className="space-y-4">
          {filteredTraders.map((trader) => (
            <Card key={trader.id} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={(trader as any).avatarUrl || "/api/placeholder/40/40"} alt={trader.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {trader.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{trader.name}</h3>
                      {trader.verified && (
                        <Badge className="bg-gradient-success text-primary-foreground text-xs">
                          ✓ {t("directory.verified")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{trader.business}</p>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{typeof trader.location === 'string' ? trader.location : (trader.location.label || `${trader.location.city || ''}${trader.location.state ? ', ' + trader.location.state : ''}`)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 fill-current text-accent" />
                      <span className="text-sm font-medium">{trader.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("directory.speciality")}</p>
                    <p className="text-sm font-medium text-foreground">{Array.isArray(trader.specialities) ? trader.specialities.join(', ') : (trader as any).speciality || ''}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{(trader as any).phoneMasked || ''}</span>
                    </div>
                    <div className="space-x-2">
                      <Link to={`/directory/${trader.id}`}>
                        <Button variant="outline" size="sm">
                          {t("directory.viewProfile")}
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        {t("directory.connect")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DirectoryPage;