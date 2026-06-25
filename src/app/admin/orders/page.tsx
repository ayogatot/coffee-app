import { supabase } from '@/lib/supabase';
import { Trash2, CheckCircle, Clock } from 'lucide-react';
import { deleteOrder, updateOrderStatus, updateOrderShippingDetails } from '@/app/actions/admin';

export default async function OrdersPage() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Failed to load orders: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Orders</h2>
        <p className="text-slate-500 text-sm mt-1">Manage incoming orders. All communication is handled manually via WhatsApp or Email.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders?.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-500">No orders found.</p>
          </div>
        ) : (
          orders?.map((order) => {
            let beans = [];
            try {
              beans = typeof order.beans === 'string' ? JSON.parse(order.beans) : order.beans;
            } catch (e) {
              beans = [];
            }

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{order.customer_name}</h3>
                      <div className="text-sm text-slate-500 flex items-center gap-4 mt-1">
                        <span>WA: {order.whatsapp_number}</span>
                        {order.email && <span>Email: {order.email}</span>}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status === 'in_progress' ? 'in progress' : order.status}
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Order Details</h4>
                    <div className="divide-y divide-slate-100">
                      {Array.isArray(beans) && beans.map((item: any, index: number) => {
                        const itemPrice = typeof item.price === 'number' ? item.price : 0;
                        const itemTotal = itemPrice * item.quantity;
                        const coverImg = item.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk';
                        
                        return (
                          <div key={index} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-12 relative rounded-md overflow-hidden bg-slate-200 flex-shrink-0">
                                <img
                                  src={coverImg}
                                  alt={item.name || 'Bean'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                <p className="text-xs text-slate-500">{item.quantity} × ${itemPrice.toFixed(2)}</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                              ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                      {(!Array.isArray(beans) || beans.length === 0) && (
                        <div className="text-sm text-slate-500 italic py-2">No beans specified</div>
                      )}
                    </div>
                    {Array.isArray(beans) && beans.length > 0 && (() => {
                      const subtotal = beans.reduce((acc: number, item: any) => acc + (typeof item.price === 'number' ? item.price : 0) * item.quantity, 0);
                      const shipping = order.shipping_cost !== null ? Number(order.shipping_cost) : 0;
                      return (
                        <div className="pt-3 border-t border-slate-200 space-y-2">
                          <div className="flex justify-between items-baseline text-xs text-slate-500 font-medium">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          {order.shipping_cost !== null && (
                            <div className="flex justify-between items-baseline text-xs text-slate-500 font-medium">
                              <span>Shipping Cost</span>
                              <span>${shipping.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-baseline border-t border-dashed border-slate-200 pt-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Total</span>
                            <span className="text-base font-bold text-slate-800">
                              ${(subtotal + shipping).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Shipping Details Form */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shipping Details</h4>
                    
                    {order.shipping_address || order.total_weight || order.tracking_number || order.shipping_cost !== null ? (
                      <div className="text-sm space-y-1 text-slate-700">
                        <p><strong>Address:</strong> {order.shipping_address || <span className="text-slate-400 italic">None</span>}</p>
                        <p><strong>Total Weight:</strong> {order.total_weight !== null ? `${order.total_weight} kg` : <span className="text-slate-400 italic">None</span>}</p>
                        <p><strong>Air Waybill (AWB):</strong> {order.tracking_number || <span className="text-slate-400 italic">None</span>}</p>
                        <p><strong>Shipping Cost:</strong> {order.shipping_cost !== null ? `$${Number(order.shipping_cost).toFixed(2)}` : <span className="text-slate-400 italic">None</span>}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic">No shipping details added yet.</p>
                    )}

                    <details
                      key={`${order.id}-${order.shipping_address || ''}-${order.total_weight || ''}-${order.tracking_number || ''}-${order.shipping_cost || ''}`}
                      className="text-xs group mt-2"
                    >
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold select-none">
                        {order.shipping_address || order.total_weight || order.tracking_number || order.shipping_cost !== null ? 'Edit Shipping Info' : 'Add Shipping Info'}
                      </summary>
                      <form action={async (formData: FormData) => {
                        'use server';
                        const address = formData.get('shipping_address') as string;
                        const weightStr = formData.get('total_weight') as string;
                        const resi = formData.get('tracking_number') as string;
                        const costStr = formData.get('shipping_cost') as string;
                        
                        await updateOrderShippingDetails(
                          order.id,
                          address || null,
                          weightStr ? parseFloat(weightStr) : null,
                          resi || null,
                          costStr ? parseFloat(costStr) : null
                        );
                      }} className="mt-3 space-y-3 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Shipping Address</label>
                          <textarea
                            name="shipping_address"
                            defaultValue={order.shipping_address || ''}
                            className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-slate-400"
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase">Weight (kg)</label>
                            <input
                              type="number"
                              step="0.01"
                              name="total_weight"
                              defaultValue={order.total_weight || ''}
                              className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-slate-400"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase">Air Waybill (AWB)</label>
                            <input
                              type="text"
                              name="tracking_number"
                              defaultValue={order.tracking_number || ''}
                              className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-slate-400"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase">Shipping Cost ($)</label>
                            <input
                              type="number"
                              step="0.01"
                              name="shipping_cost"
                              defaultValue={order.shipping_cost || ''}
                              className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-slate-400"
                            />
                          </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-xl transition-colors text-xs border border-blue-100">
                          Save Shipping Details
                        </button>
                      </form>
                    </details>
                  </div>

                  <div className="text-xs text-slate-400">
                    Ordered on: {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  {order.status !== 'completed' && (
                    <form action={async () => {
                      'use server';
                      await updateOrderStatus(order.id, 'completed');
                    }}>
                      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Mark Completed
                      </button>
                    </form>
                  )}
                  {order.status === 'completed' && (
                    <form action={async () => {
                      'use server';
                      await updateOrderStatus(order.id, 'pending');
                    }}>
                      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm">
                        <Clock className="w-4 h-4" />
                        Mark Pending
                      </button>
                    </form>
                  )}
                  
                  <form action={async () => {
                    'use server';
                    await deleteOrder(order.id);
                  }}>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
