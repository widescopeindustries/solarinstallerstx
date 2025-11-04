import { useState, useEffect } from 'react';
import { AddressSearch } from './AddressSearch';
import { FilterBar } from './FilterBar';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Star, 
  ShieldCheck, 
  Award,
  Battery,
  DollarSign,
  Filter
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { logEvent } from "@/lib/analytics";

interface FilterState {
  certification: string[];
  priceRange: [number, number];
  rating: number;
  batteryInstall: boolean;
  financing: boolean;
  yearInBusiness: number;
}

interface AddressResult {
  city?: string;
  state?: string;
  zip?: string;
  address?: string;
}

interface EnhancedSearchProps {
  onFilterChange: (filters: FilterState) => void;
  onAddressSelect: (result: AddressResult) => void;
  totalResults?: number;
  className?: string;
}

export const EnhancedSearch = ({
  onFilterChange,
  onAddressSelect,
  totalResults = 0,
  className = ''
}: EnhancedSearchProps) => {
  const [filters, setFilters] = useState<FilterState>({
    certification: [],
    priceRange: [10000, 50000],
    rating: 4,
    batteryInstall: false,
    financing: false,
    yearInBusiness: 2
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update parent when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleAddressSelect = (result: AddressResult) => {
    onAddressSelect(result);
    logEvent('enhanced_search_address_select', {
      city: result.city,
      filters: filters
    });
  };

  return (
    <div className={className}>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-[1fr,auto] gap-4">
            <AddressSearch onSearchResult={handleAddressSelect} />
            
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {Object.values(filters).some(v => 
                    Array.isArray(v) ? v.length > 0 : Boolean(v)
                  ) && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Refine Your Search</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6 mt-4">
                  {/* Certification */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Certification</h4>
                    <div className="space-y-2">
                      {['NABCEP', 'TXSEIA', 'Other'].map(cert => (
                        <div key={cert} className="flex items-center">
                          <Switch
                            checked={filters.certification.includes(cert)}
                            onCheckedChange={(checked) => {
                              setFilters(prev => ({
                                ...prev,
                                certification: checked 
                                  ? [...prev.certification, cert]
                                  : prev.certification.filter(c => c !== cert)
                              }));
                            }}
                          />
                          <label className="ml-2 text-sm">{cert}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">System Price Range</h4>
                    <Slider
                      defaultValue={[10000, 50000]}
                      max={100000}
                      min={5000}
                      step={1000}
                      value={filters.priceRange}
                      onValueChange={(value) => {
                        setFilters(prev => ({
                          ...prev,
                          priceRange: value as [number, number]
                        }));
                      }}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>${filters.priceRange[0].toLocaleString()}</span>
                      <span>${filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Minimum Rating</h4>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(rating => (
                        <Button
                          key={rating}
                          variant={filters.rating === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              rating
                            }));
                          }}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              filters.rating === rating 
                                ? "fill-primary-foreground" 
                                : "fill-none"
                            }`}
                          />
                          {rating}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Switch
                          checked={filters.batteryInstall}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({
                              ...prev,
                              batteryInstall: checked
                            }));
                          }}
                        />
                        <label className="ml-2 text-sm flex items-center">
                          <Battery className="h-4 w-4 mr-1" />
                          Battery Installation
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Switch
                          checked={filters.financing}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({
                              ...prev,
                              financing: checked
                            }));
                          }}
                        />
                        <label className="ml-2 text-sm flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Financing Available
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Years in Business */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Years in Business</h4>
                    <Slider
                      defaultValue={[2]}
                      max={20}
                      min={0}
                      step={1}
                      value={[filters.yearInBusiness]}
                      onValueChange={([value]) => {
                        setFilters(prev => ({
                          ...prev,
                          yearInBusiness: value
                        }));
                      }}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {filters.yearInBusiness}+ years
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {totalResults > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="secondary" className="text-sm">
            {totalResults} Results
          </Badge>
          <div className="flex gap-2">
            {filters.certification.includes('NABCEP') && (
              <Badge variant="outline" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                NABCEP
              </Badge>
            )}
            {filters.batteryInstall && (
              <Badge variant="outline" className="text-xs">
                <Battery className="h-3 w-3 mr-1" />
                Battery
              </Badge>
            )}
            {filters.financing && (
              <Badge variant="outline" className="text-xs">
                <DollarSign className="h-3 w-3 mr-1" />
                Financing
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};