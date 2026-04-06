import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Role } from '@/data/mock-data';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignIn = (role: Role) => {
    signIn(role);
    const paths: Record<Role, string> = { user: '/dashboard', admin: '/admin/dashboard', technician: '/technician/dashboard' };
    navigate(paths[role]);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-xl border p-8">
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Smart Campus Operations Hub</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          {/* Google-style button */}
          <Button
            variant="outline"
            className="w-full h-12 text-sm font-medium gap-3 mb-6"
            onClick={() => handleSignIn('user')}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or select a demo role</span></div>
          </div>

          <div className="space-y-3">
            {([
              { role: 'user' as Role, label: 'Student / Faculty', desc: 'Book resources, create tickets, view your dashboard', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
              { role: 'admin' as Role, label: 'Administrator', desc: 'Manage resources, approve bookings, oversee operations', color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100' },
              { role: 'technician' as Role, label: 'Technician / Staff', desc: 'Handle assigned tickets, update resolutions', color: 'bg-violet-50 border-violet-200 hover:bg-violet-100' },
            ]).map(item => (
              <button
                key={item.role}
                onClick={() => handleSignIn(item.role)}
                className={`w-full flex flex-col items-start p-4 rounded-xl border text-left transition-colors ${item.color}`}
              >
                <span className="font-semibold text-sm text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            This is a demo prototype. No real authentication is performed.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
