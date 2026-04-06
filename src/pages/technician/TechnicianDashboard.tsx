import { useAuth } from '@/contexts/AuthContext';
import { Clock, Ticket, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { tickets } from '@/data/mock-data';
import { Link } from 'react-router-dom';

export default function TechnicianDashboard() {
  const { user } = useAuth();
  const myTickets = tickets.filter(t => t.assigneeId === user?.id);
  const active = myTickets.filter(t => ['Open', 'In Progress'].includes(t.status));
  const resolved = myTickets.filter(t => t.status === 'Resolved');

  const dueSoon = myTickets.filter(t => {
    if (t.status === 'Closed' || t.status === 'Resolved') return false;
    const due = new Date(t.dueAt);
    const now = new Date('2026-04-06T12:00:00Z');
    return (due.getTime() - now.getTime()) < 24 * 60 * 60 * 1000;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Technician Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, {user?.name}. Here are your assignments.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Tickets', value: myTickets.length, icon: Ticket, color: 'text-primary' },
          { label: 'Active', value: active.length, icon: Clock, color: 'text-warning' },
          { label: 'Due Soon', value: dueSoon.length, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'Resolved', value: resolved.length, icon: CheckCircle2, color: 'text-success' },
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

      {dueSoon.length > 0 && (
        <Card className="shadow-card border-destructive/20">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /> Due Soon</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {dueSoon.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.location} • {t.priority}</p>
                </div>
                <StatusBadge status={t.priority} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Active Tickets</CardTitle>
          <Button variant="ghost" size="sm" asChild><Link to="/technician/tickets">View all</Link></Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {active.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.location} • {t.category}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={t.status} />
                <StatusBadge status={t.priority} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
