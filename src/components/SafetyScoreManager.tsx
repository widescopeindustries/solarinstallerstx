import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Shield, Search, Save, Calculator } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Installer = Database['public']['Tables']['installers']['Row'];

export const SafetyScoreManager = () => {
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    nabcep_certified: false,
    state_licensed: false,
    master_electrician: false,
    bonding_status: '',
    bbb_rating: '',
    years_in_business: 0,
    installations_completed: 0,
    verification_status: '',
    insurance_coverage: '',
    warranty_details: '',
    complaint_history: '',
    bankruptcy_history: '',
    customer_ratings: '',
    red_flags: '',
  });

  // Load installers
  useEffect(() => {
    loadInstallers();
  }, []);

  const loadInstallers = async () => {
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .order('company_name');

    if (error) {
      toast({
        title: "Error loading installers",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setInstallers(data || []);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      loadInstallers();
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .or(`company_name.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%,location_city.ilike.%${searchTerm}%`)
      .order('company_name');

    if (error) {
      toast({
        title: "Search error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setInstallers(data || []);
    }
    setLoading(false);
  };

  const selectInstaller = (installer: Installer) => {
    setSelectedInstaller(installer);
    setFormData({
      nabcep_certified: installer.nabcep_certified || false,
      state_licensed: installer.state_licensed || false,
      master_electrician: installer.master_electrician || false,
      bonding_status: installer.bonding_status || '',
      bbb_rating: installer.bbb_rating || '',
      years_in_business: installer.years_in_business || 0,
      installations_completed: installer.installations_completed || 0,
      verification_status: installer.verification_status || '',
      insurance_coverage: installer.insurance_coverage ? JSON.stringify(installer.insurance_coverage, null, 2) : '',
      warranty_details: installer.warranty_details ? JSON.stringify(installer.warranty_details, null, 2) : '',
      complaint_history: installer.complaint_history ? JSON.stringify(installer.complaint_history, null, 2) : '',
      bankruptcy_history: installer.bankruptcy_history ? JSON.stringify(installer.bankruptcy_history, null, 2) : '',
      customer_ratings: installer.customer_ratings ? JSON.stringify(installer.customer_ratings, null, 2) : '',
      red_flags: installer.red_flags ? installer.red_flags.join(', ') : '',
    });
  };

  const handleSave = async () => {
    if (!selectedInstaller) return;

    setLoading(true);

    // Parse JSON fields
    let insurance_coverage = null;
    let warranty_details = null;
    let complaint_history = null;
    let bankruptcy_history = null;
    let customer_ratings = null;

    try {
      if (formData.insurance_coverage) insurance_coverage = JSON.parse(formData.insurance_coverage);
      if (formData.warranty_details) warranty_details = JSON.parse(formData.warranty_details);
      if (formData.complaint_history) complaint_history = JSON.parse(formData.complaint_history);
      if (formData.bankruptcy_history) bankruptcy_history = JSON.parse(formData.bankruptcy_history);
      if (formData.customer_ratings) customer_ratings = JSON.parse(formData.customer_ratings);
    } catch (e) {
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON fields for syntax errors",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const red_flags = formData.red_flags ? formData.red_flags.split(',').map(f => f.trim()).filter(f => f) : [];

    const { error } = await supabase
      .from('installers')
      .update({
        nabcep_certified: formData.nabcep_certified,
        state_licensed: formData.state_licensed,
        master_electrician: formData.master_electrician,
        bonding_status: formData.bonding_status || null,
        bbb_rating: formData.bbb_rating || null,
        years_in_business: formData.years_in_business || null,
        installations_completed: formData.installations_completed || null,
        verification_status: formData.verification_status || null,
        insurance_coverage,
        warranty_details,
        complaint_history,
        bankruptcy_history,
        customer_ratings,
        red_flags,
      })
      .eq('id', selectedInstaller.id);

    if (error) {
      toast({
        title: "Error saving",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved successfully",
        description: "Safety score will be automatically calculated",
      });
      loadInstallers();

      // Refresh selected installer
      const { data } = await supabase
        .from('installers')
        .select('*')
        .eq('id', selectedInstaller.id)
        .single();

      if (data) {
        selectInstaller(data);
      }
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Solar Safety Score Manager
        </CardTitle>
        <CardDescription>
          Manage solar safety score data for installers. Scores are automatically calculated when you save.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Section */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search by company name, installer name, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Installer Selection */}
        <div className="space-y-2">
          <Label>Select Installer</Label>
          <Select
            value={selectedInstaller?.id || ''}
            onValueChange={(id) => {
              const installer = installers.find(i => i.id === id);
              if (installer) selectInstaller(installer);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose an installer to edit..." />
            </SelectTrigger>
            <SelectContent>
              {installers.map((installer) => (
                <SelectItem key={installer.id} value={installer.id}>
                  {installer.company_name || installer.name} - {installer.location_city}, {installer.location_state}
                  {installer.total_safety_score && ` (Score: ${installer.total_safety_score}, ${installer.tier})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedInstaller && (
          <>
            {/* Current Score Display */}
            {selectedInstaller.total_safety_score !== null && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Solar Safety Score</p>
                    <p className="text-3xl font-bold">{selectedInstaller.total_safety_score}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Tier</p>
                    <p className="text-2xl font-bold">{selectedInstaller.tier}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Credentials Section */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Professional Credentials (25 points)
              </h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nabcep"
                  checked={formData.nabcep_certified}
                  onCheckedChange={(checked) => setFormData({ ...formData, nabcep_certified: checked as boolean })}
                />
                <Label htmlFor="nabcep" className="cursor-pointer">
                  NABCEP Certified (15 points)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="licensed"
                  checked={formData.state_licensed}
                  onCheckedChange={(checked) => setFormData({ ...formData, state_licensed: checked as boolean })}
                />
                <Label htmlFor="licensed" className="cursor-pointer">
                  State Licensed (5 points)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="electrician"
                  checked={formData.master_electrician}
                  onCheckedChange={(checked) => setFormData({ ...formData, master_electrician: checked as boolean })}
                />
                <Label htmlFor="electrician" className="cursor-pointer">
                  Master Electrician (5 points)
                </Label>
              </div>
            </div>

            {/* Financial Stability Section */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-semibold">Financial Stability (30 points)</h3>

              <div className="space-y-2">
                <Label htmlFor="bonding">Bonding Status</Label>
                <Select
                  value={formData.bonding_status}
                  onValueChange={(value) => setFormData({ ...formData, bonding_status: value })}
                >
                  <SelectTrigger id="bonding">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Not Set</SelectItem>
                    <SelectItem value="bonded">Bonded (10 points)</SelectItem>
                    <SelectItem value="not_bonded">Not Bonded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Coverage (10 points if present)</Label>
                <Textarea
                  id="insurance"
                  placeholder='{"provider": "Company Name", "amount": 1000000, "expires": "2025-12-31"}'
                  value={formData.insurance_coverage}
                  onChange={(e) => setFormData({ ...formData, insurance_coverage: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankruptcy">Bankruptcy History (10 points if null)</Label>
                <Textarea
                  id="bankruptcy"
                  placeholder='Leave empty for no history, or: {"date": "2020-01-01", "type": "Chapter 11"}'
                  value={formData.bankruptcy_history}
                  onChange={(e) => setFormData({ ...formData, bankruptcy_history: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            {/* Customer Protection Section */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-semibold">Customer Protection (25 points)</h3>

              <div className="space-y-2">
                <Label htmlFor="bbb">BBB Rating</Label>
                <Select
                  value={formData.bbb_rating}
                  onValueChange={(value) => setFormData({ ...formData, bbb_rating: value })}
                >
                  <SelectTrigger id="bbb">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Not Set</SelectItem>
                    <SelectItem value="A+">A+ (10 points)</SelectItem>
                    <SelectItem value="A">A (8 points)</SelectItem>
                    <SelectItem value="B">B (5 points)</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="warranty">Warranty Details (10 points if present)</Label>
                <Textarea
                  id="warranty"
                  placeholder='{"equipment": 25, "workmanship": 10, "performance": 25}'
                  value={formData.warranty_details}
                  onChange={(e) => setFormData({ ...formData, warranty_details: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaints">Complaint History (5 points if null)</Label>
                <Textarea
                  id="complaints"
                  placeholder='Leave empty for no complaints, or: {"total": 5, "resolved": 3}'
                  value={formData.complaint_history}
                  onChange={(e) => setFormData({ ...formData, complaint_history: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            {/* Track Record Section */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-semibold">Track Record (20 points)</h3>

              <div className="space-y-2">
                <Label htmlFor="years">Years in Business</Label>
                <Input
                  id="years"
                  type="number"
                  value={formData.years_in_business}
                  onChange={(e) => setFormData({ ...formData, years_in_business: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">10+ years = 10 points, 5-9 years = 5 points</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="installations">Installations Completed</Label>
                <Input
                  id="installations"
                  type="number"
                  value={formData.installations_completed}
                  onChange={(e) => setFormData({ ...formData, installations_completed: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">1000+ installations = 5 points</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ratings">Customer Ratings</Label>
                <Textarea
                  id="ratings"
                  placeholder='{"average_rating": 4.8, "total_reviews": 150}'
                  value={formData.customer_ratings}
                  onChange={(e) => setFormData({ ...formData, customer_ratings: e.target.value })}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">4.5+ average = 5 points</p>
              </div>
            </div>

            {/* Other Fields */}
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-semibold">Additional Information</h3>

              <div className="space-y-2">
                <Label htmlFor="verification">Verification Status</Label>
                <Select
                  value={formData.verification_status}
                  onValueChange={(value) => setFormData({ ...formData, verification_status: value })}
                >
                  <SelectTrigger id="verification">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Not Set</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="red_flags">Red Flags (comma separated)</Label>
                <Input
                  id="red_flags"
                  placeholder="e.g., Bankruptcy, High complaints, License suspended"
                  value={formData.red_flags}
                  onChange={(e) => setFormData({ ...formData, red_flags: e.target.value })}
                />
              </div>
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} disabled={loading} className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save & Calculate Solar Safety Score
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
