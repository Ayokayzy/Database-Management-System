import { createSelector } from "@reduxjs/toolkit";

const selectDatabase = (state) => state.database;

export const selectDatabaseItems = createSelector(
  [selectDatabase], (database) => database.databases
);

export const selectCurrentDatabAse = createSelector(
    [selectDatabase],
    (database) => database.currentDatabase
)