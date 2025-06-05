"use client";

import React, { useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  splitType?: "chars" | "words" | "lines";
  dataAttributes?: Record<string, string>;
}

export default function AnimatedText({
  text,
  className = "",
  splitType = "chars",
  dataAttributes = {},
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // This is where you'd integrate with Splitting.js
    // For now, we'll just add the data-splitting attribute
    if (textRef.current) {
      textRef.current.setAttribute("data-splitting", "");
    }
  }, []);

  return (
    <span
      ref={textRef}
      className={`animated-text ${className}`}
      {...dataAttributes}
    >
      {text}
    </span>
  );
}