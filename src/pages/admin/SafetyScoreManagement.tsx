import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { calculateSafetyScore, getTierBadge, getTierColor } from "@/lib/safetyScoring";
import { Shield, AlertTriangle, CheckCircle, Calendar, RefreshCw, Save, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface Installer {
  id: string;
  name: string;
  company_name: string;
  total_safety_score: number;
  tier: string;
  verification_status: string;
  last_verification_date: string;
  next_verification_due: string;
  red_flags_count: number;
}

const SafetyScoreManagement = () => {
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [selectedInstaller, setSelectedInstaller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  // Form state for selected installer
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchInstallers();
  }, []);

  const fetchInstallers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .order('total_safety_score', { ascending: false });

      if (error) throw error;
      setInstallers(data || []);
    } catch (error: any) {
      console.error('Error fetching installers:', error);
      toast({
        title: "Error",
        description: "Failed to load installers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectInstaller = async (installerId: string) => {
    try {
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .eq('id', installerId)
        .single();

      if (error) throw error;
      setSelectedInstaller(data);
      setFormData(data);
    } catch (error: any) {
      console.error('Error loading installer:', error);
      toast({
        title: "Error",
        description: "Failed to load installer details",
        variant: "destructive"
      });
    }
  };

  const recalculateScore = () => {
    const scoreResult = calculateSafetyScore(formData);

    setFormData((prev: any) => ({
      ...prev,
      total_safety_score: scoreResult.total_safety_score,
      tier: scoreResult.tier,
      financial_stability_score: scoreResult.financial_stability_score,
      professional_credentials_score: scoreResult.professional_credentials_score,
      customer_protection_score: scoreResult.customer_protection_score,
      track_record_score: scoreResult.track_record_score,
      red_flags: scoreResult.red_flags,
      red_flags_count: scoreResult.red_flags.length
    }));

    toast({
      title: "Score Recalculated",
      description: `New safety score: ${scoreResult.total_safety_score}/100 (${scoreResult.tier || 'Below Threshold'})`,
    });
  };

  const saveInstaller = async () => {
    if (!selectedInstaller) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('installers')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
          last_verification_date: new Date().toISOString()
        })
        .eq('id', selectedInstaller.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Installer data saved successfully",
      });

      // Refresh list
      await fetchInstallers();

      // Reload selected installer
      await selectInstaller(selectedInstaller.id);

    } catch (error: any) {
      console.error('Error saving installer:', error);
      toast({
        title: "Error",
        description: "Failed to save installer data",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredInstallers = installers.filter(installer => {
    const matchesSearch = installer.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         installer.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === "all" || installer.tier === filterTier;
    const matchesStatus = filterStatus === "all" || installer.verification_status === filterStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Safety Score Management</h1>
            <p className="text-muted-foreground">Manage installer verification and safety scores</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gold Tier</p>
                    <p className="text-2xl font-bold">{installers.filter(i => i.tier === 'Gold').length}</p>
                  </div>
                  <div className="text-3xl">🏆</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Silver Tier</p>
                    <p className="text-2xl font-bold">{installers.filter(i => i.tier === 'Silver').length}</p>
                  </div>
                  <div className="text-3xl">🥈</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bronze Tier</p>
                    <p className="text-2xl font-bold">{installers.filter(i => i.tier === 'Bronze').length}</p>
                  </div>
                  <div className="text-3xl">🥉</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Needs Verification</p>
                    <p className="text-2xl font-bold">{installers.filter(i => i.verification_status === 'pending').length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Installer List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Installers
                </CardTitle>
                <div className="space-y-2 mt-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search installers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterTier} onValueChange={setFilterTier}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tiers</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="needs_update">Needs Update</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading...</p>
                ) : (
                  <div className="space-y-2">
                    {filteredInstallers.map((installer) => (
                      <div
                        key={installer.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedInstaller?.id === installer.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                        }`}
                        onClick={() => selectInstaller(installer.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{installer.company_name || installer.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {installer.tier && (
                                <Badge className="text-xs">
                                  {getTierBadge(installer.tier as any)} {installer.tier}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                Score: {installer.total_safety_score}/100
                              </span>
                            </div>
                            {installer.red_flags_count > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-3 w-3 text-destructive" />
                                <span className="text-xs text-destructive">{installer.red_flags_count} red flags</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detail Editor */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedInstaller ? (
                    <div className="flex items-center justify-between">
                      <span>{selectedInstaller.company_name || selectedInstaller.name}</span>
                      <div className="flex gap-2">
                        <Button onClick={recalculateScore} variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Recalculate
                        </Button>
                        <Button onClick={saveInstaller} size="sm" disabled={saving}>
                          <Save className="h-4 w-4 mr-2" />
                          {saving ? 'Saving...' : 'Save'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    'Select an installer to edit'
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedInstaller ? (
                  <Tabs defaultValue="financial" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="credentials">Credentials</TabsTrigger>
                      <TabsTrigger value="protection">Protection</TabsTrigger>
                      <TabsTrigger value="track">Track Record</TabsTrigger>
                    </TabsList>

                    {/* Financial Stability Tab */}
                    <TabsContent value="financial" className="space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="space-y-4">
                        <div>
                          <Label>Years in Business</Label>
                          <Input
                            type="number"
                            value={formData.years_in_business || ''}
                            onChange={(e) => setFormData({...formData, years_in_business: parseInt(e.target.value)})}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.insurance_verified || false}
                            onCheckedChange={(checked) => setFormData({...formData, insurance_verified: checked})}
                          />
                          <Label>Insurance Verified</Label>
                        </div>

                        {formData.insurance_verified && (
                          <div className="space-y-2 ml-6">
                            <div>
                              <Label>Insurance Company</Label>
                              <Input
                                value={formData.insurance_company || ''}
                                onChange={(e) => setFormData({...formData, insurance_company: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Policy Number</Label>
                              <Input
                                value={formData.insurance_policy_number || ''}
                                onChange={(e) => setFormData({...formData, insurance_policy_number: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Expiry Date</Label>
                              <Input
                                type="date"
                                value={formData.insurance_expiry_date || ''}
                                onChange={(e) => setFormData({...formData, insurance_expiry_date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Coverage Amount</Label>
                              <Input
                                type="number"
                                value={formData.insurance_coverage_amount || ''}
                                onChange={(e) => setFormData({...formData, insurance_coverage_amount: parseFloat(e.target.value)})}
                                placeholder="1000000"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.bonding_verified || false}
                            onCheckedChange={(checked) => setFormData({...formData, bonding_verified: checked})}
                          />
                          <Label>Bonding Verified</Label>
                        </div>

                        {formData.bonding_verified && (
                          <div className="space-y-2 ml-6">
                            <div>
                              <Label>Bonding Company</Label>
                              <Input
                                value={formData.bonding_company || ''}
                                onChange={(e) => setFormData({...formData, bonding_company: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Bonding Amount</Label>
                              <Input
                                type="number"
                                value={formData.bonding_amount || ''}
                                onChange={(e) => setFormData({...formData, bonding_amount: parseFloat(e.target.value)})}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.business_registration_verified || false}
                            onCheckedChange={(checked) => setFormData({...formData, business_registration_verified: checked})}
                          />
                          <Label>Business Registration Verified</Label>
                        </div>

                        {formData.business_registration_verified && (
                          <div className="space-y-2 ml-6">
                            <div>
                              <Label>Registration Number</Label>
                              <Input
                                value={formData.business_registration_number || ''}
                                onChange={(e) => setFormData({...formData, business_registration_number: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Registration State</Label>
                              <Input
                                value={formData.business_registration_state || ''}
                                onChange={(e) => setFormData({...formData, business_registration_state: e.target.value})}
                                maxLength={2}
                                placeholder="TX"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Label>Bankruptcy Check</Label>
                          <Select
                            value={formData.bankruptcy_check_clear === null ? 'not_checked' : formData.bankruptcy_check_clear ? 'clear' : 'found'}
                            onValueChange={(value) => setFormData({
                              ...formData,
                              bankruptcy_check_clear: value === 'not_checked' ? null : value === 'clear',
                              bankruptcy_check_date: new Date().toISOString().split('T')[0]
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not_checked">Not Checked</SelectItem>
                              <SelectItem value="clear">Clear (No Bankruptcy)</SelectItem>
                              <SelectItem value="found">Bankruptcy Found</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.bankruptcy_check_clear === false && (
                          <div className="ml-6">
                            <Label>Bankruptcy Notes</Label>
                            <Textarea
                              value={formData.bankruptcy_notes || ''}
                              onChange={(e) => setFormData({...formData, bankruptcy_notes: e.target.value})}
                              placeholder="Details about bankruptcy filing..."
                            />
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Professional Credentials Tab */}
                    <TabsContent value="credentials" className="space-y-4">
                      <div>
                        <Label>Certification Type</Label>
                        <Input
                          value={formData.certification_type || ''}
                          onChange={(e) => setFormData({...formData, certification_type: e.target.value})}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground mt-1">From NABCEP directory (read-only)</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.state_licensed || false}
                          onCheckedChange={(checked) => setFormData({...formData, state_licensed: checked})}
                        />
                        <Label>State Licensed</Label>
                      </div>

                      {formData.state_licensed && (
                        <div className="space-y-2 ml-6">
                          <div>
                            <Label>License Number</Label>
                            <Input
                              value={formData.state_license_number || ''}
                              onChange={(e) => setFormData({...formData, state_license_number: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>License Expiry</Label>
                            <Input
                              type="date"
                              value={formData.state_license_expiry || ''}
                              onChange={(e) => setFormData({...formData, state_license_expiry: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>License State</Label>
                            <Input
                              value={formData.state_license_state || ''}
                              onChange={(e) => setFormData({...formData, state_license_state: e.target.value})}
                              maxLength={2}
                              placeholder="TX"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.master_electrician_on_staff || false}
                          onCheckedChange={(checked) => setFormData({...formData, master_electrician_on_staff: checked})}
                        />
                        <Label>Master Electrician on Staff</Label>
                      </div>

                      {formData.master_electrician_on_staff && (
                        <div className="space-y-2 ml-6">
                          <div>
                            <Label>Electrician Name</Label>
                            <Input
                              value={formData.master_electrician_name || ''}
                              onChange={(e) => setFormData({...formData, master_electrician_name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>License Number</Label>
                            <Input
                              value={formData.master_electrician_license || ''}
                              onChange={(e) => setFormData({...formData, master_electrician_license: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    {/* Customer Protection Tab */}
                    <TabsContent value="protection" className="space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Workmanship Warranty (years)</Label>
                          <Input
                            type="number"
                            value={formData.warranty_workmanship_years || ''}
                            onChange={(e) => setFormData({...formData, warranty_workmanship_years: parseInt(e.target.value)})}
                          />
                        </div>
                        <div>
                          <Label>Equipment Warranty (years)</Label>
                          <Input
                            type="number"
                            value={formData.warranty_equipment_years || ''}
                            onChange={(e) => setFormData({...formData, warranty_equipment_years: parseInt(e.target.value)})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Warranty Terms</Label>
                        <Textarea
                          value={formData.warranty_terms || ''}
                          onChange={(e) => setFormData({...formData, warranty_terms: e.target.value})}
                          placeholder="Details about warranty coverage..."
                        />
                      </div>

                      <div>
                        <Label>Response Time (hours)</Label>
                        <Input
                          type="number"
                          value={formData.response_time_hours || ''}
                          onChange={(e) => setFormData({...formData, response_time_hours: parseInt(e.target.value)})}
                        />
                      </div>

                      <div>
                        <Label>BBB Rating</Label>
                        <Select
                          value={formData.bbb_rating || 'NR'}
                          onValueChange={(value) => setFormData({...formData, bbb_rating: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="C+">C+</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="C-">C-</SelectItem>
                            <SelectItem value="D+">D+</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="D-">D-</SelectItem>
                            <SelectItem value="F">F</SelectItem>
                            <SelectItem value="NR">Not Rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Total Complaints</Label>
                          <Input
                            type="number"
                            value={formData.complaint_count || 0}
                            onChange={(e) => setFormData({...formData, complaint_count: parseInt(e.target.value)})}
                          />
                        </div>
                        <div>
                          <Label>Resolved Complaints</Label>
                          <Input
                            type="number"
                            value={formData.resolved_complaint_count || 0}
                            onChange={(e) => setFormData({...formData, resolved_complaint_count: parseInt(e.target.value)})}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Track Record Tab */}
                    <TabsContent value="track" className="space-y-4">
                      <div>
                        <Label>Completed Installations</Label>
                        <Input
                          type="number"
                          value={formData.completed_installations || 0}
                          onChange={(e) => setFormData({...formData, completed_installations: parseInt(e.target.value)})}
                        />
                      </div>

                      <div>
                        <Label>Project Completion Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.project_completion_rate || ''}
                          onChange={(e) => setFormData({...formData, project_completion_rate: parseFloat(e.target.value)})}
                          placeholder="95.50"
                        />
                      </div>

                      <div>
                        <Label>Timeline Accuracy Score (%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.timeline_accuracy_score || ''}
                          onChange={(e) => setFormData({...formData, timeline_accuracy_score: parseFloat(e.target.value)})}
                          placeholder="90.00"
                        />
                      </div>

                      <div>
                        <Label>Average Project Days</Label>
                        <Input
                          type="number"
                          value={formData.average_project_days || ''}
                          onChange={(e) => setFormData({...formData, average_project_days: parseInt(e.target.value)})}
                        />
                      </div>

                      <div>
                        <Label>Total MW Installed</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.total_mw_installed || ''}
                          onChange={(e) => setFormData({...formData, total_mw_installed: parseFloat(e.target.value)})}
                        />
                      </div>

                      <div>
                        <Label>Manual Verification Notes</Label>
                        <Textarea
                          value={formData.manual_verification_notes || ''}
                          onChange={(e) => setFormData({...formData, manual_verification_notes: e.target.value})}
                          placeholder="Notes about data collection and verification..."
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select an installer from the list to begin</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SafetyScoreManagement;
