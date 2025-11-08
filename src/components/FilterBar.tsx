import { Button } from "@/components/ui/button";
import { Crown, MapPin, Grid3x3 } from "lucide-react";
import { InstantSearch } from "./InstantSearch";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  viewMode?: 'grid' | 'map';
  onViewModeChange?: (mode: 'grid' | 'map') => void;
  showViewToggle?: boolean;
  totalResults: number;
  onSearch: (query: string) => void;
  onAdvancedFilterChange: (filters: any) => void;
  className?: string;
}

const filters = [
  { id: "all", label: "All Installers", title: "View all solar installers" },
  { id: "gold", label: "Gold Tier", title: "View Gold Tier installers (85-100 score)", icon: Crown },
  { id: "silver", label: "Silver Tier", title: "View Silver Tier installers (70-84 score)", icon: Crown },
  { id: "bronze", label: "Bronze Tier", title: "View Bronze Tier installers (60-69 score)", icon: Crown },
  { id: "nabcep", label: "NABCEP Certified", title: "View NABCEP certified solar professionals", icon: Crown },
  { id: "premium", label: "Premium Listed", title: "View premium featured installers", icon: Crown },
  { id: "verified", label: "Verified Only", title: "View verified installers only" },
  { id: "pvip", label: "PVIP Certified", title: "View PVIP certified installers" },
  { id: "pvsi", label: "PVSI Certified", title: "View PVSI certified installers" },
  { id: "esip", label: "Energy Storage", title: "View installers with energy storage expertise" },
  { id: "residential", label: "Residential Only", title: "View residential solar installers" },
  { id: "commercial", label: "Commercial", title: "View commercial solar installers" },
  { id: "maintenance", label: "Maintenance Services", title: "View installers offering maintenance services" },
  { id: "financing", label: "Financing Available", title: "View installers offering financing options" },
];

export const FilterBar = ({
  activeFilter,
  onFilterChange,
  viewMode = 'grid',
  onViewModeChange,
  showViewToggle = true,
  totalResults,
  onSearch,
  onAdvancedFilterChange,
  className
}: FilterBarProps) => {
  return (
    <div className={cn("bg-card border-y border-border py-4 sticky top-0 z-20 backdrop-blur-sm bg-card/95", className)}>
      <div className="container mx-auto px-4">
        <InstantSearch 
          onSearch={onSearch}
          onFilterChange={onAdvancedFilterChange}
          totalResults={totalResults}
          className="mb-4"
        />
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              const isPremium = filter.id === "premium";

              return (
                <Button
                  key={filter.id}
                  variant={isActive ? (isPremium ? "premium" : "default") : "outline"}
                  size="sm"
                  onClick={() => onFilterChange(filter.id)}
                  className="whitespace-nowrap transition-all"
                  title={filter.title || "Filter solar installers"}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {filter.label}
                </Button>
              );
            })}
          </div>

          {showViewToggle && onViewModeChange && (
            <div className="flex gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="h-8 px-3"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('map')}
                className="h-8 px-3"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};