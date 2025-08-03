"use client";
import { motion } from "motion/react";

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export default function FadeInSection({
  children,
  delay = 0,
  className = "",
  id = "",
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      id={id}
    >
      {children}
    </motion.div>
  );
}
