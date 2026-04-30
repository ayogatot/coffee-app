import Image from 'next/image';
import styles from './page.module.css';

export default function AboutUs() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6IzKL5bh2V96tJye7aW97L9e1enV6jpicpXYVW_nXgRJD4XVsqG80VPVz4zJyaRbYWspVKjxrqhD6-S7kCDVX8Py7CBESuyCkA8rlGt6riJk1iDzqE0jPvqJPnbEZ6YGGA1WZYOpT9iDxSBNpbUyIqwBO-yVdM0AfEMZcFeeEAX9S1a7kgdSGTCY21TMbVxVi71qE49ZOIxiGEW43_z1rQFKyntTaf9Oe9jp59kEfg1Wgt9g94kdmltOvccaJsxllT0bfwONGCNlE"
          alt="Artisan coffee roasting facility"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay}>
          <span className="label-caps" style={{ color: 'white', marginBottom: '24px', letterSpacing: '0.3em' }}>Est. 2014</span>
          <h1 className="display-lg" style={{ color: 'white', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '16px', maxWidth: '768px' }}>
            A sensory journey from earth to cup.
          </h1>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '576px' }}>
            Respecting the legacy of every bean through intentional roasting and transparent sourcing.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-stack-md)' }}>Our Mission</h2>
          <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6, marginBottom: 'var(--spacing-stack-md)' }}>
            At Wandhe Family Estate, we believe coffee is more than a morning utility; it is a moment of pause. Our mission is to elevate that daily ritual by bridging the gap between the remote high-altitude farms and your favorite ceramic mug. We curate each harvest with surgical precision to ensure the unique terroir of the region is preserved and celebrated.
          </p>
          <div className={styles.divider}></div>
        </div>
      </section>

      {/* Sourcing & Process: Bento Layout */}
      <section className={styles.bentoSection}>
        <div className={styles.bentoGrid}>
          {/* Sourcing Philosophy */}
          <div className={`${styles.bentoBox} ${styles.colSpan7}`}>
            <span className="label-caps" style={{ color: 'var(--color-primary-container)', marginBottom: '16px' }}>THE ETHOS</span>
            <h2 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Sourcing Philosophy</h2>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              We don't just buy beans; we invest in relationships. By practicing direct trade, we ensure our farmers receive premiums well above market rates. This transparency allows us to track every cherry back to its specific hillside, ensuring ecological health and social equity.
            </p>
            <ul className={styles.iconList}>
              <li>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>eco</span>
                Regenerative Agricultural Practices
              </li>
              <li>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>handshake</span>
                100% Direct Trade Transparency
              </li>
            </ul>
          </div>
          
          <div className={`${styles.bentoImage} ${styles.colSpan5}`}>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQKKtzKdnoNRepadZPM6_C56o0ugcQSTQwJsaH9nPuGGaunlPfaReZwo8120c6gP9Z6dhKupOwN3UU_O90-UNALmx3LgP5HHQrOH-o2KWiALfZW78YE-W1wojWsENeSb-zwLHnYr9ufDrCU8SpCRAqX3eYP68doN3OFVLlhHWtNncm-m9ZMdsPQmOn3ke-MK8AEJfUqG3aoTIyfmSZjg7iANAfLPRXFwEysviUs8mVnzRZRmahRz98c2NosF6I81RHrS0-Q7FmaBQD"
              alt="Coffee farm hands"
              fill
              className={styles.imageHover}
              style={{ filter: 'grayscale(100%)', transition: 'filter 0.7s' }}
            />
          </div>

          {/* Our Process */}
          <div className={`${styles.bentoImage} ${styles.colSpan4}`}>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUEfUMvMM-lHi7UV-AlYzvstaNbkWu_1BnQkc1D7R_7_TCKul-u0VVwatz-mZ5hH6wX55HskduEL7xEFnJSkuWzWkzWN6h_mQeNbiz2Cu-PQekr9gorKpiOCZbgypuCDVweBRKrRCoXgERuCc1JKGSDM51TisIeVtP1IbL2tTKNRmYX8XJE5cL3kbwlmMKHyHhwx7v4lL2iAbNunpx_lY2SqGcOwuOqzPYSq2OyR1tB-CWFhTtNoTsHNjkDeDMKGYhHJCFQuP2-bcG"
              alt="Coffee cupping session"
              fill
              className={styles.image}
            />
          </div>

          <div className={`${styles.bentoBox} ${styles.colSpan8}`}>
            <span className="label-caps" style={{ color: 'var(--color-primary-container)', marginBottom: '16px' }}>THE CRAFT</span>
            <h2 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Our Process</h2>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              Roasting is an art of thermodynamics and intuition. We roast in small batches, monitoring the temperature curves to unlock specific flavor profiles—from the bright, citric acidity of an Ethiopian heirloom to the deep, cocoa-heavy notes of a Brazilian natural process. Each profile is cupped multiple times before it reaches your door.
            </p>
            <div className={styles.processGrid}>
              <div>
                <h4 className="label-caps" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Analysis</h4>
                <p className={styles.subtext}>Moisture content and density testing for every batch.</p>
              </div>
              <div>
                <h4 className="label-caps" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Roasting</h4>
                <p className={styles.subtext}>Precision-controlled Loring roasters for cleaner flavor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className={styles.pillarsSection}>
        <div className={styles.pillarsHeader}>
          <h2 className="headline-lg" style={{ color: 'var(--color-primary)' }}>Two Pillars of Ritual</h2>
        </div>
        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarImageContainer}>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdwnjjTgieMFTbXCl8ys0d2SyLn-YR5M5FkiCYndqGH93B6qo3Ilydgr3kH16CTwdpuKxW77_jnH5imrLI_1NPLlz4laAcwtx6iftsqqXOT0AV02j2u0lYblc7x9T0wHsLVxMUNniAQpl0LHT1ydEtjAaCsNWZhlddGJ0B_uRgHCUqt7Zfw1bzvwJ-AhedFbKY8E51ZivLsa4kb21O8N9yiruldlvout70p6qv9P3jgaqbDflEl2T2JQpguEnuOEUTc0ZPMO8pQg4"
                alt="Green unroasted beans"
                fill
                className={styles.imageHover}
              />
            </div>
            <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>The Green Series</h3>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              Raw, unroasted beans for home roasting enthusiasts and wholesalers. Sourced for seasonal peak freshness.
            </p>
            <button className={`${styles.btn} ${styles.btnOutline}`}>Explore Green</button>
          </div>
          <div className={styles.pillarCard}>
            <div className={styles.pillarImageContainer}>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwH_q2ukxhqGY4leTaONZ6nIxUqYwM39UvVeS5_Zq8cWXTvF20rKitrn6P10a8bGKJu3DQEIMjlz0KxSS093IY7zYOHE7_rtWUOifI8DoZgZGfjC8XTIe-Kxw1je1QE_YTk2dNj24atO0S_BJ3J9ZtJIeUS8czdmlg39oZhQolgjHwzbu3zX7DOAHIa0UxASGWHjs7YY-erTtriO3pOo2oDTmW1P-G0UEN0ejvesW6tPDS3RWaxd4tocwLOaST7LB6v1JxrXvgYtyp"
                alt="Freshly roasted coffee beans"
                fill
                className={styles.imageHover}
              />
            </div>
            <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>The Roasted Ritual</h3>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              Our signature roasts, delivered within 48 hours of the cooling tray. Available in Light, Medium, and Bold profiles.
            </p>
            <button className={`${styles.btn} ${styles.btnSolid}`}>Shop Roasted</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <span className="label-caps" style={{ display: 'block', opacity: 0.8, marginBottom: '16px', letterSpacing: '0.2em' }}>Join the Journal</span>
          <h2 className="display-lg" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '32px', maxWidth: '672px', marginInline: 'auto' }}>
            Monthly insights into origin stories and brewing techniques.
          </h2>
          <div className={styles.formGroup}>
            <input type="email" placeholder="Email Address" className={styles.input} />
            <button className={styles.submitButton}>Subscribe</button>
          </div>
        </div>
        <div className={styles.newsletterPattern}></div>
      </section>
    </main>
  );
}
