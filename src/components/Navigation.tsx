import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
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
          {/* <div className={styles.search}>
            <span className="material-symbols-outlined">search</span>
          </div> */}
          <div className={styles.actions}>
            {/* <button className={styles.iconButton}>
              <span className="material-symbols-outlined">person</span>
            </button> */}
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
