// src/lib/loyaltyEngine.js

export const loyaltyRules = {
  Silver: {
    name: 'Silver Member',
    minTrx: 0,
    minSpend: 0,
    discount: 0,
    benefits: ['Akses katalog reguler', 'Pengumpulan poin standar (1% dari belanja)']
  },
  Gold: {
    name: 'Gold Member',
    minTrx: 3,
    minSpend: 3000000, // Rp 3.000.000
    discount: 5, // 5% diskon
    benefits: ['Diskon 5% untuk semua buku', 'Akses pre-order reguler', 'Double points (2% dari belanja)']
  },
  Platinum: {
    name: 'Platinum Member',
    minTrx: 6,
    minSpend: 7500000, // Rp 7.500.000
    discount: 10, // 10% diskon
    benefits: ['Diskon 10% untuk semua buku', 'Prioritas Pre-Order khusus', 'Bebas biaya kirim khusus Pekanbaru', 'Triple points (3% dari belanja)']
  }
};

/**
 * Calculates customer loyalty tier based on transaction count and total spend
 * @param {number} trxCount - Number of transactions in the last 6 months
 * @param {number} totalSpend - Total amount spent in Rupiah in the last 6 months
 * @returns {string} - 'Silver', 'Gold', or 'Platinum'
 */
export function calculateLoyaltyTier(trxCount, totalSpend) {
  if (trxCount >= 6 || totalSpend >= loyaltyRules.Platinum.minSpend) {
    return 'Platinum';
  }
  if (trxCount >= 3 || totalSpend >= loyaltyRules.Gold.minSpend) {
    return 'Gold';
  }
  return 'Silver';
}
