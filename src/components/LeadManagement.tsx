import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MoreHorizontal, 
  Phone, 
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  projectType: string;
  budget: string;
  timeline: string;
  notes: string;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  createdAt: string;
  lastContactedAt?: string;
}

interface LeadManagementProps {
  leads: Lead[];
  onUpdateLead: (id: string, updates: Partial<Lead>) => void;
  onAddNote: (leadId: string, note: string) => void;
}

export const LeadManagement = ({ leads, onUpdateLead, onAddNote }: LeadManagementProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [filterStatus, setFilterStatus] = useState<Lead['status'] | 'all'>('all');

  const filteredLeads = leads.filter(lead => 
    filterStatus === 'all' ? true : lead.status === filterStatus
  );

  const statusColors = {
    new: 'bg-blue-500',
    contacted: 'bg-yellow-500',
    quoted: 'bg-purple-500',
    won: 'bg-green-500',
    lost: 'bg-red-500'
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4" />;
      case 'contacted': return <Phone className="h-4 w-4" />;
      case 'quoted': return <DollarSign className="h-4 w-4" />;
      case 'won': return <CheckCircle className="h-4 w-4" />;
      case 'lost': return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lead Management</h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your solar installation leads
          </p>
        </div>

        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'quoted', 'won', 'lost'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status as typeof filterStatus)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {lead.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      {lead.city}, {lead.state}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className="flex w-fit items-center gap-1"
                    >
                      {getStatusIcon(lead.status)}
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {lead.lastContactedAt 
                      ? format(new Date(lead.lastContactedAt), 'MMM d, yyyy')
                      : '—'
                    }
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Open lead actions menu" type="button">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem onClick={() => {
                            onUpdateLead(lead.id, {
                              lastContactedAt: new Date().toISOString(),
                              status: 'contacted'
                            });
                          }}>
                            <Phone className="h-4 w-4 mr-2" />
                            Mark Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            onUpdateLead(lead.id, { 
                              status: 'quoted'
                            });
                          }}>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Mark Quoted
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            onUpdateLead(lead.id, { 
                              status: 'won'
                            });
                          }}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Won
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            onUpdateLead(lead.id, { 
                              status: 'lost'
                            });
                          }}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Mark Lost
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Lead Details</DialogTitle>
                          <DialogDescription>
                            View and update lead information
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6">
                          {/* Contact Info */}
                          <Card>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-4">Contact Information</h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                                    {lead.phone}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                                    {lead.email}
                                  </a>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <div>
                                    {lead.address}<br />
                                    {lead.city}, {lead.state} {lead.zip}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Project Details */}
                          <Card>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-4">Project Information</h3>
                              <div className="grid gap-4">
                                <div>
                                  <div className="text-sm font-medium mb-1">Project Type</div>
                                  <div className="text-muted-foreground">{lead.projectType}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-1">Budget</div>
                                  <div className="text-muted-foreground">{lead.budget}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium mb-1">Timeline</div>
                                  <div className="text-muted-foreground">{lead.timeline}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Notes Section */}
                          <Card>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-4">Notes</h3>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Add a note..."
                                  value={newNote}
                                  onChange={(e) => setNewNote(e.target.value)}
                                />
                                <Button 
                                  onClick={() => {
                                    if (newNote.trim()) {
                                      onAddNote(lead.id, newNote);
                                      setNewNote('');
                                    }
                                  }}
                                >
                                  Add Note
                                </Button>
                                <div className="border-t pt-4 mt-4">
                                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                                    {lead.notes}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};