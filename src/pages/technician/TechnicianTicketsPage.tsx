import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MessageSquare, Clock } from 'lucide-react';
import { tickets, type Ticket, type TicketStatus } from '@/data/mock-data';
import { toast } from 'sonner';

function SlaTimer({ dueAt }: { dueAt: string }) {
  const due = new Date(dueAt);
  const now = new Date('2026-04-06T12:00:00Z');
  const diff = due.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const overdue = diff < 0;
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${overdue ? 'text-destructive' : hours < 12 ? 'text-warning' : 'text-success'}`}>
      <Clock className="h-3 w-3" />{overdue ? `Overdue ${Math.abs(hours)}h` : `${hours}h left`}
    </span>
  );
}

export default function TechnicianTicketsPage() {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const myTickets = tickets.filter(t => t.assigneeId === user?.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Assigned Tickets</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and resolve your assigned tickets.</p>
      </div>

      <div className="space-y-3">
        {myTickets.map(t => (
          <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer" onClick={() => setSelectedTicket(t)}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{t.title}</h3>
                    <StatusBadge status={t.status} />
                    <StatusBadge status={t.priority} />
                  </div>
                  <p className="text-xs text-muted-foreground">{t.location} • {t.category}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" /> {t.reporterName}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" /> {t.comments.length}
                    </span>
                    <SlaTimer dueAt={t.dueAt} />
                  </div>
                </div>
                <Button size="sm" variant="outline">Update</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader><DialogTitle>{selectedTicket.title}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2"><StatusBadge status={selectedTicket.status} /><StatusBadge status={selectedTicket.priority} /></div>
                <p className="text-sm">{selectedTicket.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Update Status</Label>
                    <Select defaultValue={selectedTicket.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(['Open', 'In Progress', 'Resolved', 'Closed'] as TicketStatus[]).map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground pt-6">
                    <p><strong>Reporter:</strong> {selectedTicket.reporterName}</p>
                    <p><strong>Contact:</strong> {selectedTicket.preferredContact}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Resolution Notes</Label>
                  <Textarea defaultValue={selectedTicket.resolutionNotes || ''} placeholder="Describe what was done..." rows={3} />
                </div>

                {/* Comments */}
                <div>
                  <p className="text-sm font-medium mb-2">Comments ({selectedTicket.comments.length})</p>
                  <div className="space-y-2">
                    {selectedTicket.comments.map(c => (
                      <div key={c.id} className="p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">{c.authorName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded capitalize">{c.authorRole}</span>
                        </div>
                        <p className="text-sm">{c.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Textarea placeholder="Add a comment..." className="text-sm" rows={2} />
                    <Button size="sm" className="shrink-0 self-end gradient-primary">Post</Button>
                  </div>
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
