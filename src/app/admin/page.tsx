import { supabase } from '@/lib/supabase';

export default async function AdminDashboardPage() {
  const todayStr = new Date().toISOString().split('T')[0];

  // Fetch counts from Supabase in parallel
  const [
    { count: beansCount, error: beansError },
    { count: upcomingEventsCount, error: eventsError },
    { count: pendingOrdersCount, error: ordersError },
    { count: registrationsCount, error: registrationsError },
  ] = await Promise.all([
    supabase.from('coffee_beans').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }).gte('event_date', todayStr),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('event_registrations').select('*', { count: 'exact', head: true }),
  ]);

  if (beansError) console.error('Error fetching beans count:', beansError);
  if (eventsError) console.error('Error fetching events count:', eventsError);
  if (ordersError) console.error('Error fetching orders count:', ordersError);
  if (registrationsError) console.error('Error fetching registrations count:', registrationsError);

  const stats = [
    { label: 'Total Beans', value: beansCount !== null ? String(beansCount) : '0' },
    { label: 'Upcoming Events', value: upcomingEventsCount !== null ? String(upcomingEventsCount) : '0' },
    { label: 'Pending Orders', value: pendingOrdersCount !== null ? String(pendingOrdersCount) : '0' },
    { label: 'Registrations', value: registrationsCount !== null ? String(registrationsCount) : '0' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to the Admin Portal</h2>
        <p className="text-slate-600">
          Use the navigation on the left to manage your Coffee Beans, Events, Orders, and Registrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">{stat.label}</span>
            <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
