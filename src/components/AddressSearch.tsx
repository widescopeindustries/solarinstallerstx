import { useState, useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { logEvent } from "@/lib/analytics";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface GeocodingResult {
  place_name: string;
  center: [number, number];
  context: Array<{
    id: string;
    text: string;
  }>;
}

interface SearchResult {
  address: string;
  coordinates: [number, number];
  city: string;
  state: string;
  zipCode: string;
}

interface AddressSearchProps {
  onSearchResult?: (result: SearchResult) => void;
  className?: string;
}

export const AddressSearch = ({ onSearchResult, className = '' }: AddressSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchAddress = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${MAPBOX_TOKEN}&` +
        'country=us&' +
        'region=tx&' +
        'types=address&' +
        'limit=5'
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setResults(data.features);

      // Track search attempt
      logEvent('address_search', { query });
    } catch (err) {
      setError('Search failed. Please try again.');
      logEvent('address_search_error', { error: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleResultClick = (result: GeocodingResult) => {
    const cityContext = result.context.find(ctx => ctx.id.startsWith('place'));
    const stateContext = result.context.find(ctx => ctx.id.startsWith('region'));
    const postalContext = result.context.find(ctx => ctx.id.startsWith('postcode'));

    const searchResult: SearchResult = {
      address: result.place_name,
      coordinates: result.center,
      city: cityContext?.text || '',
      state: stateContext?.text || 'TX',
      zipCode: postalContext?.text || ''
    };

    onSearchResult?.(searchResult);

    // Track selection
    logEvent('address_selected', {
      city: searchResult.city,
      zip: searchResult.zipCode
    });
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your address"
            aria-label="Enter your address to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchAddress(searchTerm);
              }
            }}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => searchAddress(searchTerm)}
            disabled={isLoading}
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            Search
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {results.length > 0 && (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {results.map((result) => (
              <li
                key={result.place_name}
                className="flex items-start gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm">{result.place_name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};