import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Shop() {
  const products = [
    {
      id: 1,
      slug: 'ethiopia-yirgacheffe',
      title: 'Ethiopia Yirgacheffe',
      roast: 'Light',
      notes: 'Bergamot, Jasmine, Lemon Zest',
      price: 'From $18.00 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk',
    },
    {
      id: 2,
      slug: 'panama-geisha-green',
      title: 'Panama Geisha Green',
      roast: 'Raw',
      notes: 'Florals, Honey, Peach',
      price: 'From $45.00 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB69KfW1PPIFGgx8HCsR_M9RZPGpbDxrlXaM02x618zpp211QUN27S3wCkjWi0QDtdIi2C05mm3XQQO5JZFDNvgZ5kt6BAoBfyg14hfcINIHbQ2USMKBK2-OxSKSUcHbWG17Rj4Nx-JwNybsn_l3bKTV3Ts6BOC653c7JXUDhOYOfBorRWubto-0xfwBgMEtg_klPSahjwXGJqpn-ix50P2kiqoz5lbbPs2XVoCP30M__E9RBzxKQO-2XXrp34DQi2YBnDHHgr4_X13',
    },
    {
      id: 3,
      slug: 'ritual-espresso-blend',
      title: 'Ritual Espresso Blend',
      roast: 'Dark',
      notes: 'Dark Chocolate, Molasses, Hazelnut',
      price: 'From $16.00 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARToNxiX1Gnk6W5UMbVAj0_sP3waZFRm2frRUjPh3iHtXKznmbj9SjcxYPs_wetM4li3dl2WsgncChQDBxCaExXvbQIivnqIOkiPXTMuZBx0CUQvy52sde0KEC9FLIPqYHdafccGscTxMPaeNEZXSIVLRjx1pkGK4rP_lf58DNSUlnDy5JoUwJ2unKox_3uboA1NbfMOn84NqkOJr1udQMYzg283pw7wVU9Kl5voo1-flxTbHdJY-vVQrT2smLOSk8NK1tinDqnyPm',
    },
    {
      id: 4,
      slug: 'colombia-huila',
      title: 'Colombia Huila',
      roast: 'Medium',
      notes: 'Caramel, Red Apple, Walnut',
      price: 'From $14.00 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA0HoiBBerfWlhNHTq23-raaNJoiimW4rVzYH3R3MKbYnsMNU7FszM2R7KPKpsODYjKkNYBrJzHkFkwRiVwdZO_mEqFnOLo7tMMOe8EnGVpkuiMLQXsfLst2oo22lLeA7g7eq0-Ds7VtZ-lh24e30my_lAM_Ee0JzMtAfl4cbK8E6klkTFR01AnVYPUdUo8K60NmEO7oa28QAO7QLLUUslbP9ZxwMSx3c_0AzVCzxK58HhtrOJAc-GnGimZOdNAGJQIUXa1DUgMhfb',
    },
    {
      id: 5,
      slug: 'brazil-santos-green',
      title: 'Brazil Santos Green',
      roast: 'Raw',
      notes: 'Nutty, Malt, Soft Body',
      price: 'From $12.00 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0kuJejiBCcBnuMAjDyQFP04mfjfQHjySkFI3VXLFyu8IaZWnopaNH145law2pF3oR5F9gvfz140dvJLndDa5uL8n-hI4iCzA6si4PHkz-FJu_kKZIrNAQOWZae8pbiybhbhClmhDBNwOUhIPxxeqSCwM2vXLx5SYVmGUCQ7CqkuNmoFYxF7_NVLimtCfcPoOlmJhdWsBAxbB-jmbpcM8IPlqzoaLfv7MJvfgcMtWNJMhOXeK04hzhWXpig7BdDjJ86ZVA3B9UsS45',
    },
    {
      id: 6,
      slug: 'kenyan-sl28',
      title: 'Kenyan SL28',
      roast: 'Light',
      notes: 'Blackcurrant, Tomato, Grapefruit',
      price: 'From $22.00 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxm8klb-Dx9KG3o8QRTWWMxyjM_EdqXqlQkfBjQJjoXEANYgC14Rd2mAJXLEKNEZdCtSBEmiXGvI5XlFr7MlhOd3GtISWtisrtakIC5QGVnudRbkmYn-Kokvx1A_C3plQ6aBRG1S_gaxcTa609KVmgKYGMFhQQrTd_DzUOllYLpAmvZtIvQCQZV0GV2u9m7zuRDL6WxeE3vlvZLDmZYSBY8a0b8n2a5pMC--AftYl_qGm5Ex2FOL78sT1W_WbmY6UBfrdJcGtIru5j',
    }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Header */}
      <section className={styles.hero}>
        <h1 className="display-lg" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Coffee & Essentials</h1>
        <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '600px' }}>
          Curated beans from the most dedicated producers, roasted with precision in our local workshop.
        </p>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <button className={`${styles.filterButton} ${styles.filterActive}`}>All</button>
          <button className={styles.filterButton}>Green Bean</button>
          <button className={styles.filterButton}>Roasted Bean</button>
        </div>
      </section>

      {/* Product Grid */}
      <section className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <Link href={`/shop/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className={styles.productImage}
                />
              </Link>
              <div className={styles.quickAddOverlay}>
                <button className={styles.quickAddButton}>Quick Add</button>
              </div>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productHeader}>
                <Link href={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 className="headline-md" style={{ color: 'var(--color-primary)', fontSize: '20px' }}>{product.title}</h3>
                </Link>
                <span className={styles.roastTag}>{product.roast}</span>
              </div>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>{product.notes}</p>
              <p className="body-md" style={{ color: 'var(--color-primary)', fontWeight: 500, marginTop: '8px' }}>{product.price}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
