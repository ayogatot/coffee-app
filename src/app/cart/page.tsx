'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

const FALLBACK_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
  } = useCart();

  // Pricing calculations
  const displaySubtotal = `$${cartSubtotal.toFixed(2)}`;

  if (cart.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.emptyState}>
          <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
            shopping_bag
          </span>
          <h1 className="headline-lg" style={{ color: 'var(--color-primary)' }}>Your Cart</h1>
          <p className={`${styles.emptyText} body-md`}>
            You have no items in your selection. Start adding fresh origin beans to begin your ritual.
          </p>
          <Link href="/shop" className={`${styles.browseBtn} label-caps`}>
            Browse Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {/* Title */}
      <header className={styles.header}>
        <h1 className="headline-lg" style={{ color: 'var(--color-primary)' }}>Your Cart</h1>
        <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '8px' }}>
          You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your ritual selection.
        </p>
      </header>

      {/* Cart Columns */}
      <div className={styles.cartLayout}>
        {/* Items List */}
        <div className={styles.itemsList}>
          {cart.map((item) => {
            const displayItemTotal = `$${(item.price * item.quantity).toFixed(2)}`;
            const itemImage = item.image_url || FALLBACK_IMAGE;
            const displayTag = item.category === 'Green Bean' ? 'Raw' : item.roast_level || 'Roasted';

            return (
              <div key={item.id} className={styles.cartItem}>
                {/* Details */}
                <div className={styles.itemDetails}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={itemImage}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className={styles.itemImage}
                    />
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={styles.categoryTag}>{item.category}</span>
                    <h3 className={styles.itemName}>
                      <Link href={`/shop/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.name}
                      </Link>
                    </h3>
                    <p className={styles.itemRoast}>{displayTag}</p>
                  </div>
                </div>

                {/* Actions & Price */}
                <div className={styles.itemActions}>
                  <div className={styles.quantitySelector}>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
                    </button>
                    <span className={`${styles.quantityVal} body-md`}>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                    </button>
                  </div>
                  <div className={styles.priceCol}>
                    {displayItemTotal}
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Summary */}
        <aside className={styles.summarySidebar}>
          <h2 className={styles.summaryTitle}>Summary</h2>
          <div className={styles.summaryRows}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>Subtotal</span>
              <span style={{ fontWeight: 500 }}>{displaySubtotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>Shipping</span>
              <span style={{ fontWeight: 500, color: 'var(--color-outline)' }}>Calculated later</span>
            </div>
          </div>

          <div className={styles.summaryTotalRow}>
            <span className={styles.totalLabel}>Estimated Total</span>
            <span className={styles.totalPrice}>{displaySubtotal}</span>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>

          <div className={styles.infoBox}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`}>info</span>
            <p className={styles.infoText}>
              Order details will be sent to the admin. Shipping details will be coordinated afterwards.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
