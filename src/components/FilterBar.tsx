import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All" },
  { id: "premium", label: "Premium", icon: Crown },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "maintenance", label: "Maintenance" },
  { id: "financing", label: "Financing Available" },
];

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="bg-card border-y border-border py-4 sticky top-0 z-20 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
      </div>
    </div>
  );
};