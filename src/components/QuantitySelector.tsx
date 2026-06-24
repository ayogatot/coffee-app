'use client';

import { useState } from 'react';
import styles from './QuantitySelector.module.css';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.quantitySelector}>
      <button className={styles.quantityBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
      </button>
      <span className="body-md" style={{ fontWeight: 500 }}>{quantity}</span>
      <button className={styles.quantityBtn} onClick={() => setQuantity(q => q + 1)}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
      </button>
    </div>
  );
}
