import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, QrCode, X as XIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { bookings, type BookingStatus } from '@/data/mock-data';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [qrBookingId, setQrBookingId] = useState<string | null>(null);

  const myBookings = bookings.filter(b => b.userId === user?.id);
  const filtered = statusFilter === 'all' ? myBookings : myBookings.filter(b => b.status === statusFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your resource bookings.</p>
        </div>
        <Button asChild><Link to="/bookings/new"><Plus className="mr-2 h-4 w-4" />New Booking</Link></Button>
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44"><SelectValue placeholder="Filter by status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {(['Pending', 'Approved', 'Rejected', 'Cancelled'] as BookingStatus[]).map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="shadow-card"><CardContent className="p-8 text-center text-muted-foreground">No bookings found.</CardContent></Card>
        ) : filtered.map(b => (
          <Card key={b.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{b.resourceName}</h3>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-xs text-muted-foreground">{b.date} • {b.startTime}–{b.endTime}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.purpose} • {b.attendees} attendees</p>
                {b.reason && <p className="text-xs text-destructive mt-1">Reason: {b.reason}</p>}
              </div>
              <div className="flex gap-2">
                {b.status === 'Approved' && b.qrCode && (
                  <Button variant="outline" size="sm" onClick={() => setQrBookingId(b.id)}>
                    <QrCode className="h-4 w-4 mr-1" /> Check-in
                  </Button>
                )}
                {b.status === 'Pending' && (
                  <Button variant="outline" size="sm" className="text-destructive">
                    <XIcon className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* QR Modal */}
      <Dialog open={!!qrBookingId} onOpenChange={() => setQrBookingId(null)}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader><DialogTitle>QR Check-in</DialogTitle></DialogHeader>
          <div className="p-6">
            <div className="mx-auto w-48 h-48 bg-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-primary/20 mb-4">
              <div className="text-center">
                <QrCode className="h-16 w-16 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground font-mono">{bookings.find(b => b.id === qrBookingId)?.qrCode}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Scan this QR code at the resource location to check in.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
