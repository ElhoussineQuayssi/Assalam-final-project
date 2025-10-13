"use client";

import { motion } from "framer-motion";

export default function Signature() {
  return (
    <motion.div
      className="flex justify-center items-center mt-4 text-sm font-medium text-gray-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.span
        className="tracking-wide"
        whileHover={{
          color: "#3882f6", // Blue-500 for professional hover
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        Developed with ❤️ by{" "}
        <motion.span
          className="font-semibold text-blue-600"
          whileHover={{
            color: "#1d4ed8", // Darker blue on hover
            transition: { duration: 0.3 },
          }}
        >
          Quayssi
        </motion.span>
      </motion.span>
    </motion.div>
  );
}
