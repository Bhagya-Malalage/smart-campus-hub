import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/StatusBadge';
import { Check, X } from 'lucide-react';
import { bookings, type BookingStatus } from '@/data/mock-data';
import { toast } from 'sonner';

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reviewBooking, setReviewBooking] = useState<typeof bookings[0] | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [reason, setReason] = useState('');

  const filtered = statusFilter === 'all' ? bookings : bookings.filter(b => b.status === statusFilter);

  const handleAction = () => {
    toast.success(`Booking ${action === 'approve' ? 'approved' : 'rejected'} (demo)`);
    setReviewBooking(null);
    setAction(null);
    setReason('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Booking Review</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and manage all booking requests.</p>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44"><SelectValue placeholder="Filter" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {(['Pending', 'Approved', 'Rejected', 'Cancelled'] as BookingStatus[]).map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-3">
        {filtered.map(b => (
          <Card key={b.id} className="shadow-card">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{b.resourceName}</h3>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-xs text-muted-foreground">By {b.userName} • {b.date} {b.startTime}–{b.endTime}</p>
                <p className="text-xs text-muted-foreground">{b.purpose} • {b.attendees} attendees</p>
                {b.reason && <p className="text-xs text-destructive mt-1">Reason: {b.reason}</p>}
              </div>
              {b.status === 'Pending' && (
                <div className="flex gap-2">
                  <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => { setReviewBooking(b); setAction('approve'); }}>
                    <Check className="h-3 w-3 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => { setReviewBooking(b); setAction('reject'); }}>
                    <X className="h-3 w-3 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!reviewBooking} onOpenChange={() => { setReviewBooking(null); setAction(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>{action === 'approve' ? 'Approve' : 'Reject'} Booking</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">
              <strong>{reviewBooking?.resourceName}</strong> by {reviewBooking?.userName}<br />
              {reviewBooking?.date} {reviewBooking?.startTime}–{reviewBooking?.endTime}
            </p>
            {action === 'reject' && (
              <div className="space-y-2">
                <Label>Reason for rejection (required)</Label>
                <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Provide a reason..." />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewBooking(null)}>Cancel</Button>
            <Button onClick={handleAction} className={action === 'approve' ? 'bg-success hover:bg-success/90 text-success-foreground' : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'}>
              {action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
