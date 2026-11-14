import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} // Starting state (invisible, slightly down)
      animate={{ opacity: 1, y: 0 }}  // Enter state (fully visible, normal position)
      exit={{ opacity: 0, y: -15 }}   // Exit state (invisible, slightly up)
      transition={{ duration: 0.3, ease: 'easeOut' }} // Speed and easing
    >
      {children}
    </motion.div>
  );
};