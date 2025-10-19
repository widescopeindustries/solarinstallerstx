import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Star } from "lucide-react";

interface ServiceAreaMapProps {
  className?: string;
}

export const ServiceAreaMap = ({ className = "" }: ServiceAreaMapProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = [
    {
      name: "Austin",
      population: "978,908",
      solarPotential: "Excellent",
      avgCost: "$2.85/watt",
      incentives: "Up to $2,500",
      installers: 45,
      rating: 4.8,
      phone: "(512) 555-0123",
      email: "austin@solarinstallerstx.com"
    },
    {
      name: "Houston",
      population: "2,304,580",
      solarPotential: "Excellent",
      avgCost: "$2.75/watt",
      incentives: "Limited",
      installers: 52,
      rating: 4.7,
      phone: "(713) 555-0124",
      email: "houston@solarinstallerstx.com"
    },
    {
      name: "Dallas",
      population: "1,304,379",
      solarPotential: "Excellent",
      avgCost: "$2.90/watt",
      incentives: "City Programs",
      installers: 38,
      rating: 4.9,
      phone: "(214) 555-0125",
      email: "dallas@solarinstallerstx.com"
    },
    {
      name: "San Antonio",
      population: "1,547,253",
      solarPotential: "Excellent",
      avgCost: "$2.80/watt",
      incentives: "Up to $2,500",
      installers: 41,
      rating: 4.8,
      phone: "(210) 555-0126",
      email: "sanantonio@solarinstallerstx.com"
    },
    {
      name: "Fort Worth",
      population: "918,915",
      solarPotential: "Good",
      avgCost: "$2.85/watt",
      incentives: "Limited",
      installers: 28,
      rating: 4.6,
      phone: "(817) 555-0127",
      email: "fortworth@solarinstallerstx.com"
    },
    {
      name: "El Paso",
      population: "678,815",
      solarPotential: "Excellent",
      avgCost: "$2.70/watt",
      incentives: "None",
      installers: 22,
      rating: 4.7,
      phone: "(915) 555-0128",
      email: "elpaso@solarinstallerstx.com"
    }
  ];

  const getSolarPotentialColor = (potential: string) => {
    switch (potential) {
      case "Excellent": return "bg-green-100 text-green-800 border-green-200";
      case "Good": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Fair": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Texas Solar Service Areas
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Click on any city to see detailed solar information, local installers, and incentives available in your area.
        </p>
      </div>

      {/* Interactive City Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <Card 
            key={city.name}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCity === city.name ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{city.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{city.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Population: {city.population}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Solar Potential:</span>
                <Badge className={getSolarPotentialColor(city.solarPotential)}>
                  {city.solarPotential}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Cost:</span>
                <span className="text-sm font-semibold">{city.avgCost}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Incentives:</span>
                <span className="text-sm">{city.incentives}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Installers:</span>
                <span className="text-sm font-semibold">{city.installers}</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCity(city.name);
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed City Information */}
      {selectedCity && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              {selectedCity} Solar Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const city = cities.find(c => c.name === selectedCity);
              if (!city) return null;

              return (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Solar Market Overview</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Population:</span>
                          <span className="font-semibold">{city.population}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Solar Potential:</span>
                          <Badge className={getSolarPotentialColor(city.solarPotential)}>
                            {city.solarPotential}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Cost:</span>
                          <span className="font-semibold">{city.avgCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available Incentives:</span>
                          <span className="font-semibold">{city.incentives}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Certified Installers:</span>
                          <span className="font-semibold">{city.installers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{city.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Local Solar Benefits</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• High solar irradiance with 5+ peak sun hours daily</li>
                        <li>• Net metering programs available</li>
                        <li>• Property tax exemption for solar installations</li>
                        <li>• Strong local installer network with NABCEP certification</li>
                        <li>• Competitive pricing due to market maturity</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Contact Local Team</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{city.phone}</div>
                            <div className="text-sm text-muted-foreground">Local Solar Team</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{city.email}</div>
                            <div className="text-sm text-muted-foreground">Email Support</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button className="w-full">
                          Get Free Quote for {city.name}
                        </Button>
                        <Button variant="outline" className="w-full">
                          Find Installers in {city.name}
                        </Button>
                        <Button variant="outline" className="w-full">
                          View {city.name} Solar Incentives
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                      <p className="text-sm text-blue-800">
                        {city.name} has excellent solar potential with {city.solarPotential.toLowerCase()} conditions. 
                        With {city.installers} certified installers and {city.incentives !== 'None' ? 'strong incentives' : 'competitive pricing'}, 
                        now is an ideal time to go solar in {city.name}.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Ready to Go Solar in Your City?</h3>
        <p className="text-lg mb-6 opacity-90">
          Get connected with NABCEP certified installers in your area and start saving on your energy bills today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Get Free Solar Quotes
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            Calculate Your Savings
          </Button>
        </div>
      </div>
    </div>
  );
};
