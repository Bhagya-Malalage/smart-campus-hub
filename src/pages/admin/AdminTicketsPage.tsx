import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/StatusBadge';
import { User } from 'lucide-react';
import { tickets, demoUsers, type Ticket, type TicketStatus } from '@/data/mock-data';
import { toast } from 'sonner';

export default function AdminTicketsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const technicians = demoUsers.filter(u => u.role === 'technician');
  const filtered = statusFilter === 'all' ? tickets : tickets.filter(t => t.status === statusFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Ticket Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Assign, track, and resolve all support tickets.</p>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44"><SelectValue placeholder="Filter" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {(['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'] as TicketStatus[]).map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-3">
        {filtered.map(t => (
          <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer" onClick={() => setSelectedTicket(t)}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{t.title}</h3>
                    <StatusBadge status={t.status} />
                    <StatusBadge status={t.priority} />
                  </div>
                  <p className="text-xs text-muted-foreground">{t.reporterName} • {t.location} • {t.category}</p>
                  {t.assigneeName && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><User className="h-3 w-3" /> Assigned: {t.assigneeName}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-lg">
          {selectedTicket && (
            <>
              <DialogHeader><DialogTitle>{selectedTicket.title}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2"><StatusBadge status={selectedTicket.status} /><StatusBadge status={selectedTicket.priority} /></div>
                <p className="text-sm">{selectedTicket.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Assign Technician</Label>
                    <Select defaultValue={selectedTicket.assigneeId || ''}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {technicians.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Update Status</Label>
                    <Select defaultValue={selectedTicket.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'] as TicketStatus[]).map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Resolution Notes</Label>
                  <Textarea defaultValue={selectedTicket.resolutionNotes || ''} placeholder="Add resolution notes..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedTicket(null)}>Cancel</Button>
                <Button className="gradient-primary" onClick={() => { toast.success('Ticket updated (demo)'); setSelectedTicket(null); }}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
