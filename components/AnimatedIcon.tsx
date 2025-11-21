"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export default function AnimatedIcon({ icon: Icon, className = "", delay = 0 }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={className}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
}

