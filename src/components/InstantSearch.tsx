import { useState, useEffect, useCallback, useMemo } from 'react';
import { Command } from "cmdk";
import { SearchIcon, Filter, Star, Award, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import debounce from 'lodash.debounce';
import { logEvent } from "@/lib/analytics";

interface InstantSearchProps {
  onFilterChange: (filters: FilterState) => void;
  onSearch: (query: string) => void;
  totalResults: number;
  className?: string;
  initialFilters?: Partial<FilterState>;
}

interface FilterState {
  certification: string[];
  priceRange: [number, number];
  rating: number | null;
  features: string[];
  location: string[];
  sorting: 'relevance' | 'rating' | 'reviews' | 'price';
}

const certifications = [
  { label: 'NABCEP PVIP', value: 'PVIP' },
  { label: 'NABCEP PVSI', value: 'PVSI' },
  { label: 'TXSEIA Member', value: 'TXSEIA' },
  { label: 'Energy Storage', value: 'ESIP' },
];

const features = [
  { label: 'Battery Installation', value: 'battery' },
  { label: 'Financing Available', value: 'financing' },
  { label: 'Premium Service', value: 'premium' },
  { label: 'Emergency Support', value: 'emergency' },
  { label: 'Commercial Projects', value: 'commercial' },
  { label: '10+ Years Experience', value: 'experienced' },
];

const locations = [
  'Austin', 'Dallas', 'Houston', 'San Antonio',
  'Fort Worth', 'El Paso', 'Arlington', 'Plano'
].map(city => ({ label: city, value: city.toLowerCase() }));

const sortOptions = [
  { label: 'Best Match', value: 'relevance' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
  { label: 'Price: Low to High', value: 'price' }
];

export function InstantSearch({ 
  onFilterChange, 
  onSearch, 
  totalResults,
  className,
  initialFilters 
}: InstantSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    certification: [],
    priceRange: [10000, 50000],
    rating: null,
    features: [],
    location: [],
    sorting: 'relevance',
    ...initialFilters
  });

  // Debounce search to prevent too many API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
      logEvent('instant_search', { query, filters });
    }, 300),
    [onSearch, filters]
  );

  // Update search results when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return count + (value ? 1 : 0);
    }, 0);
  }, [filters]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 pr-4"
            placeholder="Search installers by name, city, or certification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              role="combobox" 
              aria-expanded={isOpen}
              className="min-w-[150px] justify-between"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 rounded-sm px-1 font-normal"
                >
                  {activeFilterCount}
                </Badge>
              )}
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="end">
            <Command>
              <div className="p-4 pb-0">
                <h4 className="mb-2 text-sm font-medium">Sort by</h4>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={filters.sorting === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, sorting: option.value as any }))}
                      className="text-xs"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h4 className="mb-2 text-sm font-medium">Certification</h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <Button
                      key={cert.value}
                      variant={filters.certification.includes(cert.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          certification: prev.certification.includes(cert.value)
                            ? prev.certification.filter(c => c !== cert.value)
                            : [...prev.certification, cert.value]
                        }));
                      }}
                      className="text-xs"
                    >
                      <Award className="mr-1 h-3 w-3" />
                      {cert.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h4 className="mb-2 text-sm font-medium">Features</h4>
                <ScrollArea className="h-[200px] rounded-md border p-2">
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <Button
                        key={feature.value}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            features: prev.features.includes(feature.value)
                              ? prev.features.filter(f => f !== feature.value)
                              : [...prev.features, feature.value]
                          }));
                        }}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          filters.features.includes(feature.value) && "font-medium"
                        )}
                      >
                        {filters.features.includes(feature.value) && (
                          <Check className="mr-2 h-3 w-3" />
                        )}
                        {feature.label}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4">
                <h4 className="mb-2 text-sm font-medium">Rating</h4>
                <div className="flex gap-1">
                  {[5,4,3,2,1].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.rating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          rating: prev.rating === rating ? null : rating
                        }));
                      }}
                      className="px-3"
                    >
                      <Star className={cn(
                        "h-3 w-3",
                        filters.rating === rating ? "fill-primary-foreground" : "fill-none"
                      )} />
                      {rating}+
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 pt-0">
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setFilters({
                        certification: [],
                        priceRange: [10000, 50000],
                        rating: null,
                        features: [],
                        location: [],
                        sorting: 'relevance'
                      });
                    }}
                    className="w-full justify-start text-sm text-muted-foreground"
                  >
                    Reset all filters
                  </Button>
                )}
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {(searchQuery || activeFilterCount > 0) && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
            {totalResults} results
          </Badge>
          
          <ScrollArea className="max-w-[600px]" orientation="horizontal">
            <div className="flex gap-2">
              {filters.certification.map((cert) => (
                <Badge key={cert} variant="outline" className="rounded-full">
                  {certifications.find(c => c.value === cert)?.label}
                  <button
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        certification: prev.certification.filter(c => c !== cert)
                      }));
                    }}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </Badge>
              ))}
              {filters.features.map((feature) => (
                <Badge key={feature} variant="outline" className="rounded-full">
                  {features.find(f => f.value === feature)?.label}
                  <button
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        features: prev.features.filter(f => f !== feature)
                      }));
                    }}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </Badge>
              ))}
              {filters.rating && (
                <Badge variant="outline" className="rounded-full">
                  {filters.rating}+ Stars
                  <button
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        rating: null
                      }));
                    }}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </Badge>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}