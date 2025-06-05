"use client";

import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  showDot?: boolean;
  dotColor?: "white" | "black";
}

export default function SectionTitle({
  children,
  className = "",
  showDot = false,
  dotColor = "black",
}: SectionTitleProps) {
  return (
    <h3 className={`section-title ${className}`}>
      {showDot && <span className={`dot dot-${dotColor}`}></span>}
      {children}
    </h3>
  );
}