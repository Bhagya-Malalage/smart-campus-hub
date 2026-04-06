import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Mail, MessageSquare, CalendarDays, Ticket, Settings, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notifications as allNotifications } from '@/data/mock-data';

export default function NotificationsPage() {
  const { user } = useAuth();
  const myNotifs = allNotifications.filter(n => n.userId === user?.id);
  const [readState, setReadState] = useState<Record<string, boolean>>(
    Object.fromEntries(myNotifs.map(n => [n.id, n.read]))
  );

  const markAllRead = () => setReadState(Object.fromEntries(myNotifs.map(n => [n.id, true])));
  const unread = myNotifs.filter(n => !readState[n.id]);

  const iconMap: Record<string, React.ReactNode> = {
    booking: <CalendarDays className="h-4 w-4 text-primary" />,
    ticket: <Ticket className="h-4 w-4 text-accent" />,
    comment: <MessageSquare className="h-4 w-4 text-info" />,
    system: <Settings className="h-4 w-4 text-muted-foreground" />,
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <Tabs defaultValue="notifications">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-1">{unread.length} unread notifications</p>
          </div>
          <TabsList>
            <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-1" /> Inbox</TabsTrigger>
            <TabsTrigger value="preferences"><Settings className="h-4 w-4 mr-1" /> Preferences</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications" className="space-y-3">
          {unread.length > 0 && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={markAllRead}><Check className="h-3 w-3 mr-1" /> Mark all read</Button>
            </div>
          )}
          {myNotifs.map(n => (
            <Card key={n.id} className={`shadow-card transition-colors ${!readState[n.id] ? 'border-primary/20 bg-primary/[0.02]' : ''}`}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="mt-0.5">{iconMap[n.type]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    {!readState[n.id] && <span className="h-2 w-2 rounded-full gradient-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                {!readState[n.id] && (
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setReadState({ ...readState, [n.id]: true })}>
                    <Check className="h-3 w-3" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Booking Approvals & Rejections', desc: 'Get notified when your booking requests are reviewed', icon: CalendarDays },
                { label: 'Ticket Status Changes', desc: 'Updates when your tickets change status', icon: Ticket },
                { label: 'New Comments', desc: 'When someone comments on your tickets', icon: MessageSquare },
                { label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
                { label: 'System Announcements', desc: 'Important system-wide announcements', icon: Bell },
              ].map(pref => (
                <div key={pref.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <pref.icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm">{pref.label}</Label>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
