import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { demoUsers } from '@/data/mock-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Users & Roles</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of registered users and their roles.</p>
      </div>

      <div className="grid gap-3">
        {demoUsers.map(u => (
          <Card key={u.id} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="gradient-primary text-primary-foreground font-semibold text-sm">{u.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email} • {u.department}</p>
              </div>
              <Badge variant="secondary" className="capitalize">{u.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
