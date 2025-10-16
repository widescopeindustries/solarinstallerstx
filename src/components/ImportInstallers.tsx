import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";

interface ImportedInstaller {
  title: string;
  totalScore?: number;
  reviewsCount: number;
  street?: string;
  city?: string;
  state?: string;
  countryCode?: string;
  website?: string;
  phone?: string;
  categoryName: string;
  url?: string;
}

interface ImportStats {
  total: number;
  duplicates: number;
  new: number;
  updated: number;
}

export const ImportInstallers = () => {
  const [jsonData, setJsonData] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<ImportStats | null>(null);

  const normalizeCompanyName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleImport = async () => {
    try {
      setIsProcessing(true);
      setStats(null);

      // Validate and parse JSON
      let installers: ImportedInstaller[];
      try {
        // Trim whitespace and check for common issues
        const trimmedData = jsonData.trim();
        
        if (!trimmedData) {
          throw new Error("Please paste JSON data");
        }
        
        if (!trimmedData.startsWith('[')) {
          throw new Error("JSON must start with [ - expecting an array");
        }
        
        installers = JSON.parse(trimmedData);
      } catch (parseError) {
        if (parseError instanceof SyntaxError) {
          // Extract position info from error message
          const match = parseError.message.match(/position (\d+)/);
          const position = match ? parseInt(match[1]) : null;
          
          throw new Error(
            `Invalid JSON format${position ? ` at character ${position}` : ''}. Please check:\n` +
            '• All quotes are properly closed\n' +
            '• No trailing commas\n' +
            '• Valid JSON array format'
          );
        }
        throw parseError;
      }
      
      if (!Array.isArray(installers)) {
        throw new Error("Data must be an array of installers");
      }
      
      if (installers.length === 0) {
        throw new Error("Array is empty - no installers to import");
      }

      let newCount = 0;
      let duplicateCount = 0;
      let updatedCount = 0;

      // Get existing installers
      const { data: existingInstallers } = await supabase
        .from("installers")
        .select("id, company_name, location_city, location_state, phone");

      for (const installer of installers) {
        if (!installer.title || !installer.state) {
          console.log("Skipping installer without required fields:", installer);
          continue;
        }

        const normalizedName = normalizeCompanyName(installer.title);
        const city = installer.city || "";
        const state = installer.state || "";

        // Check for duplicates
        const isDuplicate = existingInstallers?.some((existing) => {
          const existingNormalizedName = normalizeCompanyName(existing.company_name || "");
          const nameMatch = existingNormalizedName === normalizedName;
          const locationMatch = 
            existing.location_city?.toLowerCase() === city.toLowerCase() &&
            existing.location_state?.toLowerCase() === state.toLowerCase();
          const phoneMatch = installer.phone && existing.phone === installer.phone;
          
          return (nameMatch && locationMatch) || phoneMatch;
        });

        if (isDuplicate) {
          duplicateCount++;
          
          // Update if we have new data (e.g., missing phone number)
          const existingRecord = existingInstallers?.find((existing) => {
            const existingNormalizedName = normalizeCompanyName(existing.company_name || "");
            return existingNormalizedName === normalizedName &&
              existing.location_city?.toLowerCase() === city.toLowerCase() &&
              existing.location_state?.toLowerCase() === state.toLowerCase();
          });

          if (existingRecord && installer.phone && !existingRecord.phone) {
            await supabase
              .from("installers")
              .update({ phone: installer.phone })
              .eq("id", existingRecord.id);
            updatedCount++;
          }
          
          continue;
        }

        // Insert new installer
        const { error } = await supabase.from("installers").insert({
          company_name: installer.title,
          location_city: city,
          location_state: state,
          country: installer.countryCode || "US",
          phone: installer.phone || null,
          company_website: installer.website || null,
          rating: installer.totalScore || null,
          review_count: installer.reviewsCount || 0,
          services: installer.categoryName ? [installer.categoryName] : [],
          name: installer.title,
          certification_type: "Solar Installation",
          certification_number: "Imported",
        });

        if (error) {
          console.error("Error inserting installer:", error);
        } else {
          newCount++;
        }
      }

      setStats({
        total: installers.length,
        duplicates: duplicateCount,
        new: newCount,
        updated: updatedCount,
      });

      toast.success(`Added ${newCount} new installers, found ${duplicateCount} duplicates, updated ${updatedCount} records`);

      setJsonData("");
    } catch (error) {
      console.error("Import error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to import data");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Installers
        </CardTitle>
        <CardDescription>
          Paste JSON array of installers. Automatically detects duplicates by company name + location or phone number.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder='Paste JSON array here, e.g., [{"title": "Company Name", "city": "Dallas", "state": "Texas", ...}]'
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
        />
        
        <Button 
          onClick={handleImport} 
          disabled={!jsonData.trim() || isProcessing}
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Import Installers"}
        </Button>

        {stats && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-semibold">Import Results:</p>
                <p>• Total records: {stats.total}</p>
                <p className="text-green-600">• New installers added: {stats.new}</p>
                <p className="text-blue-600">• Records updated: {stats.updated}</p>
                <p className="text-yellow-600">• Duplicates skipped: {stats.duplicates}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-2">JSON Format Required:</p>
            <div className="text-sm space-y-1">
              <p>Data must be a JSON array. Example:</p>
              <pre className="bg-muted p-2 rounded text-xs mt-2 overflow-x-auto">
{`[
  {
    "title": "Company Name",
    "city": "Dallas",
    "state": "Texas",
    "phone": "(555) 123-4567",
    "website": "https://example.com",
    "totalScore": 4.5,
    "reviewsCount": 10
  }
]`}
              </pre>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
