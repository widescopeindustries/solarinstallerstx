import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PhoneNumberFetcherProps {
  onComplete: () => void;
}

export const PhoneNumberFetcher = ({ onComplete }: PhoneNumberFetcherProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPhoneNumbers = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use this feature.",
        variant: "destructive",
      });
      return;
    }

    setIsFetching(true);
    setProgress({ current: 0, total: 0 });

    try {
      // Fetch installers without phone numbers
      const { data: installers, error: fetchError } = await supabase
        .from('installers')
        .select('id, company_name, name, location_city, location_state, phone')
        .or('phone.is.null,phone.eq.');

      if (fetchError) throw fetchError;

      if (!installers || installers.length === 0) {
        toast({
          title: "No installers need phone numbers",
          description: "All installers already have contact information.",
        });
        setIsFetching(false);
        return;
      }

      setProgress({ current: 0, total: installers.length });

      let successCount = 0;
      let failCount = 0;

      // Process each installer
      for (let i = 0; i < installers.length; i++) {
        const installer = installers[i];
        const displayName = installer.company_name || installer.name;

        try {
          const { data, error } = await supabase.functions.invoke('fetch-phone-numbers', {
            body: {
              installerId: installer.id,
              companyName: displayName,
              city: installer.location_city,
              state: installer.location_state,
            },
          });

          if (error) throw error;

          if (data.success) {
            successCount++;
            console.log(`✓ Found phone for ${displayName}: ${data.phone}`);
          } else {
            failCount++;
            console.log(`✗ No phone found for ${displayName}`);
          }
        } catch (err) {
          failCount++;
          console.error(`Error processing ${displayName}:`, err);
        }

        setProgress({ current: i + 1, total: installers.length });

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      toast({
        title: "Phone number fetch complete",
        description: `Successfully found ${successCount} phone numbers. ${failCount} could not be found.`,
      });

      onComplete();
    } catch (error: any) {
      console.error('Error fetching phone numbers:', error);
      toast({
        title: "Error fetching phone numbers",
        description: error.message || "An error occurred while fetching phone numbers.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Auto-Fetch Phone Numbers
        </CardTitle>
        <CardDescription>
          Use Google Places API to automatically find phone numbers for installers that don't have them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isFetching && (
            <div className="text-sm text-muted-foreground">
              Progress: {progress.current} / {progress.total}
            </div>
          )}
          <Button 
            onClick={fetchPhoneNumbers} 
            disabled={isFetching}
            className="w-full"
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching... ({progress.current}/{progress.total})
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Fetch Phone Numbers
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
