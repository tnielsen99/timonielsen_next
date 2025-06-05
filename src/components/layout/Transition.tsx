"use client";

import React from "react";
import AnimatedText from "@/components/ui/AnimatedText";

const transitionItems = [
  { id: "home", text: "Home", letter: "H" },
  { id: "work", text: "Works", letter: "W" },
  { id: "about", text: "About", letter: "A" },
  { id: "playground", text: "Playground", letter: "P" },
  { id: "contact", text: "Contact", letter: "C" },
  { id: "back-to-works", text: "Leave", letter: "L" },
  { id: "next-project", text: "Next project", letter: "N" },
];

export default function Transition() {
  return (
    <div className="transition">
      <div className="transition-group">
        {transitionItems.map((item, index) => (
          <span
            key={item.id}
            data-splitting
            className={`transition-item ${index === 0 ? "active" : ""}`}
            id={item.id}
          >
            <div className="transition-item__inner">
              <span className="font-Harmond">{item.letter}</span>
              {item.text.substring(1)}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
}