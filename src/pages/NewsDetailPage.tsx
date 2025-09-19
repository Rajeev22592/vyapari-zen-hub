import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsById } from "@/services/news";

const NewsDetailPage = () => {
  const { articleId } = useParams();

  const { data: article } = useQuery({ queryKey: ["news","detail", articleId], queryFn: () => fetchNewsById(articleId || "") , enabled: Boolean(articleId)});

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Link to="/broadcast" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to News
          </Link>
          <div className="space-x-2">
            <Button variant="ghost" size="sm"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
            <Button variant="ghost" size="sm"><Bookmark className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardContent className="p-4 space-y-3">
            <div className="text-xs text-muted-foreground">{article?.category} • {article?.time}</div>
            <h1 className="text-2xl font-bold text-foreground">{article?.title}</h1>
            <div className="w-full h-48 bg-muted/50 rounded-md" />
            <div className="prose prose-sm max-w-none text-foreground">
              <p>{article?.content}</p>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default NewsDetailPage;
