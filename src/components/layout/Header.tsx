import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-xs">VD</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">{t("header.title")}</h1>
            <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("header.search")}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/area-selection">Area Selection</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/marketplace">Marketplace</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/watchlist">Watchlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/analysis">Analysis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/markets-up">Markets Up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/markets-down">Markets Down</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/total-mandis">Total Mandis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/total-commodities">Total Commodities</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/transactions">Transactions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/notifications">Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/directory/join">Join Network</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help">Help & Support</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/privacy-security">Privacy & Security</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;