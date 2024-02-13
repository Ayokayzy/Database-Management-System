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
