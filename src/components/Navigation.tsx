"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <button 
            className={styles.hamburgerButton} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <Link href="/" className={styles.logo}>
            Wandhe Family Estate
          </Link>
          <div className={styles.links}>
            <Link href="/shop" className={styles.link}>Shop</Link>
            <Link href="/events" className={styles.link}>Events</Link>
            <Link href="/about-us" className={styles.link}>Our Story</Link>
          </div>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.actions}>
            <Link href="/cart" className={`${styles.iconButton} ${styles.cartContainer}`} aria-label="View shopping bag">
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            <Link href="/shop" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="/events" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link href="/about-us" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
