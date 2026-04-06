import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Building2, CalendarDays, Ticket, Bell, Settings, Users, ClipboardList,
  Shield, Activity, LogOut, ChevronLeft, ChevronRight, Search, Menu, Wrench, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { notifications as allNotifications } from '@/data/mock-data';
import type { Role } from '@/data/mock-data';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const userNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Resources', icon: Building2, path: '/resources' },
  { label: 'My Bookings', icon: CalendarDays, path: '/bookings' },
  { label: 'My Tickets', icon: Ticket, path: '/tickets' },
  { label: 'Notifications', icon: Bell, path: '/notifications' },
];

const adminNav = [
  { label: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Resources', icon: Building2, path: '/resources' },
  { label: 'Manage Resources', icon: Settings, path: '/admin/resources' },
  { label: 'Booking Review', icon: CalendarDays, path: '/admin/bookings' },
  { label: 'Ticket Management', icon: Ticket, path: '/admin/tickets' },
  { label: 'Users & Roles', icon: Users, path: '/admin/users' },
  { label: 'Audit Log', icon: Activity, path: '/admin/audit' },
  { label: 'Notifications', icon: Bell, path: '/notifications' },
];

const techNav = [
  { label: 'My Dashboard', icon: LayoutDashboard, path: '/technician/dashboard' },
  { label: 'Assigned Tickets', icon: ClipboardList, path: '/technician/tickets' },
  { label: 'Resources', icon: Building2, path: '/resources' },
  { label: 'Notifications', icon: Bell, path: '/notifications' },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, signOut, switchRole, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = role === 'admin' ? adminNav : role === 'technician' ? techNav : userNav;
  const unreadCount = allNotifications.filter(n => n.userId === user?.id && !n.read).length;

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const NavItems = () => (
    <>
      {nav.map(item => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              active
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
            {item.label === 'Notifications' && unreadCount > 0 && !collapsed && (
              <Badge className="ml-auto h-5 px-1.5 text-[10px] gradient-primary border-0">{unreadCount}</Badge>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}>
        <div className={cn('flex items-center gap-2 p-4 border-b border-sidebar-border', collapsed && 'justify-center')}>
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-sm text-sidebar-foreground">Smart Campus Hub</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavItems />
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-lg text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-sidebar flex flex-col z-50 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm text-sidebar-foreground">Smart Campus Hub</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground/50"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto"><NavItems /></nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-muted-foreground">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resources, bookings, tickets..." className="pl-9 w-72 h-9 bg-secondary border-0" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Role switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs gap-1.5 h-8">
                  <Wrench className="h-3 w-3" />
                  <span className="hidden sm:inline">Demo:</span> {role}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Switch Demo Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(['user', 'admin', 'technician'] as Role[]).map(r => (
                  <DropdownMenuItem key={r} onClick={() => {
                    switchRole(r);
                    const paths: Record<Role, string> = { user: '/dashboard', admin: '/admin/dashboard', technician: '/technician/dashboard' };
                    navigate(paths[r]);
                  }}>
                    <span className={cn('capitalize', r === role && 'font-semibold')}>{r}</span>
                    {r === role && <Badge className="ml-2 text-[10px]" variant="secondary">Active</Badge>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications bell */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9" onClick={() => navigate('/notifications')}>
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full gradient-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">
                      {user?.avatar}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">{user?.role} • {user?.department}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/notifications')}>
                  <Settings className="mr-2 h-4 w-4" />Notification Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
