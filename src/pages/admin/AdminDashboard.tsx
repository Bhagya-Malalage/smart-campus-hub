import { CalendarDays, Ticket, Building2, Users, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { bookings, tickets, resources, demoUsers } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const bookingsByDay = [
  { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 15 },
  { day: 'Thu', count: 22 }, { day: 'Fri', count: 20 }, { day: 'Sat', count: 5 }, { day: 'Sun', count: 3 },
];

const peakHours = [
  { hour: '8am', count: 8 }, { hour: '9am', count: 15 }, { hour: '10am', count: 22 },
  { hour: '11am', count: 18 }, { hour: '12pm', count: 10 }, { hour: '1pm', count: 14 },
  { hour: '2pm', count: 20 }, { hour: '3pm', count: 16 }, { hour: '4pm', count: 12 },
];

const statusPie = [
  { name: 'Approved', value: 45 }, { name: 'Pending', value: 12 },
  { name: 'Rejected', value: 5 }, { name: 'Cancelled', value: 3 },
];
const COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#94a3b8'];

export default function AdminDashboard() {
  const pendingBookings = bookings.filter(b => b.status === 'Pending');
  const openTickets = tickets.filter(t => ['Open', 'In Progress'].includes(t.status));
  const criticalTickets = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Closed');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Operations overview for Smart Campus.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Resources', value: resources.length, icon: Building2, color: 'text-primary' },
          { label: 'Active Bookings', value: bookings.filter(b => b.status === 'Approved').length, icon: CalendarDays, color: 'text-success' },
          { label: 'Pending Approval', value: pendingBookings.length, icon: Clock, color: 'text-warning' },
          { label: 'Open Tickets', value: openTickets.length, icon: Ticket, color: 'text-accent' },
          { label: 'Total Users', value: demoUsers.length, icon: Users, color: 'text-info' },
        ].map(s => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4">
              <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Peak Booking Hours</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={peakHours}>
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(230, 70%, 52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Booking Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={statusPie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                  {statusPie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {statusPie.map((s, i) => (
                <span key={s.name} className="flex items-center gap-1 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />{s.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Approval queue */}
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Approval Queue ({pendingBookings.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {pendingBookings.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{b.resourceName}</p>
                  <p className="text-xs text-muted-foreground">{b.userName} • {b.date} {b.startTime}–{b.endTime}</p>
                </div>
                <StatusBadge status="Pending" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Critical tickets */}
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /> Critical Tickets</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {criticalTickets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No critical tickets</p>
            ) : criticalTickets.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top resources */}
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Top Resources by Bookings</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bookingsByDay} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="day" tick={{ fontSize: 11 }} width={40} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(250, 60%, 58%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource utilization */}
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Resource Utilization</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {resources.filter(r => r.status === 'ACTIVE').slice(0, 5).map((r, i) => {
              const util = [85, 72, 60, 45, 90][i];
              return (
                <div key={r.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-muted-foreground">{util}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${util}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
