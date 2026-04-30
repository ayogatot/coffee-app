import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhpv69q2c7PHmRjp6p04EsJXrFiCoAOxsA3JjzCgjEn1Pk3DSPFvjoCd-dpLXaNUkcAiwzqIswfiWff1HXa2GsQ4sPPfrOsAX6z5zlta5S8E6ckRe1xHSyp1WLpagijKqz4izTNlnerFtu9E663VZAGIz0_tYOzT1VHzffG2xK--mFNT666d-ECtx24xKMkLajShxx9Mj5NyvnyZQDdRg38yyGpZsQGJLzHkmrbZQwDSzFtp9p9wirCSwo-8qzrqFfyz9AvxNLY3--"
            alt="Sunlight filtering through coffee tree leaves"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroPretitle}>Rooted in Tradition</p>
          <h1 className={styles.heroTitle}>Discover Exceptional Coffee</h1>
          <button className={styles.primaryButton}>EXPLORE THE COLLECTION</button>
        </div>
      </section>

      {/* Introduction */}
      <section className={styles.introSection}>
        <h2 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-stack-md)' }}>
          The Ritual of Origin
        </h2>
        <p className="body-lg" style={{ color: 'var(--color-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', lineHeight: 1.6 }}>
          We believe that great coffee is more than just a drink; it's a connection to the earth and the hands that harvest it. Origin Ritual sources directly from micro-lots, ensuring that every bean—whether raw or roasted—carries the unique character of its soil and altitude.
        </p>
        <div className={styles.divider}></div>
      </section>

      {/* Product Categories */}
      <section className={styles.gridSection}>
        <div className={styles.categoryCard}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0mTkVmlql-5-xzlB7TVJT17Pl6y9Y36VadAYUl1msqKeVxISjOWCsFYGJikkt9q9dUd-jbrlLLJc0fnvAvz63w3n5UnFi-BzyR6qsQeuBR6I-0rMD_gtACHnhcVrdr1EGY7XhSFPOFQPTXJFNCTMRkUKElcHTZrB1tF3BgaIji1p6mRYUCGPWRIt_ER0mban9El9K22cIP0RML_p2v7C9j4U8Nx1EcG4JDup9vbKhRz-KePaMe1QZUS_XYcljOjr6AgwdfiqToe8u"
            alt="Green Bean"
            fill
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay}>
            <h3 className="headline-lg" style={{ color: 'white', marginBottom: '16px' }}>Green Bean</h3>
            <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '320px' }}>
              For the home roaster seeking the purest expression of origin and variety.
            </p>
            <Link href="/shop" className={styles.cardLink}>
              SHOP NOW <span className="material-symbols-outlined" style={{ marginLeft: '8px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className={styles.categoryCard}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVtXID5fn1cShzQzl_i4bCbZQ0fNmiHFkWt7vlgFeRYwAsMrdBLUESJfrfHJAeG4ht_RnMXOwv5QQ3ylgaUttrHeUuI1dFs15w6SgTgxWAEqdSIYEoqWegvHTq3HxArB2UfhbAnLxMxYBvy6l2trCbkm0CwWRvRJyZ1TZOhYY40zfuWMl0UAPB0ocvTvxbwEpR0OxmCXhghFH5YoQRwnnyupSgZzzmVMKWsCi_WXQ4QtpoBCEg1iiSxtkS-QAD_Z66LqbRPwOkOU9x"
            alt="Roasted Bean"
            fill
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay}>
            <h3 className="headline-lg" style={{ color: 'white', marginBottom: '16px' }}>Roasted Bean</h3>
            <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '320px' }}>
              Expertly roasted in small batches to highlight intrinsic flavor profiles.
            </p>
            <Link href="/shop" className={styles.cardLink}>
              SHOP NOW <span className="material-symbols-outlined" style={{ marginLeft: '8px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className={styles.gridSection}>
        <div className={styles.categoryCard}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVenja5SsAmlumdWQL0bYukDU_thB-3DrAr5NSHE0_EOKo_5tY5lag7JKgkQ8SYJzLnuihn0l7DRaUz6Ap8YOvncxOBGi0DTHfVjYnOkkQb969pQuQbwEDDRYVUr9IPHV0Ck7nSuDA4pvv9-g7zEilaGso5jqJixd8ZKyeG1ORLJl6ERt0Vytlk5McBA9hgZqR6WmF4C2m0VgwEB6FpYppQ-oe_y7hD6JgERm0TzPPUiHvUBiBeVGUddpc65ZG7ECOF9poK0ehP0Iu"
            alt="Telusur Rasa"
            fill
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay}>
            <h3 className="headline-lg" style={{ color: 'white', marginBottom: '16px' }}>Telusur Rasa</h3>
            <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '320px' }}>
              An evocative journey into the aromatic profiles and unique terroir of our finest beans.
            </p>
            <Link href="/events" className={styles.cardLink}>
              EXPLORE <span className="material-symbols-outlined" style={{ marginLeft: '8px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className={styles.categoryCard}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYWawYRXmjc2chszQVHMUkfI_r--M1UTPWi5jMslaSb0G3kOxr1GcSttHhDDuLvbiUSSpGHK3hL0g_ubn5bieLzGIDxtzMSgAHziYMeiAgfFoOTReCxpwSJy2bVRygeIT-oJaKa2uzvtudNYhG318xUwK3HtZPPOtHjMDSW0yzoVjQZykV5KrhEQunHrr_J9-U5uNEEEoPR4_1EK3-mVSi8bVG8iKawx4WivcZeV8w1UcNGh-pyHiKfy_9zYDdBEuW9tfDYyizW_kF"
            alt="Kelas Kopi"
            fill
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay}>
            <h3 className="headline-lg" style={{ color: 'white', marginBottom: '16px' }}>Kelas Kopi</h3>
            <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '320px' }}>
              Immersive educational workshops for those wishing to master the art of the perfect brew.
            </p>
            <Link href="/events" className={styles.cardLink}>
              EXPLORE <span className="material-symbols-outlined" style={{ marginLeft: '8px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}>
          <div className={styles.eventsHeader}>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '8px' }}>EDUCATION & COMMUNITY</p>
              <h2 className="display-lg" style={{ color: 'var(--color-primary)' }}>Upcoming Events</h2>
            </div>
            <p className="body-md" style={{ color: 'var(--color-on-secondary-container)', maxWidth: '400px' }}>
              Join us at our headquarters for immersive workshops designed for all skill levels.
            </p>
          </div>
          <div className={styles.eventsGrid}>
            <div className={styles.eventCard}>
              <div className={styles.eventImageContainer}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr9t2gRceN5uPR6tP3i0RCHRe91QforTk68q04Mejj7AaJ5ErxIj9iEY5gwEEHPzY3DNzUPgRz_c9M0mrpc7yOnuW9V_lNPDo16UKHNTKXzixqVP66ixxoQ6-GOnXuHjsloyJdHN627YYp8VOAtqFPGreDlslqF_AgQLuTK842Rei4ms3MsXXripWZrZGqJO9zcu-IY1o0u2O_sj0d9TTUhYsSUxj-LkjCngeIrdHEW0LahKIP8OmPfaRRmfFb9JJ1N2mL1OxPUzHM"
                  alt="Roasting Masterclass"
                  fill
                  className={styles.eventImage}
                />
              </div>
              <div className={styles.eventContent}>
                <div className={styles.eventMeta}>
                  <span className={styles.eventDate}>OCT 24, 2024</span>
                  <span className="label-caps" style={{ color: 'var(--color-secondary)' }}>$75.00</span>
                </div>
                <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Roasting Masterclass</h3>
                <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '32px' }}>
                  Learn the science of the Maillard reaction and how to profile single-origin beans for different brew methods.
                </p>
                <button className={styles.eventButton}>RESERVE A SEAT</button>
              </div>
            </div>
            <div className={styles.eventCard}>
              <div className={styles.eventImageContainer}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA07MboBSOdyfJF2dX0UwXQrhW8qBiqJGOCo6babRdvNvUaxSAMwlzx6-_Mp2970HakbDTpFtMFuwn8dO8tredqYVPYzP0Jt5ss8ynvTo2ny9LUuwNdgVY--rfzdSXZdvyL4kxoBj_AoYq1wj2FMyf1iimTPfUz8NyVopD1RstWKUMRzaLXhT2b_PvuFCFktV4b2d8bYud8LmlLtrjSUqNIucJyqdVIuWMlFIfTeh7OCHSz9d1o1nS5m2qLkMpyq7adSMEMa2nC8s1w"
                  alt="Green Bean Workshop"
                  fill
                  className={styles.eventImage}
                />
              </div>
              <div className={styles.eventContent}>
                <div className={styles.eventMeta}>
                  <span className={styles.eventDate}>NOV 12, 2024</span>
                  <span className="label-caps" style={{ color: 'var(--color-secondary)' }}>$45.00</span>
                </div>
                <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Green Bean Workshop</h3>
                <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '32px' }}>
                  An introduction to coffee grading, defect identification, and understanding farm-level processing techniques.
                </p>
                <button className={styles.eventButton}>RESERVE A SEAT</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
