export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to the Admin Portal</h2>
        <p className="text-slate-600">
          Use the navigation on the left to manage your Coffee Beans, Events, Orders, and Registrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder for Stats Cards */}
        {[
          { label: 'Total Beans', value: '...' },
          { label: 'Upcoming Events', value: '...' },
          { label: 'Pending Orders', value: '...' },
          { label: 'Registrations', value: '...' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">{stat.label}</span>
            <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
