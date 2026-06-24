"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <span className={styles.logo}>Wandhe Family Estate</span>
          <p className={styles.copyright}>© 2024 Wandhe Family Estate. All rights reserved.</p>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.links}>
            <Link href="#" className={styles.link}>Instagram</Link>
            <Link href="#" className={styles.link}>Email</Link>
            <Link href="#" className={styles.link}>Whatsapp</Link>
          </div>
          <div className={styles.social}>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">social_leaderboard</span>
            </button>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">camera</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
