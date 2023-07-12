import axios from "axios";

export const SetAuthToken = token => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
		axios.defaults.headers.common["frontend-source"] = "web user";
	} else {
		delete axios.defaults.headers.common["Authorization"];
		delete axios.defaults.headers.common["frontend-source"];
	}
};

export const useURL = process.env.REACT_APP_BASE_URL;
// export const useURL =
// 	process.env.NODE_ENV === "development"
// 		? "http://localhost:6905"
// 		: process.env.REACT_APP_BASE_URL;

export const SetDefaultHeaders = () => {
	axios.defaults.baseURL = useURL;
};
