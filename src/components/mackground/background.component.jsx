import { AnimatePresence, motion } from "framer-motion";

import "./background.style.css";
const Background = ({ children, image }) => {
  const container = {
    hidden: { x: "200vw" },
    show: {
      x: 0,
      transition: { delay: 0.5, duration: 2, when: "beforeChildren" },
    },
    exit: { opacity: 0, transition: { ease: "easeInOut", duration: 2 } },
  };
  return (
    <div className="h-screen relative overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="absolute inset-0 appBackground"
          style={{
            background: `url(${image}) no-repeat center center`,
            backgroundSize: "auto 100%",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Background;
