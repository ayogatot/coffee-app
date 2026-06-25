'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

const FALLBACK_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useCart();

  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    whatsapp?: string;
  }>({});

  // Pricing calculations
  // Shipping and taxes will be calculated afterwards by the admin

  const validateForm = () => {
    const errors: typeof fieldErrors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!whatsapp.trim()) {
      errors.whatsapp = 'WhatsApp number is required';
    } else {
      // Basic check for numeric/whatsapp format (min 7 digits)
      const cleanPhone = whatsapp.replace(/\D/g, '');
      if (cleanPhone.length < 7) {
        errors.whatsapp = 'Please enter a valid phone number (minimum 7 digits)';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format beans JSON array with id, name, price, image_url, quantity
      const orderBeansJson = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        quantity: item.quantity
      }));

      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: fullName.trim(),
          whatsapp_number: whatsapp.trim(),
          email: email.trim() || null,
          beans: orderBeansJson,
          status: 'pending'
        })
        .select('id')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('No order confirmation data returned from server.');
      }

      // Order created successfully. Clear cart & redirect
      clearCart();
      router.push(`/checkout/success?orderId=${data.id}`);
    } catch (err: any) {
      console.error('Order creation failed:', err);
      setSubmitError(err.message || 'Something went wrong while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.emptyCheckout}>
          <h1 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Checkout</h1>
          <p className={`${styles.emptyText} body-md`}>
            Your cart is empty. You must add items to your cart before checking out.
          </p>
          <Link href="/shop" className={styles.shopLink}>
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className="display-lg" style={{ color: 'var(--color-primary)', marginBottom: '48px' }}>Checkout</h1>

      {submitError && (
        <div className={styles.errorBanner}>
          <p><strong>Error placing order:</strong> {submitError}</p>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className={styles.checkoutLayout}>
        {/* Left Column: Form */}
        <div className={styles.formSection}>
          <section className={styles.formGroup}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '-12px', marginBottom: '8px' }}>
              We will contact you via WhatsApp to coordinate payment and delivery details.
            </p>

            <div className={styles.inputWrapper}>
              <label htmlFor="fullName" className={styles.label}>Full Name</label>
              <input
                id="fullName"
                type="text"
                className={styles.input}
                placeholder="Julian Vane"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
              />
              {fieldErrors.fullName && (
                <span className={styles.errorText}>{fieldErrors.fullName}</span>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="whatsapp" className={styles.label}>WhatsApp Number</label>
              <input
                id="whatsapp"
                type="tel"
                className={styles.input}
                placeholder="+62 812 3456 7890"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={isSubmitting}
              />
              {fieldErrors.whatsapp && (
                <span className={styles.errorText}>{fieldErrors.whatsapp}</span>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="email" className={styles.label}>Email Address (Optional)</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="ritual@origin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className={styles.summarySidebar}>
          <h2 className={styles.sidebarTitle}>Order Summary</h2>
          
          <div className={styles.itemsPreviewList}>
            {cart.map((item) => {
              const displayPrice = `$${(item.price * item.quantity).toFixed(2)}`;
              const displaySubText = `${item.quantity} × $${item.price.toFixed(2)}`;
              
              return (
                <div key={item.id} className={styles.previewItem}>
                  <div className={styles.previewImageWrapper}>
                    <Image
                      src={item.image_url || FALLBACK_IMAGE}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className={styles.previewImage}
                    />
                  </div>
                  <div className={styles.previewMeta}>
                    <div>
                      <h4 className={styles.previewName}>{item.name}</h4>
                      <span className={styles.previewSub}>{displaySubText}</span>
                    </div>
                    <span className={styles.previewPrice}>{displayPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 500 }}>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span style={{ fontWeight: 500, color: 'var(--color-outline)' }}>Calculated later</span>
            </div>
            <div className={styles.grandTotalRow}>
              <span className={styles.totalLabel}>Estimated Total</span>
              <span style={{ fontSize: '24px', fontWeight: 600 }}>${cartSubtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className={styles.placeOrderBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
          
          <p className={styles.secureBadge}>
            Secure SSL Encrypted Checkout
          </p>
        </aside>
      </form>
    </main>
  );
}
