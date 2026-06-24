import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";
import { EventHighlight } from "@/types/database.types";

const FALLBACK_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCwod3nZ4gS-izbpisFyBhDeMbmj_KOMYh0WrFUFGPYg8atDZeymKOuHruigJ4zvAA7O3Ne3fxuTwOgyrSHYMFzflTdjvJqs7BikvsLn_v2GMXRd1H8RLnqfjCa8dqtoyDZZWG0WXpntwcZKMWxJQGFcbHh5HZaj3_MBbPk0rtrZQhMpALLMRKi-P24u4zi8ebtoCQ-AMoXAiHVVFimqwa7aNGyvXGXfjDI9FQNDizcV2PudAvbupXthJ8cAnQ62JTExMj3qA82D3ry";
const HOST_FALLBACK_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCols1Ada3BoBlZParWcJsUsIupdsPOJ88SB5kQIol3pp774FVZGcBWDWsikN9fp6kUsbW_qZZjLJ6j78QVogCsWR2zWzSoFjYBHe5kdEwjWLPIxGKh2n3WhNQ35UFcdgBAuCb3Ae43W019MsWXSo3e_8DHqQDde_HgjKFy9grl4PRmOLztMsDtBFggE3gaJpRlzjdA9c_rOBj_MOnV57rwpWSZPmfMqGe2vvASqbkdEYpZfGpEeM_6AisusK56GlKSfq3TGxvlQ0oC";

function formatDetailDate(dateStr: string) {
  try {
    const datePart = dateStr.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return dateStr;
    }
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch the dynamic event by slug from events_view
  const { data: event, error } = await supabase
    .from('events_view')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !event) {
    notFound();
  }

  // Fetch count of participants registered for this event
  const { count: registrationCount } = await supabase
    .from('event_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', event.id);

  const remainingSeats = Math.max(0, event.capacity - (registrationCount || 0));

  // Parse whats_included JSONB safely
  let whatsIncluded: string[] = [];
  try {
    if (Array.isArray(event.whats_included)) {
      whatsIncluded = event.whats_included as string[];
    } else if (typeof event.whats_included === 'string') {
      whatsIncluded = JSON.parse(event.whats_included);
    }
  } catch (e) {
    console.error('Error parsing whats_included:', e);
  }

  // Parse highlights JSONB safely
  let highlights: EventHighlight[] = [];
  try {
    if (Array.isArray(event.highlights)) {
      highlights = event.highlights as unknown as EventHighlight[];
    } else if (typeof event.highlights === 'string') {
      highlights = JSON.parse(event.highlights);
    }
  } catch (e) {
    console.error('Error parsing highlights:', e);
  }

  const formatPrice = `$${event.price}`;
  const highlightIcons = ['science', 'thermostat', 'coffee_maker', 'psychology', 'menu_book', 'groups'];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <img
          alt={event.name}
          className={styles.heroImage}
          src={event.image_url || FALLBACK_IMAGE}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <span className="label-caps" style={{ color: 'white', marginBottom: '16px', display: 'block' }}>
              {event.badge || 'LIMITED WORKSHOP'}
            </span>
            <h1 className="display-lg" style={{ color: 'white' }}>{event.name}</h1>
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
              <p className="body-lg" style={{ fontWeight: 500 }}>{formatDetailDate(event.event_date)}</p>
            </div>
          </div>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>schedule</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>TIME</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>{event.event_time || '-'}</p>
            </div>
          </div>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>location_on</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>LOCATION</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>{event.location || '-'}</p>
            </div>
          </div>
          <div className={styles.quickInfoItem}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>confirmation_number</span>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-secondary)' }}>CAPACITY</p>
              <p className="body-lg" style={{ fontWeight: 500 }}>{remainingSeats} Seats Remaining</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Sidebar Layout */}
      <section className={styles.layout}>
        {/* Main Column */}
        <div className={styles.mainColumn}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="headline-lg" style={{ color: 'var(--color-primary)' }}>About the Workshop</h2>
            <div className="body-lg" style={{ color: 'var(--color-on-surface-variant)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(event.description || '-').split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {highlights.length > 0 && (
            <div className={styles.grid2Col}>
              {highlights.map((highlight, index) => (
                <div key={index} className={styles.card}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', marginBottom: '16px', fontSize: '32px' }}>
                    {highlightIcons[index % highlightIcons.length]}
                  </span>
                  <h3 className="headline-md" style={{ marginBottom: '12px' }}>{highlight.title || '-'}</h3>
                  <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>{highlight.description || '-'}</p>
                </div>
              ))}
            </div>
          )}

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
                  <span className="headline-lg" style={{ color: 'var(--color-primary)' }}>{formatPrice}</span>
                  <span className="body-md" style={{ color: 'var(--color-secondary)' }}>USD</span>
                </div>
              </div>

              {whatsIncluded.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  {whatsIncluded.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                      <span className="body-md">{item}</span>
                    </div>
                  ))}
                </div>
              )}

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
                  alt={event.host_name || 'Host'}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                  src={event.host_avatar_url || HOST_FALLBACK_IMAGE}
                />
                <div>
                  <p className="headline-md" style={{ fontSize: '18px' }}>{event.host_name || '-'}</p>
                  <p className="body-md" style={{ color: 'var(--color-secondary)', fontSize: '14px' }}>{event.host_title || '-'}</p>
                </div>
              </div>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px' }}>
                {event.host_bio || '-'}
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
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px' }}>
                {event.venue_address ? (
                  event.venue_address.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))
                ) : (
                  '-'
                )}
              </p>
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
