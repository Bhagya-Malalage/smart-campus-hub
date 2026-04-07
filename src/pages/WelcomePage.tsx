import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Role } from '@/data/mock-data';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const [dbStatus, setDbStatus] = useState<{status: string, message: string} | null>(null);

  const testDbConnection = async () => {
    try {
      setDbStatus({ status: 'loading', message: 'Connecting to Java backend...' });
      const res = await fetch('http://localhost:8082/api/test-db');
      const data = await res.json();
      setDbStatus(data);
    } catch(err: any) {
      setDbStatus({ status: 'error', message: 'Backend unreachable. Is it running? (' + err.message + ')' });
    }
  };

  if (isAuthenticated) {
    const paths: Record<Role, string> = { user: '/dashboard', admin: '/admin/dashboard', technician: '/technician/dashboard' };
    navigate(paths[role], { replace: true });
  }

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-12 py-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-primary-foreground">Smart Campus Operations Hub</span>
        </div>
        <Button variant="outline" onClick={() => navigate('/sign-in')}
          className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20">
          Sign In
        </Button>
      </header>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80 text-sm mb-6">
            🎓 University Operations Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary-foreground leading-tight mb-6">
            Manage Your Campus
            <span className="block bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Book facilities, report issues, track maintenance — all from one unified platform.
            Designed for students, faculty, and operations teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/sign-in')}
              className="gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow text-base px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={testDbConnection}
              className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 text-base px-8">
              Test Database Connection
            </Button>
          </div>

          {dbStatus && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} 
              className={`mt-6 p-4 rounded-lg font-mono text-sm max-w-lg mx-auto ${
                dbStatus.status === 'success' ? 'bg-green-500/20 text-green-100 border border-green-500/50' :
                dbStatus.status === 'loading' ? 'bg-blue-500/20 text-blue-100 border border-blue-500/50' :
                'bg-red-500/20 text-red-100 border border-red-500/50'
              }`}>
              <div className="font-bold mb-1 uppercase tracking-wider">{dbStatus.status}</div>
              <div>{dbStatus.message}</div>
            </motion.div>
          )}

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
          >
            {[
              { title: 'Facility Booking', desc: 'Reserve halls, labs, and equipment with conflict-free scheduling.' },
              { title: 'Maintenance Tickets', desc: 'Report issues, track progress, and get real-time updates.' },
              { title: 'Role-Based Access', desc: 'Tailored dashboards for users, admins, and technicians.' },
            ].map(f => (
              <div key={f.title} className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-6 text-left">
                <h3 className="font-semibold text-primary-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-primary-foreground/60">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <footer className="py-6 text-center text-primary-foreground/40 text-sm">
        © 2026 Smart Campus Operations Hub — Demo Prototype
      </footer>
    </div>
  );
}
