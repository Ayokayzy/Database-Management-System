import { motion } from "framer-motion";
import { AiTwotoneSound } from "react-icons/ai";

const Sound = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
  };
  return (
    <motion.div
      className="flex items-center gap-2 w-fit"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <span className="w-10 h-10 flex items-center justify-center rounded-md bg-black text-white">
        <AiTwotoneSound size={30} />
      </span>
      <span
        className="text-2xl hidden md:inline-block"
        style={{ fontFamily: "ageer" }}
      >
        Sound On
      </span>
    </motion.div>
  );
};

export default Sound;
