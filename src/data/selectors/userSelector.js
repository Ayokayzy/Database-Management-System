import { createSelector } from "@reduxjs/toolkit";

export const userSelector = (state) => state.auth

export const selectCurrentUser = createSelector(
    [userSelector],
    (user) => user.user
)