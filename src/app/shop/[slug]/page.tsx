import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import ImageGallery from '@/components/ImageGallery';
import AddToCartForm from '@/components/AddToCartForm';

const FALLBACK_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch the coffee bean by slug from the view
  const { data: bean, error } = await supabase
    .from('coffee_beans_view')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !bean) {
    notFound();
  }

  // Parse images safely
  let imageUrls: string[] = [];
  try {
    if (Array.isArray(bean.image_url)) {
      imageUrls = bean.image_url as string[];
    } else if (typeof bean.image_url === 'string') {
      if (bean.image_url.trim().startsWith('[')) {
        imageUrls = JSON.parse(bean.image_url);
      } else {
        imageUrls = [bean.image_url];
      }
    }
  } catch (e) {
    imageUrls = [];
  }

  if (imageUrls.length === 0) {
    imageUrls = [FALLBACK_IMAGE];
  }

  const formatPrice = `$${parseFloat(bean.price.toString()).toFixed(2)}`;
  const displayTag = bean.category === 'Green Bean' ? 'Raw' : bean.roast_level || 'Roasted';

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <ol className={`${styles.breadcrumbList} label-caps`}>
          <li className={styles.breadcrumbItem}>
            <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
          </li>
          <li>/</li>
          <li className={styles.breadcrumbItem}>
            <Link href={`/shop?category=${encodeURIComponent(bean.category)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {bean.category}
            </Link>
          </li>
          <li>/</li>
          <li style={{ color: 'var(--color-primary)' }}>{bean.name}</li>
        </ol>
      </nav>

      {/* Product Hero Section */}
      <div className={styles.productLayout}>
        {/* Left: Product Image Gallery */}
        <div className={styles.leftCol}>
          <ImageGallery imageUrls={imageUrls} name={bean.name} />
        </div>

        {/* Right: Product Info */}
        <div className={styles.rightCol}>
          <div>
            <h1 className="display-lg" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>{bean.name}</h1>
            <p className="headline-md" style={{ color: 'var(--color-on-surface-variant)' }}>{formatPrice}</p>
          </div>

          <div className={styles.divider}></div>

          {/* Roast Level */}
          <div className={styles.infoGroup}>
            <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)' }}>Roast Level</span>
            <div className={styles.roastLevel}>
              <span className={`${styles.roastTag} label-caps`}>{bean.roast_level || '-'}</span>
            </div>
          </div>

          {/* Tasting Notes */}
          <div className={styles.infoGroup}>
            <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)' }}>Tasting / Sensory Notes</span>
            <p className="body-lg" style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>{bean.sensory_notes || '-'}</p>
          </div>

          {/* Origin Info Grid */}
          <div className={styles.originGrid}>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Origin / Region</span>
              <p className="body-md">{bean.origin || '-'}</p>
            </div>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Process</span>
              <p className="body-md">{bean.process || '-'}</p>
            </div>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Elevation</span>
              <p className="body-md">{bean.elevation || '-'}</p>
            </div>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Variety / Varietal</span>
              <p className="body-md">{bean.variety || '-'}</p>
            </div>
          </div>

          <div className={styles.quantityAddRow}>
            <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)' }}>Select Quantity</span>
            <AddToCartForm bean={bean} coverImage={imageUrls[0] || FALLBACK_IMAGE} />
          </div>

          <div className={styles.accordionGroup}>
            <details className={styles.accordion} open>
              <summary className={styles.accordionSummary}>
                <span className="label-caps">Story / Description</span>
                <span className={`material-symbols-outlined ${styles.accordionIcon}`}>expand_more</span>
              </summary>
              <div className={`${styles.accordionContent} body-md`}>
                {bean.story || 'No story details provided for this lot.'}
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                <span className="label-caps">Brewing Recommendations</span>
                <span className={`material-symbols-outlined ${styles.accordionIcon}`}>expand_more</span>
              </summary>
              <div className={`${styles.accordionContent} body-md`}>
                {bean.brewing_recommendations || 'Use standard brewing methods for this bean profile.'}
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                <span className="label-caps">Technical Specifications</span>
                <span className={`material-symbols-outlined ${styles.accordionIcon}`}>expand_more</span>
              </summary>
              <div className={`${styles.accordionContent} body-md`}>
                <div className={styles.specsList}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Category</span>
                    <span className={styles.specVal}>{bean.category || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Species</span>
                    <span className={styles.specVal}>{bean.species || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Variety / Varietal</span>
                    <span className={styles.specVal}>{bean.variety || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Process</span>
                    <span className={styles.specVal}>{bean.process || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Fermentation</span>
                    <span className={styles.specVal}>{bean.fermentation || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Fermentation Temp</span>
                    <span className={styles.specVal}>{bean.fermentation_temp || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Drying Method</span>
                    <span className={styles.specVal}>{bean.drying_method || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Harvest Period</span>
                    <span className={styles.specVal}>{bean.harvest_period || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Elevation / Altitude</span>
                    <span className={styles.specVal}>{bean.elevation || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Origin / Region</span>
                    <span className={styles.specVal}>{bean.origin || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Cup Character</span>
                    <span className={styles.specVal}>{bean.cup_character || '-'}</span>
                  </div>
                </div>
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                <span className="label-caps">Commercial Information</span>
                <span className={`material-symbols-outlined ${styles.accordionIcon}`}>expand_more</span>
              </summary>
              <div className={`${styles.accordionContent} body-md`}>
                <div className={styles.specsList}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Availability</span>
                    <span className={styles.specVal}>{bean.availability || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Min. Order Qty</span>
                    <span className={styles.specVal}>{bean.min_order_qty || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Packaging</span>
                    <span className={styles.specVal}>{bean.packaging || '-'}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Current Stock</span>
                    <span className={styles.specVal}>{bean.stock !== null && bean.stock !== undefined ? `${bean.stock} units` : '-'}</span>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Sensory Grid / Asymmetric Layout */}
      {/* <section className={styles.sensorySection}>
        <h2 className={`${styles.sensoryTitle} headline-lg`}>The Sensory Experience</h2>
        <div className={styles.sensoryGrid}>
          <div className={styles.sensoryMainImage}>
            <img
              className="mainImage"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Steam rising from a freshly brewed cup of coffee in a dark, atmospheric setting with cinematic lighting."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH13ME86m6zhLdEyupjaSJdARARy5fiOb_YyFB8ttSMW1ywlk2cLBn0GSHRAzGwDeNfEGnO5kKae92jeIkaPy45J5K8RAaQR5ShaHlCyZBSgwBjNPU3F9PlC2W73txg-BW8fLhmAjM6zUsOm2CtfS2K8JGTMWbj2c22TyHgpJCMwNsGcfQUMG1voYpzV8HJJ0P6xOEqm_o2_XMvcY2yxIccel6SLP0yJxjwWSFRV4aKrcyYFWkkXRIqHYyBwLxCU5jp9ALE_oqdaWr"
            />
            <div className={styles.sensoryImageOverlay}>
              <p className="headline-md" style={{ color: 'white' }}>The Aroma</p>
            </div>
          </div>
          <div className={styles.sensoryRightCol}>
            <div className={styles.quoteBox}>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', marginBottom: '16px' }}>Master Roaster&apos;s Note</span>
              <blockquote className={styles.quoteText}>
                &quot;The {bean.origin || 'selected'} terroir consistently delivers a clarity of flavor that is unmatched. We roast in small 5kg batches to ensure the volatile aromatics are preserved.&quot;
              </blockquote>
            </div>
            <div className={styles.sensoryBottomRow}>
              <div className={styles.sensorySmallImage}>
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt="Hands sorting coffee beans on a wooden table, emphasizing the artisanal craft."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDTDgmOb2ch8sCDLiSpUcPSAmdMxM63QaDo2txQd5BzVMPfDuToz9Sb7q3aMa2eYDWxfMjq_M_gK0LOoQnitPk5bwc4ix0ZeIzTvmyenPv9FZ14FdunF1C8_vsq2szOkLSnR0YS66av88l2jIAjCFmmFQLYbAijJ_dcqqA1_orL_aQ60adBg9oi9WBJ1OXIXstzUNu3Frc1ZjjO21HPgahPFSpNpYC0hy5_ybLEtIANt0M27LqrDeQ0lV9NOhZgispg8EWwFSljY3T"
                />
              </div>
              <div className={styles.ecoBox}>
                <div className={styles.ecoContent}>
                  <span className={`material-symbols-outlined ${styles.ecoIcon}`}>eco</span>
                  <p className="label-caps">100% Ethically Sourced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
