import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { auditLogs } from '@/data/mock-data';

export default function AdminAuditPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Audit Activity Log</h1>
        <p className="text-sm text-muted-foreground mt-1">Track all notable actions across the platform.</p>
      </div>

      <div className="space-y-3">
        {auditLogs.map(log => (
          <Card key={log.id} className="shadow-card">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="h-2 w-2 rounded-full gradient-primary mt-2 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium">{log.action}</p>
                  <Badge variant="secondary" className="capitalize text-[10px]">{log.performedByRole}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{log.details}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{log.performedBy} • {new Date(log.timestamp).toLocaleString()}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{log.target}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
