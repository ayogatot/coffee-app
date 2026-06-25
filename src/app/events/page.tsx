import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

// Helper function to format the date string YYYY-MM-DD to MMM DD format (e.g. MAY 12)
function formatEventDate(dateStr: string) {
  try {
    const datePart = dateStr.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return dateStr;
    }
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${monthName} ${String(day).padStart(2, '0')}`;
  } catch (e) {
    return dateStr;
  }
}

export default async function Events() {
  const { data: dbEvents, error } = await supabase
    .from('events_view')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
  }

  const events = (dbEvents || []).map((event, index) => {
    // Top 2 events have colSpan colSpan8 / colSpan4 and imageClass topRowImage
    // Other events have empty colSpan and imageClass aspect45
    let colSpan = '';
    let imageClass = 'aspect45';
    if (index === 0) {
      colSpan = 'colSpan8';
      imageClass = 'topRowImage';
    } else if (index === 1) {
      colSpan = 'colSpan4';
      imageClass = 'topRowImage';
    }

    // Map buttonText dynamically based on names
    let buttonText = 'RESERVE SPOT';
    const lowerName = event.name.toLowerCase();
    if (lowerName.includes('trip')) {
      buttonText = lowerName.includes('glamping') ? 'VIEW PACKAGE' : 'LEARN MORE';
    } else if (lowerName.includes('class')) {
      buttonText = lowerName.includes('roasting') ? 'ENROLL NOW' : 'BOOK CLASS';
    }

    // Trim description to keep grid items concise
    const rawDesc = event.description || '';
    const trimmedDesc = rawDesc.length > 120 ? `${rawDesc.slice(0, 120).trim()}...` : rawDesc;

    return {
      id: event.id,
      slug: event.slug,
      title: event.name,
      date: formatEventDate(event.event_date),
      description: trimmedDesc,
      image: event.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk',
      buttonText,
      colSpan,
      imageClass,
    };
  });

  const topEvents = events.slice(0, 2);
  const bottomEvents = events.slice(2);

  return (
    <main className={styles.main}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className="label-caps" style={{ color: 'var(--color-outline)' }}>Community Rituals</span>
          <h1 className="display-lg" style={{ color: 'var(--color-primary)' }}>Events & Workshops</h1>
          <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
            Explore the journey of the bean from soil to cup through our curated farm visits and specialty coffee masterclasses.
          </p>
        </div>
      </header>

      {events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-on-surface-variant)' }}>
          <p className="body-lg" style={{ marginBottom: '8px' }}>No upcoming events or workshops at the moment.</p>
          <p className="body-md">Check back later or subscribe to our newsletter below to stay notified!</p>
        </div>
      ) : (
        /* Events Bento Grid */
        <div className={styles.bentoGrid}>
          {/* Top Row Grid */}
          {topEvents.map((event) => (
            <Link href={`/events/${event.slug}`} key={event.id} className={`${styles.card} ${event.colSpan ? styles[event.colSpan] : ''}`}>
              <div className={`${styles.imageContainer} ${styles[event.imageClass]}`}>
                <div style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={styles.image}
                  />
                </div>
                <div className={styles.dateTag}>
                  <span className="label-caps" style={{ color: 'var(--color-primary)' }}>{event.date}</span>
                </div>
              </div>
              <div className={styles.content}>
                <h2 className={event.colSpan === 'colSpan8' ? 'headline-lg' : 'headline-md'} style={{ color: 'var(--color-primary)' }}>
                  {event.title}
                </h2>
                <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', ...(event.colSpan === 'colSpan8' ? { maxWidth: '600px' } : {}) }}>
                  {event.description}
                </p>
                <span className={styles.link}>{event.buttonText}</span>
              </div>
            </Link>
          ))}

          {/* Bottom Row Grid */}
          {bottomEvents.length > 0 && (
            <div className={styles.bottomGrid}>
              {bottomEvents.map((event) => (
                <Link href={`/events/${event.slug}`} key={event.id} className={styles.card}>
                  <div className={`${styles.imageContainer} ${styles[event.imageClass]}`}>
                    <div style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.dateTag}>
                      <span className="label-caps" style={{ color: 'var(--color-primary)' }}>{event.date}</span>
                    </div>
                  </div>
                  <div className={styles.content}>
                    <h3 className="headline-md" style={{ color: 'var(--color-primary)' }}>{event.title}</h3>
                    <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {event.description}
                    </p>
                    <span className={styles.link}>{event.buttonText}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <span className="label-caps" style={{ color: 'var(--color-outline)', marginBottom: '16px' }}>Stay Notified</span>
        <h2 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Never miss a workshop</h2>
        <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '450px', marginBottom: '32px' }}>
          Be the first to know when we announce new dates for our farm trips and masterclasses.
        </p>
        <div className={styles.formGroup}>
          <input type="email" placeholder="Email Address" className={styles.input} />
          <button className={styles.submitButton}>Subscribe</button>
        </div>
      </section>
    </main>
  );
}
