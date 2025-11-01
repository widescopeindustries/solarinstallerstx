import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays,
  Users,
  Phone,
  Mail,
  MousePointerClick,
  Star,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface Analytics {
  pageViews: number;
  contactClicks: {
    phone: number;
    email: number;
    website: number;
  };
  quoteRequests: number;
  averageRating: number;
  totalReviews: number;
  profileCompleteness: number;
  conversionRate: number;
  searchImpressions: number;
  cityBreakdown: {
    city: string;
    views: number;
  }[];
  dailyStats: {
    date: string;
    views: number;
    contacts: number;
    quotes: number;
  }[];
}

interface InstallerDashboardProps {
  installerId: string;
  analytics: Analytics;
}

export const InstallerDashboard = ({ installerId, analytics }: InstallerDashboardProps) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Track your performance and customer engagement
          </p>
        </div>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Profile Views
                </p>
                <h3 className="text-2xl font-bold">{analytics.pageViews}</h3>
              </div>
              <Users className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Contact Rate
                </p>
                <h3 className="text-2xl font-bold">
                  {(analytics.conversionRate * 100).toFixed(1)}%
                </h3>
              </div>
              <MousePointerClick className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              {Object.entries(analytics.contactClicks).map(([type, count]) => (
                <Badge key={type} variant="outline" className="mr-2">
                  {type}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Quote Requests
                </p>
                <h3 className="text-2xl font-bold">{analytics.quoteRequests}</h3>
              </div>
              <Star className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Avg. Response Time: 2.4 hours
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Profile Score
                </p>
                <h3 className="text-2xl font-bold">
                  {analytics.profileCompleteness}%
                </h3>
              </div>
              <Star className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              {analytics.profileCompleteness < 100 && "Complete your profile →"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant={selectedMetric === 'views' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric('views')}
            >
              Views
            </Button>
            <Button
              variant={selectedMetric === 'contacts' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric('contacts')}
            >
              Contacts
            </Button>
            <Button
              variant={selectedMetric === 'quotes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric('quotes')}
            >
              Quotes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* City Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Views by City</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.cityBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};