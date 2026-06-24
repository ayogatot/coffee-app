'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Coffee, Calendar, ShoppingCart, Users, LayoutDashboard, LogOut, Globe } from 'lucide-react';
import { logoutAdmin } from '@/app/actions/auth';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Coffee Beans', href: '/admin/coffee-beans', icon: Coffee },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Registrations', href: '/admin/event-registrations', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-lg font-bold text-primary tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link
                key={item.name}
                href={item.href}
                style={isActive ? { backgroundColor: '#0f172a', color: '#ffffff' } : undefined}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon 
                  style={isActive ? { color: '#ffffff' } : undefined}
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${!isActive ? 'text-slate-400' : ''}`} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link
            href="/"
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Globe className="mr-3 flex-shrink-0 h-5 w-5 text-slate-400" />
            Back to Website
          </Link>
          <form action={logoutAdmin} className="block">
            <button
              type="submit"
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-500" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 flex-shrink-0">
          <h1 className="text-xl font-semibold text-slate-800">
            {navigation.find((item) => item.href === pathname || (pathname.startsWith(item.href) && item.href !== '/admin'))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              A
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
