import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { deleteEvent } from '@/app/actions/admin';

export default async function EventsPage() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false });

  if (error) {
    return <div className="text-red-500">Failed to load events: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Events</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your upcoming and past coffee events</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white hover:text-on-primary-container px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Badge</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">Venue</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Capacity</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events?.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-slate-500">
                    No events found. Create your first one!
                  </td>
                </tr>
              ) : (
                events?.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.name} className="w-16 h-10 rounded-lg object-cover bg-slate-100" />
                      ) : (
                        <div className="w-16 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <span className="text-[10px] uppercase font-bold tracking-wider">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{event.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {event.badge || 'Event'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      }) : '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{event.event_time || '-'}</td>
                    <td className="px-6 py-4 text-slate-600">{event.location || '-'}</td>
                    <td className="px-6 py-4">${Number(event.price || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">
                        {event.capacity || 0} seats
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/events/${event.id}`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteEvent(event.id);
                        }}>
                          <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
