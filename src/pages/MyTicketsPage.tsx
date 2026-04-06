import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Clock, MessageSquare, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { tickets, type Ticket, type TicketStatus } from '@/data/mock-data';

function SlaTimer({ dueAt }: { dueAt: string }) {
  const due = new Date(dueAt);
  const now = new Date('2026-04-06T12:00:00Z');
  const diff = due.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const overdue = diff < 0;

  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${overdue ? 'text-destructive' : hours < 12 ? 'text-warning' : 'text-success'}`}>
      <Clock className="h-3 w-3" />
      {overdue ? `Overdue by ${Math.abs(hours)}h` : `${hours}h remaining`}
    </span>
  );
}

export default function MyTicketsPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [detailTicket, setDetailTicket] = useState<Ticket | null>(null);

  const myTickets = tickets.filter(t => t.reporterId === user?.id);
  const filtered = statusFilter === 'all' ? myTickets : myTickets.filter(t => t.status === statusFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Tickets</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage your support tickets.</p>
        </div>
        <Button asChild><Link to="/tickets/new"><Plus className="mr-2 h-4 w-4" />New Ticket</Link></Button>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44"><SelectValue placeholder="Filter status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {(['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'] as TicketStatus[]).map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="shadow-card"><CardContent className="p-8 text-center text-muted-foreground">No tickets found.</CardContent></Card>
        ) : filtered.map(t => (
          <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer" onClick={() => setDetailTicket(t)}>
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
                    {t.assigneeName && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" /> {t.assigneeName}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" /> {t.comments.length}
                    </span>
                    <SlaTimer dueAt={t.dueAt} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ticket Detail Modal */}
      <Dialog open={!!detailTicket} onOpenChange={() => setDetailTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {detailTicket && (
            <>
              <DialogHeader>
                <DialogTitle>{detailTicket.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={detailTicket.status} />
                  <StatusBadge status={detailTicket.priority} />
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{detailTicket.category}</span>
                </div>

                <p className="text-sm">{detailTicket.description}</p>

                <div className="text-xs space-y-1 text-muted-foreground">
                  <p><strong>Location:</strong> {detailTicket.location}</p>
                  <p><strong>Reported by:</strong> {detailTicket.reporterName}</p>
                  {detailTicket.assigneeName && <p><strong>Assigned to:</strong> {detailTicket.assigneeName}</p>}
                  <p><strong>Contact:</strong> {detailTicket.preferredContact}</p>
                  <p><strong>Created:</strong> {new Date(detailTicket.createdAt).toLocaleString()}</p>
                </div>

                {detailTicket.attachments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Attachments</p>
                    <div className="flex gap-2">
                      {detailTicket.attachments.map((a, i) => (
                        <div key={i} className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-xs text-muted-foreground">📎 {a}</div>
                      ))}
                    </div>
                  </div>
                )}

                {detailTicket.resolutionNotes && (
                  <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                    <p className="text-xs font-medium text-success mb-1">Resolution Notes</p>
                    <p className="text-sm">{detailTicket.resolutionNotes}</p>
                  </div>
                )}

                {/* Status timeline */}
                <div>
                  <p className="text-sm font-medium mb-2">Status History</p>
                  <div className="space-y-2 border-l-2 border-primary/20 pl-4">
                    {detailTicket.statusHistory.map((h, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-medium">{h.status}</span>
                        <span className="text-muted-foreground"> — {h.changedBy} • {new Date(h.changedAt).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <p className="text-sm font-medium mb-2">Comments ({detailTicket.comments.length})</p>
                  <div className="space-y-3">
                    {detailTicket.comments.map(c => (
                      <div key={c.id} className="p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">{c.authorName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded capitalize">{c.authorRole}</span>
                          <span className="text-[10px] text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</span>
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
