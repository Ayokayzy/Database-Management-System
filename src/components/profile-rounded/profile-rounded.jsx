import React from "react";

const Profilerounded = ({ sm, md, lg, img }) => {
	return (
		<img
			src={img || require("../../assets/pp-3.png")}
			alt=""
			className={`${sm && "h-10 w-10"} ${md && "h-12 w-12"} ${
				lg && "h-14 w-14"
			} rounded-full`}
		/>
	);
};

export default Profilerounded;
