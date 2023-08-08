import React, { useState } from "react";
import Background from "../components/mackground/background.component";

// background images
import bg1 from "../assets/bg-1.1.png";
import bg2 from "../assets/bg-2.png";
import { motion, AnimatePresence } from "framer-motion";
import Sound from "../components/sound/sound.component";
import Back from "../components/back/back.component";
import DisplayBoard from "../components/display-board/display-board.component";
import OptionButton from "../components/option-button/option-button.component";

const Home = () => {
  const [stage, setStage] = useState(1);

  const goToNext = (next) => {
    setStage(next);
  };
  return (
    <>
      {stage === 1 && <StageOne handleStage={() => goToNext(2)} />}
      {stage === 2 && <StageTwo handleStage={() => goToNext(3)} />}
      {stage === 3 && <StageTwoSub handleStage={() => goToNext(4)} />}
      {stage === 4 && <StageThree handleStage={() => {}} />}
    </>
  );
};

export default Home;

const StageOne = ({ handleStage }) => {
  return (
    <Background image={bg1}>
      <div className="relative h-full container mx-auto px-4">
        <div className="fixed inset-0 bg-white opacity-60"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10">
          <></>
          {/* <div></div> */}
          <Sound />
          <div>
            <img
              src={require("../assets/traffic-age.png")}
              alt=""
              className="h-96"
            />
            <div className="flex justify-center">
              <motion.button
                className="bg-mainDark py-2 text-white px-8 text-2xl"
                style={{ fontFamily: "ageer" }}
                onClick={handleStage}
                whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                transition={{ duration: 0.5 }}
              >
                Play now
              </motion.button>
            </div>
          </div>
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

const StageTwo = ({ handleStage }) => {
  return (
    <Background image={bg1}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p className="text-5xl" style={{ fontFamily: "ageer" }}>
                Do you work in Lagos
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div className="flex items-center gap-4">
                <button
                  className="bg-white h-14 w-40 text-xl"
                  style={{ fontFamily: "ageer" }}
                  onClick={handleStage}
                >
                  Yes
                </button>
                <motion.button
                  className="h-14 border border-white text-white w-40 text-2xl flex flex-col items-center hover:border-transparent"
                  style={{ fontFamily: "ageer" }}
                  onClick={handleStage}
                  whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                  transition={{ duration: 0.5 }}
                >
                  No
                  <span className="text-xs">I used to work in Lagos</span>
                </motion.button>
                <motion.button
                  className="h-14 border border-white text-white w-40 text-2xl flex flex-col items-center hover:border-transparent"
                  style={{ fontFamily: "ageer" }}
                  onClick={handleStage}
                  whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                  transition={{ duration: 0.5 }}
                >
                  No
                  <span className="text-xs">I plan to work in Lagos</span>
                </motion.button>
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

const StageTwoSub = ({ handleStage }) => {
  setTimeout(() => handleStage(), [10000]);
  const popUp = {
    hidden: { y: 100000 },
    show: {
      y: 1,
      transition: { duration: 2 },
    },
  };
  return (
    <AnimatePresence>
      <Background image={bg1}>
        <div className="relative h-full container mx-auto px-4">
          <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
            <div className="flex items-center justify-between w-full">
              <Back />
              {/* <div></div> */}
              <Sound />
            </div>
            <div className="w-fit md:ml-auto">
              <p className="text-xl" style={{ fontFamily: "ageer" }}>
                Download the LagosRide App
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={require("../assets/playstore.png")}
                  alt=""
                  className="h-10"
                />
                <img
                  src={require("../assets/appstore.png")}
                  alt=""
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <motion.img
            src={require("../assets/oshey.png")}
            alt=""
            className="h-32 fixed bottom-32 left-8"
            variants={popUp}
            initial="hidden"
            animate="show"
          />
        </div>
      </Background>
    </AnimatePresence>
  );
};

const StageThree = ({ handleStage }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
  };
  return (
    <Background image={bg2}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            <div></div>
            <Sound />
          </div>
          <div>
            <DisplayBoard
              question={
                <p className="text-5xl" style={{ fontFamily: "ageer" }}>
                  How long have you worked in Lagos
                  <span className="c font-sans font-black">?</span>
                </p>
              }
              options={
                <div className="flex items-center gap-4 justify-center flex-wrap">
                  <OptionButton />s
                  <motion.button
                    className="h-14 border border-white text-white w-40 text-2xl flex flex-col items-center hover:border-transparent"
                    style={{ fontFamily: "ageer" }}
                    onClick={handleStage}
                    whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                    transition={{ duration: 0.5 }}
                  >
                    No
                    <span className="text-xs">I used to work in Lagos</span>
                  </motion.button>
                </div>
              }
            />
          </div>
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
