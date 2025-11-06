import { Shield, Award, CheckCircle, Lock, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
  className?: string;
}

export const TrustBadges = ({ variant = 'horizontal', className }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Shield,
      title: 'NABCEP Certified',
      description: 'Only certified professionals'
    },
    {
      icon: Award,
      title: 'Top Rated',
      description: '4.8+ star average rating'
    },
    {
      icon: CheckCircle,
      title: 'Verified Reviews',
      description: 'Real customer feedback'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is protected'
    },
    {
      icon: Users,
      title: '10,000+ Homeowners',
      description: 'Trust our network'
    },
    {
      icon: Star,
      title: 'Best Price Guarantee',
      description: 'Competitive quotes'
    }
  ];

  if (variant === 'grid') {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4', className)}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <badge.icon className="h-8 w-8 text-primary mb-2" />
            <div className="font-semibold text-sm">{badge.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-6 md:gap-8', className)}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm"
        >
          <badge.icon className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold">{badge.title}</div>
            <div className="text-xs text-muted-foreground">{badge.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface StatsBarProps {
  className?: string;
}

export const StatsBar = ({ className }: StatsBarProps) => {
  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '542', label: 'Certified Installers' },
    { value: '$1,440', label: 'Avg. Annual Savings' },
    { value: '25 Years', label: 'Warranty Coverage' }
  ];

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6 text-center', className)}>
      {stats.map((stat, index) => (
        <div key={index} className="space-y-1">
          <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

interface TrustIndicatorProps {
  className?: string;
}

export const TrustIndicator = ({ className }: TrustIndicatorProps) => {
  return (
    <div className={cn('flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20', className)}>
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <div className="text-left">
          <div className="font-semibold text-sm">100% Free & No Obligation</div>
          <div className="text-xs text-muted-foreground">Cancel anytime, no strings attached</div>
        </div>
      </div>

      <div className="h-8 w-px bg-border hidden md:block" />

      <div className="flex items-center gap-2">
        <Lock className="h-6 w-6 text-primary" />
        <div className="text-left">
          <div className="font-semibold text-sm">Your Privacy Protected</div>
          <div className="text-xs text-muted-foreground">We never sell your information</div>
        </div>
      </div>

      <div className="h-8 w-px bg-border hidden md:block" />

      <div className="flex items-center gap-2">
        <CheckCircle className="h-6 w-6 text-primary" />
        <div className="text-left">
          <div className="font-semibold text-sm">Verified Installers Only</div>
          <div className="text-xs text-muted-foreground">Background checked & licensed</div>
        </div>
      </div>
    </div>
  );
};
