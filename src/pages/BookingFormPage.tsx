import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resources, bookings } from '@/data/mock-data';
import { toast } from 'sonner';

export default function BookingFormPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const preselectedResource = params.get('resource') || '';

  const [resourceId, setResourceId] = useState(preselectedResource);
  const [date, setDate] = useState('2026-04-07');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [purpose, setPurpose] = useState('');
  const [attendees, setAttendees] = useState('');

  const activeResources = resources.filter(r => r.status === 'ACTIVE');

  // Conflict check
  const conflicts = bookings.filter(b =>
    b.resourceId === resourceId &&
    b.date === date &&
    b.status !== 'Rejected' &&
    b.status !== 'Cancelled' &&
    ((startTime >= b.startTime && startTime < b.endTime) || (endTime > b.startTime && endTime <= b.endTime) || (startTime <= b.startTime && endTime >= b.endTime))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request submitted! It will be reviewed by an administrator.');
    navigate('/bookings');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>New Booking Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Resource</Label>
              <Select value={resourceId} onValueChange={setResourceId}>
                <SelectTrigger><SelectValue placeholder="Select a resource" /></SelectTrigger>
                <SelectContent>
                  {activeResources.map(r => <SelectItem key={r.id} value={r.id}>{r.name} — {r.location}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
              </div>
            </div>

            {conflicts.length > 0 && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20 text-sm">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warning">Scheduling Conflict Detected</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {conflicts.length} existing booking(s) overlap with your selected time. Consider a different slot.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Purpose</Label>
              <Textarea placeholder="Describe the purpose of your booking..." value={purpose} onChange={e => setPurpose(e.target.value)} rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Expected Attendees</Label>
              <Input type="number" placeholder="Number of attendees" value={attendees} onChange={e => setAttendees(e.target.value)} />
            </div>

            <Button type="submit" className="w-full gradient-primary">Submit Booking Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
