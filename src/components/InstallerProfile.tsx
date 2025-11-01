import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck,
  Battery,
  Lightbulb,
  DollarSign,
  Clock,
  Award,
  Camera
} from 'lucide-react';
import { OptimizedImage } from "./OptimizedImage";
import { generateInstallerSlug } from "@/lib/slugify";
import { logEvent } from "@/lib/analytics";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  systemSize: string;
  completionDate: string;
  images: string[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

interface InstallerProfileProps {
  installer: {
    id: string;
    name: string;
    company_name?: string;
    description?: string;
    certification_type?: string;
    certification_number?: string;
    certification_expires?: string;
    location_city: string;
    location_state: string;
    phone?: string;
    email?: string;
    website?: string;
    founded_year?: number;
    rating?: number;
    review_count?: number;
    service_radius?: number;
    battery_certified?: boolean;
    financing_available?: boolean;
    is_premium?: boolean;
    is_verified?: boolean;
    featured_image?: string;
    projects?: Project[];
    reviews?: Review[];
  };
}

export const InstallerProfile = ({ installer }: InstallerProfileProps) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const displayName = installer.company_name || installer.name;
  const yearsInBusiness = installer.founded_year 
    ? new Date().getFullYear() - installer.founded_year 
    : null;

  const handleContactClick = (method: 'phone' | 'email' | 'website') => {
    logEvent('installer_contact_click', {
      installer_id: installer.id,
      method,
      is_premium: installer.is_premium
    });
  };

  return (
    <Card className="overflow-hidden">
      {/* Premium Banner */}
      {installer.is_premium && (
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-2 text-center">
          <Badge variant="premium" className="bg-primary text-primary-foreground">
            <Award className="h-3 w-3 mr-1" />
            Premium Installer
          </Badge>
        </div>
      )}

      {/* Header with Featured Image */}
      {installer.featured_image && (
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={installer.featured_image}
            alt={`${displayName} solar installation showcase`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>{installer.location_city}, {installer.location_state}</span>
              {installer.service_radius && (
                <Badge variant="outline" className="ml-2">
                  {installer.service_radius} mile radius
                </Badge>
              )}
            </div>
          </div>

          {installer.is_verified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              Verified
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {installer.rating && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-bold text-lg">{installer.rating}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {installer.review_count} Reviews
              </div>
            </div>
          )}

          {yearsInBusiness && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{yearsInBusiness}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Years Active
              </div>
            </div>
          )}

          {installer.battery_certified && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Battery className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">Yes</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Battery Certified
              </div>
            </div>
          )}

          {installer.financing_available && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">0%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Financing Available
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {installer.projects && installer.projects.length > 0 && (
              <TabsTrigger value="projects">
                Projects
                <Badge variant="secondary" className="ml-2">
                  {installer.projects.length}
                </Badge>
              </TabsTrigger>
            )}
            {installer.reviews && installer.reviews.length > 0 && (
              <TabsTrigger value="reviews">
                Reviews
                <Badge variant="secondary" className="ml-2">
                  {installer.reviews.length}
                </Badge>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {installer.description && (
              <p className="text-muted-foreground mb-6">
                {installer.description}
              </p>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-3">
              {installer.phone && (
                <Button
                  variant="outline"
                  onClick={() => handleContactClick('phone')}
                  asChild
                >
                  <a href={`tel:${installer.phone.replace(/\D/g, '')}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              )}
              {installer.email && (
                <Button
                  variant="outline"
                  onClick={() => handleContactClick('email')}
                  asChild
                >
                  <a href={`mailto:${installer.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
              )}
              {installer.website && (
                <Button
                  variant="outline"
                  onClick={() => handleContactClick('website')}
                  asChild
                >
                  <a 
                    href={installer.website.startsWith('http') 
                      ? installer.website 
                      : `https://${installer.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            {installer.projects?.map(project => (
              <Card key={project.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {project.images?.[0] && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <OptimizedImage
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </Badge>
                        <Badge variant="outline">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          {project.systemSize}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.completionDate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {installer.reviews?.map(review => (
              <Card key={review.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {review.text}
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        {review.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};