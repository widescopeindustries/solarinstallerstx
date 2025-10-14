import { Button } from "@/components/ui/button";
import { Crown, MapPin, Grid3x3 } from "lucide-react";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  viewMode: 'grid' | 'map';
  onViewModeChange: (mode: 'grid' | 'map') => void;
}

const filters = [
  { id: "all", label: "All" },
  { id: "premium", label: "Premium", icon: Crown },
  { id: "pvip", label: "PVIP Certified" },
  { id: "pvsi", label: "PVSI Certified" },
  { id: "esip", label: "Energy Storage" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "maintenance", label: "Maintenance" },
  { id: "financing", label: "Financing Available" },
];

export const FilterBar = ({ activeFilter, onFilterChange, viewMode, onViewModeChange }: FilterBarProps) => {
  return (
    <div className="bg-card border-y border-border py-4 sticky top-0 z-20 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-3">
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
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {filter.label}
                </Button>
              );
            })}
          </div>
          
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
        </div>
      </div>
    </div>
  );
};