import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { deleteCoffeeBean } from '@/app/actions/admin';

export default async function CoffeeBeansPage() {
  const { data: beans, error } = await supabase
    .from('coffee_beans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Failed to load coffee beans: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Coffee Beans</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your store's coffee beans catalog</p>
        </div>
        <Link
          href="/admin/coffee-beans/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white hover:text-on-primary-container px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Bean
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Roast Level</th>
                <th className="px-6 py-4 font-semibold">Origin</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {beans?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No coffee beans found. Add your first one!
                  </td>
                </tr>
              ) : (
                beans?.map((bean) => {
                  let coverImage = null;
                  try {
                    if (Array.isArray(bean.image_url)) {
                      coverImage = bean.image_url[0] || null;
                    } else if (typeof bean.image_url === 'string') {
                      if (bean.image_url.trim().startsWith('[')) {
                        const parsed = JSON.parse(bean.image_url);
                        coverImage = parsed[0] || null;
                      } else {
                        coverImage = bean.image_url || null;
                      }
                    }
                  } catch (e) {
                    coverImage = bean.image_url || null;
                  }

                  return (
                    <tr key={bean.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        {coverImage ? (
                          <img src={coverImage} alt={bean.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                            <span className="text-xs">No img</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">{bean.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {bean.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{bean.roast_level || '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{bean.origin || '-'}</td>
                      <td className="px-6 py-4">${Number(bean.price).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${bean.stock > 10 ? 'bg-green-100 text-green-700' : bean.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {bean.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/admin/coffee-beans/${bean.id}`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <form action={async () => {
                            'use server';
                            await deleteCoffeeBean(bean.id);
                          }}>
                            <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
