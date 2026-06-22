import Image from "next/image";
import styles from "./page.module.css";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <ol className={`${styles.breadcrumbList} label-caps`}>
          <li className={styles.breadcrumbItem}>Shop</li>
          <li>/</li>
          <li className={styles.breadcrumbItem}>Roasted Bean</li>
          <li>/</li>
          <li style={{ color: 'var(--color-primary)' }}>Ethiopian Sidamo</li>
        </ol>
      </nav>

      {/* Product Hero Section */}
      <div className={styles.productLayout}>
        {/* Left: Product Image */}
        <div className={styles.leftCol}>
          <div className={styles.mainImageContainer}>
            <img
              alt="Ethiopian Sidamo Coffee Beans"
              className={styles.mainImage}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2TGEDA6FJU_V7mok6-vkUPRdPM3yqgoupuIwzMcfrvAlR0x5jA1mYcwJtO-q1umZp9f3q8xrDQHa0UUltR2Sk1Lcc4VMTEZyp7VcYvsBE0k5YLA_KJVmFqjEykHpdOHmb0vpmBMcn1001aWSUxjK5J6zo_oGsZsqLKCxXj12bjxzVL7fWYaa1LvnfuuZwo3isSDadIi5D2OhX0LGp1TG1adZkFOOHqv_jqdB5trXQowEwk2dSGzkEARs-UWJEdL0lrKv_sddDxiV-"
            />
          </div>
          <div className={styles.thumbnailsGrid}>
            <div className={styles.thumbnailContainer}>
              <img
                alt="Detail 1"
                className={styles.thumbnail}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkmx0bBh9ViBBBv5wXLGXbRgt_0xe394RlMY2Uf2RSuPVMQPUn-0NukOsxW9FHLO7TZH4uRfiGR7_vrfX2kebiCpRLvcam0rKBr772bYcdyIFy66kT_GgxFLyY1HygsrVOF2wNch6TG_QC3s6lQEVFRTvyyAM8agxXgGXh1GKw9812aHJ_U-KxcLP3tsectdvc718ofevT_8q3V2WGScypw5HM2fmfyfezVclPhdus4E9xSofY90FI1FwS-0lRYHz_IbV_Kh0QSvjT"
              />
            </div>
            <div className={styles.thumbnailContainer}>
              <img
                alt="Detail 2"
                className={styles.thumbnail}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcEhE8-tili1hIGEnOljABge-o3HKAoGFTXFPt3y8fI0bXj0GIHAvciGg4KcQfdBdJOaATvbd-GizsWzQM0gddqdrHYnojh3xYExSXgwvP1yRlp1AnlTvjHa2YwAtnx9uwNTqjqG-i5FBt6BGZSwKxU5NWphIj58E6bzOOysJhN4tCpmhOa9Jd-qJifBSg1Xni0sbM6qYJH8MGIqOgbUd0ATPusO7LEtXm0wZEPEQQMIMXEZjuoNBgCIU4R3snkKl-Umz8aIjBKEo1"
              />
            </div>
            <div className={styles.thumbnailContainer}>
              <img
                alt="Detail 3"
                className={styles.thumbnail}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW-KYGWRG8ClrdoZDxFH3gwmKswskOyHDMCiKVGetBFs1KU2kR1acHCLXN0ORY4dWnHkNmTDAhfWOjsS2-GR88CGqVlOWdbZDAckRV4gf3nkfJlF7Ax70U0kpQGQGOjCwnlBaYWXFfgLZ05Tth8bvY_5KYkGOGwn7NrLl87RO2fXrunsEqQUWSjQYShUWJyTGv7zVs-m0a_-NfZc1dqCwn_xrRg3ABODSJ5_eOxdqFLFrtVeb-c27A-K-FOjY4ustd4u26D0dMeLoZ"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className={styles.rightCol}>
          <div>
            <h1 className="display-lg" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Ethiopian Sidamo</h1>
            <p className="headline-md" style={{ color: 'var(--color-on-surface-variant)' }}>$28.00</p>
          </div>

          <div className={styles.divider}></div>

          {/* Roast Level */}
          <div className={styles.infoGroup}>
            <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)' }}>Roast Level</span>
            <div className={styles.roastLevel}>
              <span className={`${styles.roastTag} label-caps`}>Light-Medium</span>
              <div className={styles.roastDots}>
                <div className={`${styles.dot} ${styles.dotActive}`}></div>
                <div className={`${styles.dot} ${styles.dotActive}`}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>

          {/* Tasting Notes */}
          <div className={styles.infoGroup}>
            <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)' }}>Tasting Notes</span>
            <p className="body-lg" style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Floral, Blueberry, Lemon Zest</p>
          </div>

          {/* Origin Info */}
          <div className={styles.originGrid}>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Region</span>
              <p className="body-md">Sidama Zone, Ethiopia</p>
            </div>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Process</span>
              <p className="body-md">Washed</p>
            </div>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Altitude</span>
              <p className="body-md">1,900 – 2,200 MASL</p>
            </div>
            <div>
              <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)', display: 'block', marginBottom: '4px' }}>Varietal</span>
              <p className="body-md">Heirloom</p>
            </div>
          </div>

          <div className={styles.quantityAddRow}>
            <span className="label-caps" style={{ color: 'var(--color-on-secondary-container)' }}>Select Quantity</span>
            <div className={styles.quantityAddContainer}>
              {/* Quantity Selector */}
              <div className={styles.quantitySelector}>
                <button className={styles.quantityBtn}>
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="body-md" style={{ fontWeight: 500 }}>1</span>
                <button className={styles.quantityBtn}>
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              {/* Add to Cart */}
              <button className={`${styles.addToCartBtn} label-caps`}>
                Add to Cart
              </button>
            </div>
          </div>

          <div className={styles.accordionGroup}>
            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                <span className="label-caps">Product Description</span>
                <span className={`material-symbols-outlined ${styles.accordionIcon}`}>expand_more</span>
              </summary>
              <div className={`${styles.accordionContent} body-md`}>
                This heirloom lot from the Sidama region represents the quintessential Ethiopian cup. Expect a complex bouquet of jasmine and citrus, followed by a heavy fruit sweetness reminiscent of fresh blueberries.
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                <span className="label-caps">Brewing Recommendations</span>
                <span className={`material-symbols-outlined ${styles.accordionIcon}`}>expand_more</span>
              </summary>
              <div className={`${styles.accordionContent} body-md`}>
                We recommend a 1:16 ratio using a Chemex or V60 to highlight the delicate floral notes and bright acidity of this coffee. Water temperature 202°F.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Sensory Grid / Asymmetric Layout */}
      <section className={styles.sensorySection}>
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
                &quot;The Sidamo terroir consistently delivers a clarity of flavor that is unmatched. We roast in small 5kg batches to ensure the volatile aromatics are preserved.&quot;
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
      </section>
    </main>
  );
}
