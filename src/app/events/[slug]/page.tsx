import Image from "next/image";
import styles from "./page.module.css";

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <img
          alt="Coffee Roasting Masterclass"
          className={styles.heroImage}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwod3nZ4gS-izbpisFyBhDeMbmj_KOMYh0WrFUFGPYg8atDZeymKOuHruigJ4zvAA7O3Ne3fxuTwOgyrSHYMFzflTdjvJqs7BikvsLn_v2GMXRd1H8RLnqfjCa8dqtoyDZZWG0WXpntwcZKMWxJQGFcbHh5HZaj3_MBbPk0rtrZQhMpALLMRKi-P24u4zi8ebtoCQ-AMoXAiHVVFimqwa7aNGyvXGXfjDI9FQNDizcV2PudAvbupXthJ8cAnQ62JTExMj3qA82D3ry"
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <span className="label-caps" style={{ color: 'white', marginBottom: '16px', display: 'block' }}>LIMITED WORKSHOP</span>
            <h1 className="display-lg" style={{ color: 'white' }}>Roasting Masterclass: The Alchemy of Bean to Cup</h1>
          </div>
        </div>
      </section>

      {/* Event Quick Info */}
      <section className={styles.quickInfo}>
        <div className={styles.quickInfoContainer}>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>calendar_today</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>DATE</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>October 24, 2024</p>
            </div>
          </div>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>schedule</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>TIME</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>10:00 AM — 4:00 PM</p>
            </div>
          </div>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>location_on</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>LOCATION</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>Origin Roastery, Seattle</p>
            </div>
          </div>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>confirmation_number</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>CAPACITY</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>12 Seats Remaining</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Sidebar Layout */}
      <section className={styles.layout}>
        {/* Main Column */}
        <div className={styles.mainColumn}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="headline-lg" style={{ color: 'var(--color-primary)' }}>About the Masterclass</h2>
            <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
              Step behind the scenes of our flagship roastery for an immersive, full-day experience dedicated to the craft of coffee roasting. This masterclass is designed for enthusiasts and aspiring professionals who want to understand the complex chemical and physical transformations that occur within the drum.
            </p>
            <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
              Led by our Head Roaster, you will explore the variables of heat, airflow, and time. You&apos;ll move beyond the basics of &quot;light&quot; vs &quot;dark&quot; to discover how to highlight specific terroir notes through precise profile adjustments.
            </p>
          </div>

          <div className={styles.grid2Col}>
            <div className={styles.card}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', marginBottom: '16px', fontSize: '32px' }}>science</span>
              <h3 className="headline-md" style={{ marginBottom: '12px' }}>Green Grading</h3>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Learn to evaluate raw beans for moisture content, density, and defect counts before they ever touch the heat.</p>
            </div>
            <div className={styles.card}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', marginBottom: '16px', fontSize: '32px' }}>thermostat</span>
              <h3 className="headline-md" style={{ marginBottom: '12px' }}>Profile Development</h3>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Master the roasting curve. Understand the drying phase, Maillard reaction, and the critical first crack.</p>
            </div>
            <div className={styles.card}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', marginBottom: '16px', fontSize: '32px' }}>coffee_maker</span>
              <h3 className="headline-md" style={{ marginBottom: '12px' }}>Production Roasting</h3>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Get hands-on experience with our 12kg Loring roaster, applying theory to a live production environment.</p>
            </div>
            <div className={styles.card}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', marginBottom: '16px', fontSize: '32px' }}>psychology</span>
              <h3 className="headline-md" style={{ marginBottom: '12px' }}>Sensory Analysis</h3>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Cup your own roasts alongside our quality control team to identify strengths and areas for improvement.</p>
            </div>
          </div>

          <div style={{ paddingTop: '32px' }}>
            <img
              alt="Coffee cupping session"
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '4px' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChHeiXlKnPf8x9yFPBgMtSBpc2YNzUCV2EQyX1uWLUGim-aFCy1BSS3_55m8EWzUTxAhN4ZCf1qk2LUJ3Oj5ONUFIekaCbWUoIoTHsjHXr5QROV8KjeG1gWX_P1IC9zYgJDXAwxWjgWi5kNxIYMTgEP6-eNp55mHzU6LsXEpBLCpi0L-TblOMN1na1RoF875ZGDioydBjwAypP-xYkAPwU-RweMT-s214PrbnXj7WnDS5HdnrUjGnhPfDOb3-PgX22BYIFlvr7fzdy"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.stickySidebar}>
            {/* Reservation Card */}
            <div className={styles.reservationCard}>
              <div style={{ marginBottom: '24px' }}>
                <span className="label-caps" style={{ color: 'var(--color-secondary)', display: 'block' }}>PRICE PER SEAT</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '4px' }}>
                  <span className="headline-lg" style={{ color: 'var(--color-primary)' }}>$350</span>
                  <span className="body-md" style={{ color: 'var(--color-secondary)' }}>USD</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                  <span className="body-md">Full day hands-on training</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                  <span className="body-md">1kg of your custom roast</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                  <span className="body-md">Masterclass guidebook</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                  <span className="body-md">Artisan lunch provided</span>
                </div>
              </div>

              <button className={`${styles.buttonPrimary} label-caps`}>
                Reserve a Seat
              </button>
              <p className="body-md" style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-secondary)', marginTop: '16px' }}>Fully refundable up to 72 hours before event.</p>
            </div>

            {/* Host Info */}
            <div className={styles.hostCard}>
              <h4 className="label-caps" style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>YOUR HOST</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <img
                  alt="Elias Thorne"
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCols1Ada3BoBlZParWcJsUsIupdsPOJ88SB5kQIol3pp774FVZGcBWDWsikN9fp6kUsbW_qZZjLJ6j78QVogCsWR2zWzSoFjYBHe5kdEwjWLPIxGKh2n3WhNQ35UFcdgBAuCb3Ae43W019MsWXSo3e_8DHqQDde_HgjKFy9grl4PRmOLztMsDtBFggE3gaJpRlzjdA9c_rOBj_MOnV57rwpWSZPmfMqGe2vvASqbkdEYpZfGpEeM_6AisusK56GlKSfq3TGxvlQ0oC"
                />
                <div>
                  <p className="headline-md" style={{ fontSize: '18px' }}>Elias Thorne</p>
                  <p className="body-md" style={{ color: 'var(--color-secondary)', fontSize: '14px' }}>Head Roaster & Q-Grader</p>
                </div>
              </div>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px' }}>
                With over 15 years in the industry, Elias has sourced beans from 24 countries and developed award-winning roast profiles for Origin.
              </p>
            </div>

            {/* Location Mini Map */}
            <div className={styles.venueCard}>
              <h4 className="label-caps" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>VENUE</h4>
              <div className={styles.mapContainer}>
                <img
                  alt="Map of roastery"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', opacity: 0.8 }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk7CQ40lROVhw7dKtrIHili4yNusDGQaELtXuAXqc4r8gUAu2-z-mxcUBwQA_7ZhRbwO4LCfzPfZ2-55V05fBrilB_V_3ShCCfu2QlIVg3Ts9_TUeFfhncdMUlA5TCHw09w2SFbK4luXDsB0H1upWNBxS8VTb3nkVX0IuCgJuzG3LFo341qq1MUaun142s9dtOd6bvvTXNFNVsrn-h0QsvuXmhb3gpdKT1RaLqd3tbeRnQdUTszRVC9n6ZifuoDVpQaljMpNUhN3z7"
                />
              </div>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px' }}>1242 Industry Way, Suite 4<br />Seattle, WA 98104</p>
            </div>
          </div>
        </aside>
      </section>

      {/* Newsletter / Community Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterBox}>
          <span className="label-caps" style={{ color: '#d9c2b6' }}>STAY INFORMED</span>
          <h2 className="display-lg" style={{ color: 'white' }}>Can&apos;t make it? Get notified of future roasting workshops.</h2>
          <div className={styles.newsletterForm}>
            <input
              className={`${styles.newsletterInput} label-caps`}
              placeholder="YOUR EMAIL ADDRESS"
              type="email"
            />
            <button className={`${styles.newsletterButton} label-caps`}>Join Waitlist</button>
          </div>
        </div>
      </section>
    </main>
  );
}
