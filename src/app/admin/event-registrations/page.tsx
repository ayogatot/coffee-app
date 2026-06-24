import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';
import { deleteRegistration } from '@/app/actions/admin';

export default async function EventRegistrationsPage() {
  const { data: registrations, error } = await supabase
    .from('event_registrations')
    .select('*, events(name, event_date)')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Failed to load registrations: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Event Registrations</h2>
        <p className="text-slate-500 text-sm mt-1">See who signed up for your events</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Participant</th>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Registered At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No registrations found yet.
                  </td>
                </tr>
              ) : (
                registrations?.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{reg.participant_name}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">
                        {/* @ts-ignore - Supabase types might not know about the join implicitly without codegen */}
                        {reg.events?.name || 'Unknown Event'}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {/* @ts-ignore */}
                        {reg.events?.event_date ? new Date(reg.events.event_date).toLocaleDateString() : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>WA: {reg.whatsapp_number}</div>
                      {reg.email && <div>Email: {reg.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(reg.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={async () => {
                        'use server';
                        await deleteRegistration(reg.id);
                      }}>
                        <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
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
