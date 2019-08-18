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

/**
 * Transform data into an array.
 */
export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

/**
 * Create selector find collection item that matches id with collection.
 *
 * @param {string} collectionUrlParam collection id url param.
 */
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

/**
 * Select isFetching prop from state.
 */
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  /* !! with falsy returns false else returns true */
  shop => !!shop.collections
);
