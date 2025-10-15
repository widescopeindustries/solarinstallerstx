import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Upload, FileJson, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

export const ImportInstallers = ({ onImportComplete }: { onImportComplete?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [lastImportTime, setLastImportTime] = useState<number>(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const COOLDOWN_MS = 5000; // 5 second cooldown between imports
  const MAX_BATCH_SIZE = 100; // Maximum installers per import

  // Zod schema for installer validation
  const installerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
    certification_type: z.string().min(1).max(100),
    certification_number: z.string().trim().min(1, "Certification number required").max(50),
    certification_expires: z.string().nullable().optional(),
    company_name: z.string().trim().max(200).nullable().optional(),
    phone: z.string()
      .trim()
      .regex(/^\+?[\d\s\-().]+$/, "Invalid phone number format")
      .nullable()
      .optional(),
    company_website: z.string()
      .trim()
      .max(500)
      .nullable()
      .optional()
      .refine(
        (url) => !url || url.startsWith('http://') || url.startsWith('https://'),
        { message: 'Website must be a valid HTTP(S) URL' }
      ),
    location_city: z.string().trim().min(1, "City is required").max(100),
    location_state: z.string().trim().length(2, "State must be 2 characters"),
    location_zip: z.string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format")
      .nullable()
      .optional(),
    country: z.string().trim().min(1).max(3),
    services: z.array(z.string()).default([]),
  }).refine((data) => data.phone || data.company_website, {
    message: "At least one contact method (phone or website) is required",
    path: ["phone"],
  });

  const parseNABCEPData = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const installers = [];
    let currentInstaller: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      
      // New installer entry starts with a name
      if (trimmed.match(/^[A-Z][a-z]+ [A-Z]/)) {
        if (currentInstaller) {
          installers.push(currentInstaller);
        }
        currentInstaller = {
          name: trimmed.split('\n')[0],
          services: [],
        };
      } else if (trimmed.startsWith('Cert #:')) {
        if (currentInstaller) {
          currentInstaller.certification_number = trimmed.replace('Cert #:', '').trim();
        }
      } else if (trimmed.startsWith('Expires:')) {
        if (currentInstaller) {
          const dateStr = trimmed.replace('Expires:', '').trim();
          currentInstaller.certification_expires = new Date(dateStr).toISOString().split('T')[0];
        }
      } else if (trimmed.startsWith('Country:')) {
        if (currentInstaller) {
          currentInstaller.country = trimmed.replace('Country:', '').trim();
        }
      } else if (trimmed.startsWith('Location:')) {
        if (currentInstaller) {
          const location = trimmed.replace('Location:', '').trim();
          const parts = location.split(',');
          if (parts.length >= 2) {
            currentInstaller.location_city = parts[0].trim();
            const stateParts = parts[1].trim().split(' ');
            currentInstaller.location_state = stateParts[0].trim();
            if (stateParts[1]) {
              currentInstaller.location_zip = stateParts[1].trim();
            }
          }
        }
      } else if (trimmed.match(/\.(com|org|net)/)) {
        if (currentInstaller) {
          currentInstaller.company_website = trimmed;
        }
      } else if (currentInstaller && !currentInstaller.company_name && trimmed.length > 3 && !trimmed.includes(':')) {
        currentInstaller.company_name = trimmed;
      }
    }

    if (currentInstaller) {
      installers.push(currentInstaller);
    }

    return installers;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast.error("Please sign in to import installers");
      navigate("/auth");
      return;
    }

    // Check rate limit
    const now = Date.now();
    if (now - lastImportTime < COOLDOWN_MS) {
      const waitSeconds = Math.ceil((COOLDOWN_MS - (now - lastImportTime)) / 1000);
      toast.error(`Please wait ${waitSeconds} second${waitSeconds > 1 ? 's' : ''} before importing again`);
      event.target.value = '';
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      if (!Array.isArray(jsonData) || jsonData.length === 0) {
        toast.error("Invalid JSON format or empty data");
        setIsImporting(false);
        return;
      }

      // Check batch size limit
      if (jsonData.length > MAX_BATCH_SIZE) {
        toast.error(`Maximum ${MAX_BATCH_SIZE} installers per import. Please split your data.`);
        setIsImporting(false);
        event.target.value = '';
        return;
      }

      // Validate each installer with Zod
      const validatedInstallers = [];
      const validationErrors = [];
      
      for (let i = 0; i < jsonData.length; i++) {
        try {
          const validated = installerSchema.parse({
            name: jsonData[i].name || "",
            certification_type: jsonData[i].certification_type || "PV Installation Professional (PVIP)",
            certification_number: jsonData[i].certification_number || "",
            certification_expires: jsonData[i].certification_expires || null,
            company_name: jsonData[i].company_name || null,
            phone: jsonData[i].phone || null,
            company_website: jsonData[i].company_website || null,
            location_city: jsonData[i].location_city || "Unknown",
            location_state: jsonData[i].location_state || "TX",
            location_zip: jsonData[i].location_zip || null,
            country: jsonData[i].country || "USA",
            services: jsonData[i].services || [],
          });
          validatedInstallers.push(validated);
        } catch (err: any) {
          validationErrors.push(`Record ${i + 1}: ${err.errors?.[0]?.message || 'Invalid data'}`);
        }
      }

      if (validationErrors.length > 0) {
        toast.error(`Validation failed: ${validationErrors.slice(0, 3).join(', ')}${validationErrors.length > 3 ? '...' : ''}`);
        setIsImporting(false);
        event.target.value = '';
        return;
      }

      const installersToInsert = validatedInstallers.map(installer => ({
        ...installer,
        is_premium: false,
        user_id: user.id,
      }));

      const { error } = await supabase
        .from('installers')
        .insert(installersToInsert);

      if (error) throw error;

      setLastImportTime(Date.now());
      toast.success(`Successfully imported ${installersToInsert.length} installers from JSON`);
      setOpen(false);
      if (onImportComplete) onImportComplete();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Import error:', error);
      }
      const userMessage = error.message?.includes('permission') 
        ? "You don't have permission to import installers"
        : "Failed to import JSON file";
      toast.error(userMessage);
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  const handleImport = async () => {
    if (!user) {
      toast.error("Please sign in to import installers");
      navigate("/auth");
      return;
    }

    // Check rate limit
    const now = Date.now();
    if (now - lastImportTime < COOLDOWN_MS) {
      const waitSeconds = Math.ceil((COOLDOWN_MS - (now - lastImportTime)) / 1000);
      toast.error(`Please wait ${waitSeconds} second${waitSeconds > 1 ? 's' : ''} before importing again`);
      return;
    }

    if (!importData.trim()) {
      toast.error("Please paste installer data to import");
      return;
    }

    setIsImporting(true);
    try {
      const parsedData = parseNABCEPData(importData);
      
      if (parsedData.length === 0) {
        toast.error("No valid installer data found");
        setIsImporting(false);
        return;
      }

      // Check batch size limit
      if (parsedData.length > MAX_BATCH_SIZE) {
        toast.error(`Maximum ${MAX_BATCH_SIZE} installers per import. Please split your data.`);
        setIsImporting(false);
        return;
      }

      // Validate each installer with Zod
      const validatedInstallers = [];
      const validationErrors = [];
      
      for (let i = 0; i < parsedData.length; i++) {
        try {
          const validated = installerSchema.parse({
            name: parsedData[i].name,
            certification_type: parsedData[i].certification_type || "PV Installation Professional (PVIP)",
            certification_number: parsedData[i].certification_number || "",
            certification_expires: parsedData[i].certification_expires || null,
            company_name: parsedData[i].company_name || null,
            phone: parsedData[i].phone || null,
            company_website: parsedData[i].company_website || null,
            location_city: parsedData[i].location_city || "Unknown",
            location_state: parsedData[i].location_state || "TX",
            location_zip: parsedData[i].location_zip || null,
            country: parsedData[i].country || "USA",
            services: parsedData[i].services || [],
          });
          validatedInstallers.push(validated);
        } catch (err: any) {
          validationErrors.push(`Record ${i + 1}: ${err.errors?.[0]?.message || 'Invalid data'}`);
        }
      }

      if (validationErrors.length > 0) {
        toast.error(`Validation failed: ${validationErrors.slice(0, 3).join(', ')}${validationErrors.length > 3 ? '...' : ''}`);
        setIsImporting(false);
        return;
      }

      const installersToInsert = validatedInstallers.map(installer => ({
        ...installer,
        is_premium: false,
        user_id: user.id,
      }));

      const { error } = await supabase
        .from('installers')
        .insert(installersToInsert);

      if (error) throw error;

      setLastImportTime(Date.now());
      toast.success(`Successfully imported ${installersToInsert.length} installers`);
      setImportData("");
      setOpen(false);
      if (onImportComplete) onImportComplete();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Import error:', error);
      }
      const userMessage = error.message?.includes('permission')
        ? "You don't have permission to import installers"
        : "Failed to import installers";
      toast.error(userMessage);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4" />
          Import Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import NABCEP Installer Data</DialogTitle>
          <DialogDescription>
            Upload a JSON file or paste installer information from NABCEP directory
          </DialogDescription>
        </DialogHeader>
        
        {!user && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must be signed in to import installer data.{" "}
              <Button variant="link" className="p-0 h-auto text-destructive underline" onClick={() => navigate("/auth")}>
                Sign in here
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="json" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json" disabled={!user}>
              <FileJson className="h-4 w-4 mr-2" />
              JSON File
            </TabsTrigger>
            <TabsTrigger value="text" disabled={!user}>
              <Upload className="h-4 w-4 mr-2" />
              Paste Text
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="json" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                disabled={isImporting || !user}
                className="max-w-xs mx-auto"
              />
              <p className="text-sm text-muted-foreground mt-4">
                Upload the JSON file generated by your Python scraper
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <Textarea
              placeholder="Paste installer data here..."
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              disabled={!user}
              className="min-h-[300px] font-mono text-sm"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleImport} disabled={isImporting || !user}>
                {isImporting ? "Importing..." : "Import"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
