import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	error: null,
	id: null,
	status: null,
	errorText: "",
};

export const errorSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		returnErrors: (state, { payload }) => {
			state.error = payload?.error ? payload?.error : payload;
			state.is = payload?.id;
			state.status = payload?.status;
		},
		getErrorText: (state, { payload }) => {
			state.errorText = payload;
		},
		clearErrors: state => {
			state.error = null;
			state.errorText = "";
			state.status = null;
		},
	},
});

let initialState2 = {
	msg: null,
};

export const successSlice = createSlice({
	name: "success",
	initialState: initialState2,
	reducers: {
		setSuccess: (state, { payload }) => {
			state.msg = payload;
		},
		restoreMsg: state => {
			state.msg = "";
		},
	},
});

export const { setSuccess, restoreMsg } = successSlice.actions;
export const { returnErrors, getErrorText, clearErrors } = errorSlice.actions;
