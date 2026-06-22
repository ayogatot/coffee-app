import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Events() {
  const events = [
    {
      id: 1,
      slug: 'telusur-rasa-wisata',
      title: 'Telusur Rasa (Wisata)',
      date: 'MAY 12',
      description: 'Embark on a sensory journey through our estates. Experience the local culture and the origins of your favorite brew.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1inzJZG4Ss2Sght_LgmJadmIhfhqcCrWHeSlZDYySocdgyubVncbLTRg0m9oMy20r3V-5wvY-Sc37UZZSRyhhDXiNwlcUga1uvVtymNyJVXg8BurgHSEsTj1Rya6R-evoARBj3PTTlnzH9HeXetXu1Ha8AKi7UdhaVcUWSLU_J_KhUVW9AuxXmv4OMiwAVxr1VatkqOnGunl0li7SFZWFRLTEVxYP3c7qnAOmotfn7fQ8bQkTrRzg59LRV_lC4ccKTSYFxsbaY9VJ',
      buttonText: 'RESERVE SPOT',
      colSpan: 'colSpan8',
      imageClass: 'topRowImage',
    },
    {
      id: 2,
      slug: 'farm-trip',
      title: 'Farm Trip',
      date: 'MAY 20',
      description: 'A day on the land. Walk the rows, learn about soil health, and see the harvest process firsthand.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVenja5SsAmlumdWQL0bYukDU_thB-3DrAr5NSHE0_EOKo_5tY5lag7JKgkQ8SYJzLnuihn0l7DRaUz6Ap8YOvncxOBGi0DTHfVjYnOkkQb969pQuQbwEDDRYVUr9IPHV0Ck7nSuDA4pvv9-g7zEilaGso5jqJixd8ZKyeG1ORLJl6ERt0Vytlk5McBA9hgZqR6WmF4C2m0VgwEB6FpYppQ-oe_y7hD6JgERm0TzPPUiHvUBiBeVGUddpc65ZG7ECOF9poK0ehP0Iu',
      buttonText: 'LEARN MORE',
      colSpan: 'colSpan4',
      imageClass: 'topRowImage',
    },
    {
      id: 3,
      slug: 'farm-trip-glamping',
      title: 'Farm Trip + Glamping',
      date: 'JUN 02-04',
      description: 'The ultimate immersion. Spend two nights under the stars in the heart of our coffee forests.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIF1aG173qPR-UNG_t2j8hWosK5tOfGieeIArS3eO1WMvXXJC9x5yb2lqzrkiwVYB4Ie6LLXay9fxasBMVO_SEXvokFkSZTFWW1g2f5KinKj-J_FBcRUdZNgku2zgnQwMDkreRpCzgQlVhBYLrrKWuaKAS0nVfqVNW13IgvvHtVVpSNGE1rEqSaVBWpH_H7wGa99UbjxppLqJx7LTKyL_OTJaNk3LfAVszd--1zfb2c5dds9LC_n9eXTNeNZQR0F7JT8ErSVPxX2Sb',
      buttonText: 'VIEW PACKAGE',
      colSpan: '',
      imageClass: 'aspect45',
    },
    {
      id: 4,
      slug: 'kelas-kopi',
      title: 'Kelas Kopi',
      date: 'JUN 10',
      description: 'Foundational skills for home enthusiasts. Learn brewing theory and dial in your morning ritual.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYWawYRXmjc2chszQVHMUkfI_r--M1UTPWi5jMslaSb0G3kOxr1GcSttHhDDuLvbiUSSpGHK3hL0g_ubn5bieLzGIDxtzMSgAHziYMeiAgfFoOTReCxpwSJy2bVRygeIT-oJaKa2uzvtudNYhG318xUwK3HtZPPOtHjMDSW0yzoVjQZykV5KrhEQunHrr_J9-U5uNEEEoPR4_1EK3-mVSi8bVG8iKawx4WivcZeV8w1UcNGh-pyHiKfy_9zYDdBEuW9tfDYyizW_kF',
      buttonText: 'BOOK CLASS',
      colSpan: '',
      imageClass: 'aspect45',
    },
    {
      id: 5,
      slug: 'roasting-masterclass',
      title: 'Roasting Class',
      date: 'JUN 24',
      description: 'Master the fire. Understanding the science of roasting from light to dark profiles.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ZAS-XPJf8gb1iLK22JP0K5BG7-4tXi99yLBdIknpASqJT8Ni-B1K4nocsl_dWVE7XImzP9U4e8C1H_vRJUoJIxLonVTMx7D3Fj-p4dk64J7dtjAvHZT5mN7INLcAMGXYGhx9upjDyDj9v8cuCi0dGcJ4pihKCp6fZqxTNm-jdsYUdKdIEO1vMuu2ZJ4Axs__xWMBllDwhnZGk-LIBd-HMlv4oCSj72MYZJZmxrIwYRNsJAYhmhdO4IgCGk4nlih7LXuTYw0-tiZ9',
      buttonText: 'ENROLL NOW',
      colSpan: '',
      imageClass: 'aspect45',
    }
  ];

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

      {/* Events Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Top Row Grid */}
        {topEvents.map((event) => (
          <article key={event.id} className={`${styles.card} ${styles[event.colSpan]}`}>
            <div className={`${styles.imageContainer} ${styles[event.imageClass]}`}>
              <Link href={`/events/${event.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className={styles.image}
                />
              </Link>
              <div className={styles.dateTag}>
                <span className="label-caps" style={{ color: 'var(--color-primary)' }}>{event.date}</span>
              </div>
            </div>
            <div className={styles.content}>
              <Link href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
                <h2 className={event.colSpan === 'colSpan8' ? 'headline-lg' : 'headline-md'} style={{ color: 'var(--color-primary)' }}>
                  {event.title}
                </h2>
              </Link>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', ...(event.colSpan === 'colSpan8' ? { maxWidth: '600px' } : {}) }}>
                {event.description}
              </p>
              <Link href={`/events/${event.slug}`} className={styles.link}>{event.buttonText}</Link>
            </div>
          </article>
        ))}

        {/* Bottom Row Grid */}
        <div className={styles.bottomGrid}>
          {bottomEvents.map((event) => (
            <article key={event.id} className={styles.card}>
              <div className={`${styles.imageContainer} ${styles[event.imageClass]}`}>
                <Link href={`/events/${event.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={styles.image}
                  />
                </Link>
                <div className={styles.dateTag}>
                  <span className="label-caps" style={{ color: 'var(--color-primary)' }}>{event.date}</span>
                </div>
              </div>
              <div className={styles.content}>
                <Link href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 className="headline-md" style={{ color: 'var(--color-primary)' }}>{event.title}</h3>
                </Link>
                <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {event.description}
                </p>
                <Link href={`/events/${event.slug}`} className={styles.link}>{event.buttonText}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>

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
