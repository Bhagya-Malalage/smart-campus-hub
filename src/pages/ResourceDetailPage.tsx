import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { resources, resourceTypeLabels, bookings } from '@/data/mock-data';

export default function ResourceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = resources.find(r => r.id === id);

  if (!resource) return <div className="text-center py-12"><p>Resource not found.</p><Button variant="link" onClick={() => navigate('/resources')}>Back to resources</Button></div>;

  const resourceBookings = bookings.filter(b => b.resourceId === id && b.status === 'Approved').slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <Button variant="ghost" size="sm" onClick={() => navigate('/resources')} className="gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Resources
      </Button>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-xl overflow-hidden h-64 bg-secondary">
            <img src={resource.image} alt={resource.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{resource.name}</h1>
                <p className="text-sm text-muted-foreground">{resourceTypeLabels[resource.type]}</p>
              </div>
              <StatusBadge status={resource.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{resource.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {resource.amenities.map(a => (
              <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary shrink-0" /><span>{resource.location}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-primary shrink-0" /><span>{resource.availableFrom} – {resource.availableTo}</span></div>
                {resource.capacity && (
                  <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 text-primary shrink-0" /><span>Capacity: {resource.capacity}</span></div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  {resource.status === 'ACTIVE' ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> : <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                  <span>{resource.status === 'ACTIVE' ? 'Available for booking' : 'Currently unavailable'}</span>
                </div>
              </div>

              {resource.status === 'ACTIVE' && (
                <Button className="w-full gradient-primary" asChild>
                  <Link to={`/bookings/new?resource=${resource.id}`}>Book Now</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">Upcoming Bookings</h3>
              {resourceBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming bookings.</p>
              ) : (
                <div className="space-y-2">
                  {resourceBookings.map(b => (
                    <div key={b.id} className="text-xs p-2 bg-secondary/50 rounded-lg">
                      <p className="font-medium">{b.date}</p>
                      <p className="text-muted-foreground">{b.startTime}–{b.endTime} • {b.purpose}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
