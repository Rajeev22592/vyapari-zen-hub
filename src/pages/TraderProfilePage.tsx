import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Star, MessageSquare, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTraderById } from "@/services/traders";

const TraderProfilePage = () => {
  const { traderId } = useParams();

  const { data: trader } = useQuery({ queryKey: ["trader","detail", traderId], queryFn: () => fetchTraderById(traderId || ""), enabled: Boolean(traderId) });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <Link to="/directory" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Directory
          </Link>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={(trader as any)?.avatarUrl || "/api/placeholder/64/64"} alt={trader?.name || ""} />
                <AvatarFallback>{trader?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">{trader?.name}</h1>
                  {(trader as any)?.verified && <Badge className="bg-gradient-success text-primary-foreground">✓ Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{(trader as any)?.business}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {typeof (trader as any)?.location === 'string' ? (trader as any)?.location : (trader as any)?.location?.label}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Star className="h-4 w-4 fill-current text-accent" />
                  <span className="text-sm font-medium">{(trader as any)?.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {Array.isArray((trader as any)?.specialities) && (trader as any)?.specialities.map((s: string) => (
                <Badge key={s} variant="outline">{s}</Badge>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline"><Phone className="h-4 w-4 mr-2" /> {(trader as any)?.phoneMasked || ''}</Button>
              <Button><MessageSquare className="h-4 w-4 mr-2" /> Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Active Listings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Replace with backend listings when available */}
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default TraderProfilePage;
