import { updateEvent } from '@/app/actions/admin';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !event) {
    notFound();
  }

  const updateEventWithId = updateEvent.bind(null, id);

  // Format the date to match the datetime-local input requirement (YYYY-MM-DDThh:mm)
  // Shift to local time before slicing to prevent timezone drift in the input picker
  const eventDateLocal = event.event_date ? new Date(event.event_date) : null;
  const formattedDate = eventDateLocal 
    ? new Date(eventDateLocal.getTime() - eventDateLocal.getTimezoneOffset() * 60000).toISOString().slice(0, 16) 
    : '';

  // Preload Whats Included
  let whatsIncluded: string[] = [];
  try {
    if (Array.isArray(event.whats_included)) {
      whatsIncluded = event.whats_included;
    } else if (typeof event.whats_included === 'string') {
      whatsIncluded = JSON.parse(event.whats_included);
    }
  } catch (e) {}

  const item1 = whatsIncluded[0] || '';
  const item2 = whatsIncluded[1] || '';
  const item3 = whatsIncluded[2] || '';
  const item4 = whatsIncluded[3] || '';

  // Preload Highlights
  let highlights: any[] = [];
  try {
    if (Array.isArray(event.highlights)) {
      highlights = event.highlights;
    } else if (typeof event.highlights === 'string') {
      highlights = JSON.parse(event.highlights);
    }
  } catch (e) {}

  const hlTitle1 = highlights[0]?.title || '';
  const hlDesc1 = highlights[0]?.description || '';
  const hlTitle2 = highlights[1]?.title || '';
  const hlDesc2 = highlights[1]?.description || '';
  const hlTitle3 = highlights[2]?.title || '';
  const hlDesc3 = highlights[2]?.description || '';
  const hlTitle4 = highlights[3]?.title || '';
  const hlDesc4 = highlights[3]?.description || '';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="p-2 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Event</h2>
          <p className="text-slate-500 text-sm">Update details for {event.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <form action={updateEventWithId} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Basic Information</h3>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Event Name *</label>
              <input required type="text" id="name" name="name" defaultValue={event.name} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-slate-700 mb-2">Badge / Subtitle</label>
              <input type="text" id="badge" name="badge" defaultValue={event.badge || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="event_date" className="block text-sm font-medium text-slate-700 mb-2">Event Date *</label>
              <input required type="datetime-local" id="event_date" name="event_date" defaultValue={formattedDate} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="event_time" className="block text-sm font-medium text-slate-700 mb-2">Event Time Range</label>
              <input type="text" id="event_time" name="event_time" defaultValue={event.event_time || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">Venue Location / Name</label>
              <input type="text" id="location" name="location" defaultValue={event.location || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="venue_address" className="block text-sm font-medium text-slate-700 mb-2">Venue Address</label>
              <input type="text" id="venue_address" name="venue_address" defaultValue={event.venue_address || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 mb-2">Header / Promotional Image URL</label>
              <input type="url" id="image_url" name="image_url" defaultValue={event.image_url || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              {event.image_url && (
                <div className="mt-4">
                  <span className="block text-xs font-medium text-slate-500 mb-2">Current Image Preview</span>
                  <img src={event.image_url} alt="Preview" className="w-48 h-32 object-cover rounded-xl border border-slate-200 bg-slate-50" />
                </div>
              )}
            </div>

            {/* Pricing & Capacity */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Pricing & Capacity</h3>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">Price per Seat ($) *</label>
              <input required type="number" step="0.01" min="0" id="price" name="price" defaultValue={event.price || 0} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-slate-700 mb-2">Total Capacity (Seats) *</label>
              <input required type="number" min="0" id="capacity" name="capacity" defaultValue={event.capacity || 0} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            {/* Host Details */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Host Details</h3>
            </div>

            <div>
              <label htmlFor="host_name" className="block text-sm font-medium text-slate-700 mb-2">Host Name</label>
              <input type="text" id="host_name" name="host_name" defaultValue={event.host_name || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="host_title" className="block text-sm font-medium text-slate-700 mb-2">Host Title</label>
              <input type="text" id="host_title" name="host_title" defaultValue={event.host_title || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="host_avatar_url" className="block text-sm font-medium text-slate-700 mb-2">Host Avatar Image URL</label>
              <input type="url" id="host_avatar_url" name="host_avatar_url" defaultValue={event.host_avatar_url || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="host_bio" className="block text-sm font-medium text-slate-700 mb-2">Host Bio</label>
              <textarea id="host_bio" name="host_bio" rows={3} defaultValue={event.host_bio || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
            </div>

            {/* What's Included */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">What's Included (Up to 4 Items)</h3>
            </div>

            <div>
              <label htmlFor="whats_included_1" className="block text-xs font-medium text-slate-500 mb-1.5">Item 1</label>
              <input type="text" id="whats_included_1" name="whats_included_1" defaultValue={item1} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" />
            </div>
            <div>
              <label htmlFor="whats_included_2" className="block text-xs font-medium text-slate-500 mb-1.5">Item 2</label>
              <input type="text" id="whats_included_2" name="whats_included_2" defaultValue={item2} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" />
            </div>
            <div>
              <label htmlFor="whats_included_3" className="block text-xs font-medium text-slate-500 mb-1.5">Item 3</label>
              <input type="text" id="whats_included_3" name="whats_included_3" defaultValue={item3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" />
            </div>
            <div>
              <label htmlFor="whats_included_4" className="block text-xs font-medium text-slate-500 mb-1.5">Item 4</label>
              <input type="text" id="whats_included_4" name="whats_included_4" defaultValue={item4} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" />
            </div>

            {/* Highlights */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Masterclass Highlights (Up to 4 Card Items)</h3>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="font-semibold text-xs text-slate-600 block">Highlight 1</span>
              <div>
                <label htmlFor="highlight_title_1" className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                <input type="text" id="highlight_title_1" name="highlight_title_1" defaultValue={hlTitle1} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Green Grading" />
              </div>
              <div>
                <label htmlFor="highlight_desc_1" className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <input type="text" id="highlight_desc_1" name="highlight_desc_1" defaultValue={hlDesc1} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Learn to evaluate raw beans..." />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="font-semibold text-xs text-slate-600 block">Highlight 2</span>
              <div>
                <label htmlFor="highlight_title_2" className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                <input type="text" id="highlight_title_2" name="highlight_title_2" defaultValue={hlTitle2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Profile Development" />
              </div>
              <div>
                <label htmlFor="highlight_desc_2" className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <input type="text" id="highlight_desc_2" name="highlight_desc_2" defaultValue={hlDesc2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Master the roasting curve..." />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="font-semibold text-xs text-slate-600 block">Highlight 3</span>
              <div>
                <label htmlFor="highlight_title_3" className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                <input type="text" id="highlight_title_3" name="highlight_title_3" defaultValue={hlTitle3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Production Roasting" />
              </div>
              <div>
                <label htmlFor="highlight_desc_3" className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <input type="text" id="highlight_desc_3" name="highlight_desc_3" defaultValue={hlDesc3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Get hands-on experience..." />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="font-semibold text-xs text-slate-600 block">Highlight 4</span>
              <div>
                <label htmlFor="highlight_title_4" className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                <input type="text" id="highlight_title_4" name="highlight_title_4" defaultValue={hlTitle4} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Sensory Analysis" />
              </div>
              <div>
                <label htmlFor="highlight_desc_4" className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <input type="text" id="highlight_desc_4" name="highlight_desc_4" defaultValue={hlDesc4} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Cup your own roasts..." />
              </div>
            </div>

            {/* About / Description */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">About the Event</h3>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">About / Description</label>
              <textarea id="description" name="description" rows={5} defaultValue={event.description || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white hover:text-on-primary-container px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
