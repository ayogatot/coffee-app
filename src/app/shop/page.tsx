import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

const LIMIT = 6;
const FALLBACK_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6gbR1jk_J5dBYe573gQD4FwOAbxeDpM9JtjW2wZSZkxndsAuyBtjcGRQcVobXtIx22jS8erEWEffir6IS9Utgs2-tUAk8dcXK9P5of6letqKlhk3kVxUY4WRI0fQ0baGo9aUaAEdD9G0R_dakx8CwlmlolIfjCyjmtRvAslNC87-E4QHOUi2BakROoiOIBqRd6-8tzF95Tu6F2E-cGAIgfwXTuyEVRM2O2DpQqzylyIn97YvPddjCllrrbBmpX-ljTm617UmL4Dlk';

interface ProductListProps {
  activeCategory: string;
  currentPage: number;
}

async function ProductList({ activeCategory, currentPage }: ProductListProps) {
  const from = (currentPage - 1) * LIMIT;
  const to = from + LIMIT - 1;

  // Build query
  let query = supabase
    .from('coffee_beans_view')
    .select('*', { count: 'exact' });

  if (activeCategory !== 'All') {
    query = query.eq('category', activeCategory);
  }

  const { data: beans, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <div style={{ color: 'red', marginTop: '16px', textAlign: 'center' }}>
        <p className="body-lg">Error Loading Catalog</p>
        <p className="body-md">{error.message}</p>
      </div>
    );
  }

  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / LIMIT);

  if (!beans || beans.length === 0) {
    return (
      <div className={styles.noResults}>
        <p className="body-lg">No coffee beans found in this category.</p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.productGrid}>
        {beans.map((bean) => {
          // Extract cover image
          let coverImage = FALLBACK_IMAGE;
          try {
            if (Array.isArray(bean.image_url)) {
              coverImage = (bean.image_url as any[])[0] || FALLBACK_IMAGE;
            } else if (typeof bean.image_url === 'string') {
              if (bean.image_url.trim().startsWith('[')) {
                const parsed = JSON.parse(bean.image_url);
                coverImage = parsed[0] || FALLBACK_IMAGE;
              } else {
                coverImage = bean.image_url || FALLBACK_IMAGE;
              }
            }
          } catch (e) {
            coverImage = FALLBACK_IMAGE;
          }

          const displayPrice = `From $${parseFloat(bean.price.toString()).toFixed(2)} USD`;
          const displayNotes = bean.sensory_notes || 'Balanced cup profile';
          const displayTag = bean.category === 'Green Bean' ? 'Raw' : bean.roast_level || 'Roasted';

          return (
            <div key={bean.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <Link href={`/shop/${bean.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <Image
                    src={coverImage}
                    alt={bean.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.productImage}
                    priority={currentPage === 1}
                  />
                </Link>
                <div className={styles.quickAddOverlay}>
                  <Link href={`/shop/${bean.slug}`} className={styles.quickAddButton} style={{ textDecoration: 'none' }}>
                    View Details
                  </Link>
                </div>
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                  <Link href={`/shop/${bean.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 className="headline-md" style={{ color: 'var(--color-primary)', fontSize: '20px' }}>{bean.name}</h3>
                  </Link>
                  <span className={styles.roastTag}>{displayTag}</span>
                </div>
                <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>{displayNotes}</p>
                <p className="body-md" style={{ color: 'var(--color-primary)', fontWeight: 500, marginTop: '8px' }}>{displayPrice}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Link
            href={currentPage > 1 ? `/shop?page=${currentPage - 1}${activeCategory !== 'All' ? `&category=${activeCategory}` : ''}` : '#'}
            className={`${styles.paginationBtn} ${currentPage <= 1 ? styles.paginationDisabled : ''}`}
          >
            Previous
          </Link>
          <span className={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={currentPage < totalPages ? `/shop?page=${currentPage + 1}${activeCategory !== 'All' ? `&category=${activeCategory}` : ''}` : '#'}
            className={`${styles.paginationBtn} ${currentPage >= totalPages ? styles.paginationDisabled : ''}`}
          >
            Next
          </Link>
        </div>
      )}
    </>
  );
}

function ProductGridSkeleton() {
  return (
    <section className={styles.productGrid}>
      {[...Array(LIMIT)].map((_, i) => (
        <div key={i} className={styles.productCardSkeleton}>
          <div className={styles.imageContainerSkeleton}>
            <div className={styles.shimmer} />
          </div>
          <div className={styles.productInfoSkeleton}>
            <div className={styles.productHeaderSkeleton}>
              <div className={styles.titleSkeleton} />
              <div className={styles.tagSkeleton} />
            </div>
            <div className={styles.notesSkeleton} />
            <div className={styles.priceSkeleton} />
          </div>
        </div>
      ))}
    </section>
  );
}

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageStr = resolvedSearchParams.page;
  const categoryStr = resolvedSearchParams.category;

  const currentPage = pageStr ? parseInt(pageStr, 10) : 1;
  const activeCategory = categoryStr && categoryStr !== 'All' ? categoryStr : 'All';

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
          <Link
            href="/shop"
            className={`${styles.filterButton} ${activeCategory === 'All' ? styles.filterActive : ''}`}
          >
            All
          </Link>
          <Link
            href="/shop?category=Green Bean"
            className={`${styles.filterButton} ${activeCategory === 'Green Bean' ? styles.filterActive : ''}`}
          >
            Green Bean
          </Link>
          <Link
            href="/shop?category=Roasted Bean"
            className={`${styles.filterButton} ${activeCategory === 'Roasted Bean' ? styles.filterActive : ''}`}
          >
            Roasted Bean
          </Link>
        </div>
      </section>

      {/* Product Grid inside Suspense */}
      <Suspense key={`${activeCategory}-${currentPage}`} fallback={<ProductGridSkeleton />}>
        <ProductList activeCategory={activeCategory} currentPage={currentPage} />
      </Suspense>
    </main>
  );
}
