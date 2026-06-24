import { updateCoffeeBean } from '@/app/actions/admin';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditCoffeeBeanPage({ params }: { params: { id: string } }) {
  // Await the params object before using its properties to comply with Next.js 15+ constraints (even if using Next.js 14, it's good practice for app router).
  // Next 15+ treats params as a promise. Next 14 handles it synchronously. Since the user might be on a newer version, let's await it or use React.use. 
  // Actually, in Next.js Server Components, params is an async promise in React 19/Next 15. The prompt says React 19.2.4. So params is a promise.
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: bean, error } = await supabase
    .from('coffee_beans')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !bean) {
    notFound();
  }

  // Pre-bind the server action with the ID
  const updateBeanWithId = updateCoffeeBean.bind(null, id);

  let imageUrls: string[] = [];
  try {
    if (Array.isArray(bean.image_url)) {
      imageUrls = bean.image_url;
    } else if (typeof bean.image_url === 'string') {
      if (bean.image_url.trim().startsWith('[')) {
        imageUrls = JSON.parse(bean.image_url);
      } else {
        imageUrls = [bean.image_url];
      }
    }
  } catch (e) {
    imageUrls = [];
  }

  const img1 = imageUrls[0] || '';
  const img2 = imageUrls[1] || '';
  const img3 = imageUrls[2] || '';
  const img4 = imageUrls[3] || '';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/coffee-beans" className="p-2 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Bean</h2>
          <p className="text-slate-500 text-sm">Update details for {bean.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <form action={updateBeanWithId} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Basic Information</h3>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
              <input required type="text" id="name" name="name" defaultValue={bean.name} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
              <select required id="category" name="category" defaultValue={bean.category || 'Roasted Bean'} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white transition-all">
                <option value="Roasted Bean">Roasted Bean</option>
                <option value="Green Bean">Green Bean</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">Price ($) *</label>
              <input required type="number" step="0.01" min="0" id="price" name="price" defaultValue={bean.price} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-2">Stock *</label>
              <input required type="number" min="0" id="stock" name="stock" defaultValue={bean.stock} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>

            {/* Roasted Bean Specific */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Roasted Bean Specifications</h3>
            </div>

            <div>
              <label htmlFor="roast_level" className="block text-sm font-medium text-slate-700 mb-2">Roast Level</label>
              <input type="text" id="roast_level" name="roast_level" defaultValue={bean.roast_level || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Light-Medium" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="brewing_recommendations" className="block text-sm font-medium text-slate-700 mb-2">Brewing Recommendations</label>
              <textarea id="brewing_recommendations" name="brewing_recommendations" rows={3} defaultValue={bean.brewing_recommendations || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="We recommend a 1:16 ratio using a Chemex or V60..."></textarea>
            </div>

            {/* Green Bean & Shared Specifications */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Green Bean / Shared Specifications</h3>
            </div>

            <div>
              <label htmlFor="species" className="block text-sm font-medium text-slate-700 mb-2">Species</label>
              <input type="text" id="species" name="species" defaultValue={bean.species || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Excelsa, Arabica" />
            </div>

            <div>
              <label htmlFor="variety" className="block text-sm font-medium text-slate-700 mb-2">Variety / Varietal</label>
              <input type="text" id="variety" name="variety" defaultValue={bean.variety || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Excelsa, Bourbon" />
            </div>

            <div>
              <label htmlFor="process" className="block text-sm font-medium text-slate-700 mb-2">Process</label>
              <input type="text" id="process" name="process" defaultValue={bean.process || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Mossto Anaerobic Natural" />
            </div>

            <div>
              <label htmlFor="fermentation" className="block text-sm font-medium text-slate-700 mb-2">Fermentation</label>
              <input type="text" id="fermentation" name="fermentation" defaultValue={bean.fermentation || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. 120 Hour" />
            </div>

            <div>
              <label htmlFor="fermentation_temp" className="block text-sm font-medium text-slate-700 mb-2">Fermentation Temperature</label>
              <input type="text" id="fermentation_temp" name="fermentation_temp" defaultValue={bean.fermentation_temp || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. 24-25 °C" />
            </div>

            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-slate-700 mb-2">Origin</label>
              <input type="text" id="origin" name="origin" defaultValue={bean.origin || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Wonosalam, East Java, Indonesia" />
            </div>

            <div>
              <label htmlFor="elevation" className="block text-sm font-medium text-slate-700 mb-2">Elevation / Altitude</label>
              <input type="text" id="elevation" name="elevation" defaultValue={bean.elevation || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. 600 masl" />
            </div>

            <div>
              <label htmlFor="drying_method" className="block text-sm font-medium text-slate-700 mb-2">Drying Methods</label>
              <input type="text" id="drying_method" name="drying_method" defaultValue={bean.drying_method || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Sun Drying" />
            </div>

            <div>
              <label htmlFor="harvest_period" className="block text-sm font-medium text-slate-700 mb-2">Harvest Period</label>
              <input type="text" id="harvest_period" name="harvest_period" defaultValue={bean.harvest_period || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. August - September 2026" />
            </div>

            <div>
              <label htmlFor="sensory_notes" className="block text-sm font-medium text-slate-700 mb-2">Sensory Notes / Tasting Notes</label>
              <input type="text" id="sensory_notes" name="sensory_notes" defaultValue={bean.sensory_notes || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Strawberry, Mango, Grapes, Sweet Aromatics" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="cup_character" className="block text-sm font-medium text-slate-700 mb-2">Cup Character</label>
              <input type="text" id="cup_character" name="cup_character" defaultValue={bean.cup_character || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Juicy • Exotic • Candy-like • Long Sweet Finish" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="story" className="block text-sm font-medium text-slate-700 mb-2">Story / Description</label>
              <textarea id="story" name="story" rows={4} defaultValue={bean.story || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="Explain the coffee origin story..."></textarea>
            </div>

            {/* Commercial Information */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-2">Commercial Information</h3>
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
              <input type="text" id="availability" name="availability" defaultValue={bean.availability || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. 1000 kg" />
            </div>

            <div>
              <label htmlFor="min_order_qty" className="block text-sm font-medium text-slate-700 mb-2">Minimum Order Quantity</label>
              <input type="text" id="min_order_qty" name="min_order_qty" defaultValue={bean.min_order_qty || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. 5 kg" />
            </div>

            <div>
              <label htmlFor="packaging" className="block text-sm font-medium text-slate-700 mb-2">Packaging</label>
              <input type="text" id="packaging" name="packaging" defaultValue={bean.packaging || ''} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. GrainPro" />
            </div>

            {/* Images */}
            <div className="md:col-span-2 border-t border-slate-100 pt-6">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Product Images (Up to 4 URLs)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="image_url_1" className="block text-xs font-medium text-slate-500 mb-1.5">Cover Image (Image 1) *</label>
                  <input required type="url" id="image_url_1" name="image_url_1" defaultValue={img1} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="https://example.com/cover.jpg" />
                </div>
                <div>
                  <label htmlFor="image_url_2" className="block text-xs font-medium text-slate-500 mb-1.5">Image 2</label>
                  <input type="url" id="image_url_2" name="image_url_2" defaultValue={img2} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="https://example.com/detail2.jpg" />
                </div>
                <div>
                  <label htmlFor="image_url_3" className="block text-xs font-medium text-slate-500 mb-1.5">Image 3</label>
                  <input type="url" id="image_url_3" name="image_url_3" defaultValue={img3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="https://example.com/detail3.jpg" />
                </div>
                <div>
                  <label htmlFor="image_url_4" className="block text-xs font-medium text-slate-500 mb-1.5">Image 4</label>
                  <input type="url" id="image_url_4" name="image_url_4" defaultValue={img4} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="https://example.com/detail4.jpg" />
                </div>
              </div>

              {imageUrls.filter(url => url && url.trim() !== '').length > 0 && (
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <span className="block text-xs font-medium text-slate-500 mb-3">Current Image Previews</span>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {imageUrls.map((url, index) => url && url.trim() !== '' && (
                      <div key={index} className="flex-shrink-0 relative">
                        <img src={url} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-xl border border-slate-200 bg-slate-50" />
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                          #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
