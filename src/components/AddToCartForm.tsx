'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './AddToCartForm.module.css';

interface AddToCartFormProps {
  bean: {
    id: string;
    slug: string;
    name: string;
    price: number;
    category: string;
    roast_level?: string | null;
  };
  coverImage: string;
}

export default function AddToCartForm({ bean, coverImage }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      {
        id: bean.id,
        slug: bean.slug,
        name: bean.name,
        price: Number(bean.price),
        image_url: coverImage,
        category: bean.category,
        roast_level: bean.roast_level,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={styles.quantityAddContainer}>
      <div className={styles.quantitySelector}>
        <button
          type="button"
          className={styles.quantityBtn}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
        </button>
        <span className="body-md" style={{ fontWeight: 500, minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
        <button
          type="button"
          className={styles.quantityBtn}
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Increase quantity"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
        </button>
      </div>
      <button
        type="button"
        className={`${styles.addToCartBtn} label-caps ${isAdded ? styles.added : ''}`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}
