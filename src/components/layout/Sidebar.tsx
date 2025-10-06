import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Gavel, Archive, FileStack, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SessionSelector } from './SessionSelector';
import { getCurrentSession } from '@/data/client';

const navItems = [
  { to: '/triage', icon: LayoutDashboard, label: 'Triage Queue' },
  { to: '/bills', icon: FileText, label: 'All Bills' },
  { to: '/hearings', icon: Gavel, label: 'Hearings' },
  { to: '/archive', icon: Archive, label: 'Context Archive' },
  { to: '/digests', icon: FileStack, label: 'Digests' },
];

export function Sidebar() {
  const [selectedSession, setSelectedSession] = useState(getCurrentSession());

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">GRO Control</h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Legislative Tracker</p>
        <div className="mt-4">
          <SessionSelector value={selectedSession} onChange={setSelectedSession} />
        </div>
      </div>

      <div className="p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
          <input
            type="text"
            placeholder="Search bills..."
            className="w-full pl-10 pr-4 py-2 bg-sidebar-accent rounded-md text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
          />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60">
          <p>2025 Session Active</p>
          <p className="mt-1">Last sync: 2 min ago</p>
        </div>
      </div>
    </aside>
  );
}
