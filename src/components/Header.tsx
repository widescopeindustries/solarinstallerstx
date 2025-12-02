'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { trackGetListedClicked } from "@/lib/analytics";
import { Menu, LogOut, User, Shield, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              SolarInstallersTX
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/installers" className="text-sm font-medium hover:text-primary transition-colors" title="Browse certified solar installers across Texas">
              Find Installers
            </Link>
            <Link to="/quote" className="text-sm font-medium hover:text-primary transition-colors" title="Get free solar quotes from multiple installers">
              Get Free Quotes
            </Link>
            <Link to="/learn" className="text-sm font-medium hover:text-primary transition-colors" title="Learn about solar energy and incentives">
              Solar Learning Center
            </Link>

            {isAdmin && (
              <>
                <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Admin
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
                type="button"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/installers"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Browse certified solar installers across Texas"
                >
                  Find Certified Installers
                </Link>
                <Link
                  to="/quote"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Get free solar quotes from multiple installers"
                >
                  Get Free Solar Quotes
                </Link>
                <Link
                  to="/learn"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Learn about solar energy and Texas incentives"
                >
                  Solar Learning Center
                </Link>
                <Link
                  to="/faq"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Frequently asked questions about solar"
                >
                  FAQ
                </Link>
                <Link
                  to="/blog"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Read latest solar news and insights"
                >
                  Solar Blog
                </Link>

                {isAdmin && (
                  <div className="border-t pt-4 mt-4">
                    <Link
                      to="/admin"
                      className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-2 mb-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Admin
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
