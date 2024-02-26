import { createSelector } from "@reduxjs/toolkit";

const admin = (state) => state.admin;

export const selectAllusers = createSelector(
  [admin],
  (users) => users.allUsers
);

export const selectUsersLoading = createSelector(
  [admin],
  (loading) => loading.usersLoading
);

export const selectDbState = createSelector([admin], (db) => db.dbState);
