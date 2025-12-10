import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

interface Guide {
  path: string;
  label: string;
  description: string;
}

const guides: Guide[] = [
  {
    path: '/guides/solar-buying-guide',
    label: 'Solar Buying Guide',
    description: 'Complete guide to buying solar in Texas'
  },
  {
    path: '/guides/choosing-installer-guide',
    label: 'How to Choose an Installer',
    description: 'How to select the right solar installer'
  },
  {
    path: '/guides/texas-incentives-guide',
    label: 'Texas Solar Incentives',
    description: 'All available solar incentives in Texas'
  },
  {
    path: '/guides/solar-financing-guide',
    label: 'Solar Financing Options',
    description: 'Financing options for solar systems'
  },
  {
    path: '/guides/battery-storage-guide',
    label: 'Battery Storage Guide',
    description: 'Solar battery storage options and costs'
  },
  {
    path: '/guides/solar-panel-types-guide',
    label: 'Solar Panel Types',
    description: 'Understanding different panel technologies'
  },
];

interface RelatedGuidesProps {
  currentPath?: string;
  limit?: number;
}

export const RelatedGuides = ({ currentPath, limit = 4 }: RelatedGuidesProps) => {
  // Filter out the current page if specified
  const filteredGuides = currentPath
    ? guides.filter(guide => guide.path !== currentPath)
    : guides;

  const displayGuides = filteredGuides.slice(0, limit);

  if (displayGuides.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-card to-muted/20 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Related Guides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayGuides.map((guide) => (
            <Link
              key={guide.path}
              href={guide.path}
              className="block group"
            >
              <div className="hover:bg-muted/50 p-3 rounded-lg transition-colors">
                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors mb-1">
                  {guide.label}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {guide.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border/50">
          <Link
            href="/learn"
            className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
          >
            View all guides
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
