import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './success.module.css';

interface BeanItem {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId;

  let orderData = null;
  let errorMsg = null;

  if (orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order for success page:', error);
      errorMsg = error.message;
    } else {
      orderData = data;
    }
  }

  // Calculate pricing based on order items
  let subtotal = 0;
  let itemsList: BeanItem[] = [];

  if (orderData && orderData.beans) {
    try {
      if (Array.isArray(orderData.beans)) {
        itemsList = orderData.beans as unknown as BeanItem[];
      } else if (typeof orderData.beans === 'string') {
        itemsList = JSON.parse(orderData.beans) as BeanItem[];
      }
      subtotal = itemsList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    } catch (e) {
      console.error('Error parsing order beans:', e);
    }
  }

  // Pricing calculations
  const shippingCost = orderData?.shipping_cost !== null && orderData?.shipping_cost !== undefined
    ? Number(orderData.shipping_cost)
    : null;
  const totalCost = subtotal + (shippingCost || 0);

  const displayDate = orderData?.created_at
    ? new Date(orderData.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <main className={styles.main}>
      <span className={`material-symbols-outlined ${styles.successIcon}`}>
        check_circle
      </span>

      <h1 className={`${styles.title} display-lg`}>Order Confirmed</h1>
      <p className={`${styles.message} body-lg`}>
        Thank you for starting your ritual. We have received your order details.
        We will contact you shortly on WhatsApp to coordinate payment and delivery.
      </p>

      {orderData ? (
        <div className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span className={styles.orderId}>Order ID: #{orderData.id.slice(0, 8)}</span>
            <span className={styles.date}>{displayDate}</span>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Customer Details</h4>
            <div className={styles.customerInfo}>
              <p><strong>Name:</strong> {orderData.customer_name}</p>
              <p><strong>WhatsApp:</strong> {orderData.whatsapp_number}</p>
              {orderData.email && <p><strong>Email:</strong> {orderData.email}</p>}
            </div>
          </div>

          {orderData.shipping_address && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Shipping Details</h4>
              <div className={styles.customerInfo}>
                <p><strong>Address:</strong> {orderData.shipping_address}</p>
                {orderData.total_weight && <p><strong>Total Weight:</strong> {orderData.total_weight} kg</p>}
                {orderData.tracking_number && <p><strong>Air Waybill (AWB):</strong> {orderData.tracking_number}</p>}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Ritual Selection</h4>
            <div className={styles.itemsList}>
              {itemsList.map((item, idx) => (
                <div key={item.id || idx} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              {shippingCost !== null ? (
                <span>${shippingCost.toFixed(2)}</span>
              ) : (
                <span style={{ color: 'var(--color-outline)' }}>Calculated later</span>
              )}
            </div>
            <div className={styles.grandTotalRow}>
              <span className={styles.totalLabel}>
                {shippingCost !== null ? 'Total' : 'Estimated Total'}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600 }}>${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.orderCard} style={{ textAlign: 'center', padding: '48px' }}>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
            {errorMsg ? 'Unable to load order details.' : 'Order details will be sent via WhatsApp/Email shortly.'}
          </p>
        </div>
      )}

      <Link href="/shop" className={`${styles.homeBtn} label-caps`}>
        Back to Shop
      </Link>
    </main>
  );
}
