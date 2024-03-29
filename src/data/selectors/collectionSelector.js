import { createSelector } from "@reduxjs/toolkit";

const collection = (state) => state.collection;

export const selectCollection = createSelector(
  [collection],
  (collection) => collection.dbCollections
);

export const selectCollectionDetails = createSelector(
  [collection],
  (collection) => collection.currentCollectionDetails
);

export const selectCurrentCollection = createSelector(
  [collection],
  (current) => current.currentCollection
);

export const selectCollectionLoading = createSelector(
  [collection],
  (loading) => loading.isLoading
);
