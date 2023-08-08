import { motion } from "framer-motion";
import { useState } from "react";

const OptionButton = ({ handleOption, children }) => {
  const [shadow, setShadow] = useState(false);
  const baordChildOne = {
    show: {
      rotate: [-3, 0, 3],
      transition: {
        duration: 0.8,
      },
    },
  };
  const baordChildTwo = {
    show: {
      rotate: [3, 0, -3],
      scale: 1,
      transition: {
        yoyo: 10,
        duration: 0.8,
      },
    },
  };
  return (
    <motion.button
      className="h-14 border relative border-white text-white w-40 text-2xl flex flex-col items-center hover:border-transparent"
      style={{ fontFamily: "ageer" }}
      onClick={handleOption}
      whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
      whileTap={{scaleX: 2}}
      transition={{ duration: 0.5 }}
      onMouseEnter={setShadow(true)}
      onMouseLeave={setShadow(false)}
    >
      {shadow && (
        <motion.div
          className="absolute inset-0 bg-secondary opacity-40 z-50"
          variants={baordChildOne}
          animate="show"
        />
      )}
      {shadow && (
        <motion.div
          className="absolute inset-0 bg-secondary opacity-40"
          variants={baordChildTwo}
          animate="show"
        />
      )}
      {children}
    </motion.button>
  );
};

export default OptionButton;
