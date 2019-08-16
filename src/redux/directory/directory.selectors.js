import { createSelector } from 'reselect';

/**
 * Slice state and get directory.
 *
 * @param {object} state redux state
 */
const selectDirectory = state => state.directory;

/**
 * Create selector to return `directory state sections`.
 */
export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
);
