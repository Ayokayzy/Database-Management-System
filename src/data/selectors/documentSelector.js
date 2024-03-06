import { createSelector } from "@reduxjs/toolkit";

export const document = (state) => state.document;

export const selectAllDocuments = createSelector(
  [document],
  (documents) => documents.allDocuments
);

export const selectDocumentLoading = createSelector(
  [document],
  (loading) => loading.isLoading
);
