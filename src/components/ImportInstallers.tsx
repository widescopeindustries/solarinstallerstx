import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

export const ImportInstallers = ({ onImportComplete }: { onImportComplete?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [isImporting, setIsImporting] = useState(false);

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

  const handleImport = async () => {
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

      const installersToInsert = parsedData.map(installer => ({
        name: installer.name,
        certification_type: "PV Installation Professional (PVIP)",
        certification_number: installer.certification_number || "",
        certification_expires: installer.certification_expires || null,
        company_name: installer.company_name || null,
        company_website: installer.company_website || null,
        location_city: installer.location_city || "Unknown",
        location_state: installer.location_state || "TX",
        location_zip: installer.location_zip || null,
        country: installer.country || "USA",
        services: installer.services || [],
        is_premium: false,
      }));

      const { error } = await supabase
        .from('installers')
        .insert(installersToInsert);

      if (error) throw error;

      toast.success(`Successfully imported ${installersToInsert.length} installers`);
      setImportData("");
      setOpen(false);
      if (onImportComplete) onImportComplete();
    } catch (error: any) {
      console.error('Import error:', error);
      toast.error(error.message || "Failed to import installers");
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
            Paste the installer information from NABCEP directory (names, certifications, locations, etc.)
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Paste installer data here..."
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleImport} disabled={isImporting}>
            {isImporting ? "Importing..." : "Import"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
