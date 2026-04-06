import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { CalendarDays, Ticket, Building2, Clock, ArrowRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { bookings, tickets } from '@/data/mock-data';

export default function UserDashboard() {
  const { user } = useAuth();
  const myBookings = bookings.filter(b => b.userId === user?.id);
  const myTickets = tickets.filter(t => t.reporterId === user?.id);
  const upcoming = myBookings.filter(b => b.status === 'Approved').slice(0, 3);
  const recentTickets = myTickets.slice(0, 3);

  const stats = [
    { label: 'Upcoming Bookings', value: myBookings.filter(b => b.status === 'Approved').length, icon: CalendarDays, color: 'text-primary' },
    { label: 'Pending Requests', value: myBookings.filter(b => b.status === 'Pending').length, icon: Clock, color: 'text-warning' },
    { label: 'Active Tickets', value: myTickets.filter(t => ['Open', 'In Progress'].includes(t.status)).length, icon: Ticket, color: 'text-accent' },
    { label: 'Total Resources', value: '10', icon: Building2, color: 'text-success' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your campus activities.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/resources"><Plus className="mr-2 h-4 w-4" />Book a Resource</Link></Button>
        <Button variant="outline" asChild><Link to="/tickets/new"><Ticket className="mr-2 h-4 w-4" />Create Ticket</Link></Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming bookings */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Upcoming Bookings</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/bookings">View all <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No upcoming bookings</p>
            ) : upcoming.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{b.resourceName}</p>
                  <p className="text-xs text-muted-foreground">{b.date} • {b.startTime}–{b.endTime}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent tickets */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Tickets</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/tickets">View all <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTickets.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No tickets</p>
            ) : recentTickets.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={t.priority} />
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
