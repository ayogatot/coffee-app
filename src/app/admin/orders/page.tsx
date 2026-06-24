import { supabase } from '@/lib/supabase';
import { Trash2, CheckCircle, Clock } from 'lucide-react';
import { deleteOrder, updateOrderStatus } from '@/app/actions/admin';

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
                      order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Order Details</h4>
                    <ul className="space-y-2">
                      {Array.isArray(beans) && beans.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span className="font-medium text-slate-700">{item.bean_name || item.name}</span>
                          <span className="text-slate-500">x{item.quantity}</span>
                        </li>
                      ))}
                      {(!Array.isArray(beans) || beans.length === 0) && (
                        <li className="text-sm text-slate-500 italic">No beans specified</li>
                      )}
                    </ul>
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
