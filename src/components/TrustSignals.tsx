import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Star, Users, CheckCircle, Clock } from "lucide-react";

export const TrustSignals = () => {
  return (
    <div className="w-full">
      {/* Main Trust Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Shield className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">NABCEP Certified</h3>
            <p className="text-sm text-muted-foreground">
              All installers verified by North American Board of Certified Energy Practitioners
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Award className="h-8 w-8 text-green-600 mx-auto" />
            <h3 className="font-semibold">BBB A+ Rating</h3>
            <p className="text-sm text-muted-foreground">
              Better Business Bureau accredited with A+ rating
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Star className="h-8 w-8 text-yellow-500 mx-auto" />
            <h3 className="font-semibold">4.8/5 Rating</h3>
            <p className="text-sm text-muted-foreground">
              Average customer rating across 150+ verified reviews
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Users className="h-8 w-8 text-blue-600 mx-auto" />
            <h3 className="font-semibold">500+ Installations</h3>
            <p className="text-sm text-muted-foreground">
              Successfully completed solar installations across Texas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Trust Elements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <h4 className="font-semibold">Licensed & Insured</h4>
            <p className="text-sm text-muted-foreground">TDLR electrical contractor licenses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <Clock className="h-6 w-6 text-blue-600" />
          <div>
            <h4 className="font-semibold">25-Year Warranty</h4>
            <p className="text-sm text-muted-foreground">Comprehensive system warranties</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
          <Shield className="h-6 w-6 text-purple-600" />
          <div>
            <h4 className="font-semibold">Free Consultation</h4>
            <p className="text-sm text-muted-foreground">No obligation site assessment</p>
          </div>
        </div>
      </div>

      {/* Certifications & Awards */}
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Certifications & Awards</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="outline" className="px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            NABCEP Certified
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            BBB A+ Rating
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Google 5-Star Reviews
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            TDLR Licensed
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            500+ Installations
          </Badge>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-center">What Our Customers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardContent className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic">
                "Professional, knowledgeable, and trustworthy. Our solar installation was completed on time and under budget."
              </p>
              <p className="text-xs text-muted-foreground">- Jennifer L., Dallas TX</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic">
                "Our electricity bills have dropped by 85%! The NABCEP certified installer made everything seamless."
              </p>
              <p className="text-xs text-muted-foreground">- Sarah M., Austin TX</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic">
                "Excellent service from start to finish. The system has exceeded our energy production expectations."
              </p>
              <p className="text-xs text-muted-foreground">- Michael R., Houston TX</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
