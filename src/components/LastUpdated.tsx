import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LastUpdatedProps {
  date?: Date;
  className?: string;
}

export const LastUpdated = ({ 
  date = new Date(), 
  className = "" 
}: LastUpdatedProps) => {
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Calendar className="h-4 w-4" />
      <span>Last Updated: <strong>{formattedDate}</strong></span>
      <Badge variant="secondary" className="ml-2">Current</Badge>
    </div>
  );
};

