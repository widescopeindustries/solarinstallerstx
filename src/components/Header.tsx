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
            <Link to="/installers" className="text-sm font-medium hover:text-primary transition-colors">
              Find Installers
            </Link>
            <Link to="/quote" className="text-sm font-medium hover:text-primary transition-colors">
              Get Quotes
            </Link>
            <Link to="/learn" className="text-sm font-medium hover:text-primary transition-colors">
              Learn
            </Link>

            {/* Visual separator for installer funnel */}
            <div className="h-6 w-px bg-border mx-2" />

            {/* Installer CTA - separate funnel */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 font-semibold"
            >
              <Link
                to="/upgrade-to-premium"
                onClick={() => trackGetListedClicked('header')}
                className="flex items-center gap-1.5"
              >
                <Building2 className="h-4 w-4" />
                For Installers: Get Listed
              </Link>
            </Button>

            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                  {isAdmin && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Admin
                    </span>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
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
                  to="/installers"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Installers
                </Link>
                <Link
                  to="/quote"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quotes
                </Link>
                <Link
                  to="/learn"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Learn
                </Link>
                <Link
                  to="/blog"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>

                {/* Installer CTA - separate section */}
                <div className="border-t-2 border-orange-500/30 pt-4 mt-4">
                  <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2">
                    FOR SOLAR COMPANIES
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mb-3 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
                    onClick={() => {
                      trackGetListedClicked('mobile_menu');
                      navigate("/upgrade-to-premium");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Get Listed on Our Directory
                  </Button>
                </div>

                <div className="border-t pt-4 mt-4">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-2 mb-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}

                  {user ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                        <User className="h-4 w-4" />
                        <span>{user.email}</span>
                        {isAdmin && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Admin
                          </span>
                        )}
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
                    </>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => {
                        navigate("/auth");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
