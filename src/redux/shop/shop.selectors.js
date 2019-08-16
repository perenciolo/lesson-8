import { createSelector } from 'reselect';

/**
 * Get state and return shop from it.
 *
 * @param {object} state redux state
 */
const selectShop = state => state.shop;

/**
 * Create selector that gets shop state and return shop collections.
 */
export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);
