"use client";

import { motion } from "framer-motion";
import { FlipWords } from "../ui/flip-words";

interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  beforeText: string;
  words: string[];
  afterText: string;
  video: string;
}

export default function ProustBlock(props: Props) {
  return (
    <div className="w-complete sm:w-complete-sm mx-auto mt-8 sm:mt-16">
      <motion.div className="text-3xl sm:text-5xl font-regular transition-none" initial={{ opacity: 0, y: 10, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0, duration: 0.2 }}>
        <h1 className="text-2xl sm:text-5xl font-regular">
          {props.beforeText} <br className="sm:hidden" />
          <FlipWords words={props.words} className="font-bold text-color1" />
          <br />
          {props.afterText}
        </h1>
      </motion.div>
      <motion.video
        className="w-full mt-6 rounded-xl shadow-2xl transition-none"
        src={props.video}
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 0.2 }}
      />
    </div>
  );
}
