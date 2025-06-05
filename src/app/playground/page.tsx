"use client";

import { useEffect } from "react";

// Force dynamic rendering to avoid SSR issues with animations
export const dynamic = 'force-dynamic';
import Image from "next/image";

const playgroundItems = [
  {
    year: "2024",
    name: ["Python ML", "Real-time Data Pipeline"],
    image: "/images/playground-31.png",
  },
  {
    year: "2024",
    name: ["Data Analytics", "Performance Optimization"],
    image: "/images/playground-32.png",
  },
  {
    year: "2024",
    name: ["Statistical Model", "Predictive Maintenance"],
    image: "/images/playground-33.png",
  },
  {
    year: "2024",
    name: ["Cloud Architecture", "Azure Data Engineering"],
    image: "/images/playground-34.png",
  },
  {
    year: "2023",
    name: ["Machine Learning", "Automotive Analytics"],
    image: "/images/playground-28.png",
  },
];

export default function PlaygroundPage() {
  useEffect(() => {
    // Initialize animations
  }, []);

  return (
    <div data-scroll-container>
      <main
        className="normal-scroll"
        data-barba="container"
        data-barba-namespace="play-ground"
      >
        <section className="playground" data-scroll-section>
          <div className="container">
            <h1 className="playground-title">
              <span data-splitting>
                <span className="font-sec">Technical </span>
                <span>Experiments</span>
              </span>
            </h1>
            <p className="playground-sub">
              <span data-splitting>
                Welcome to my technical experiments section - a collection of
                data science projects, engineering prototypes, and analytical
                explorations that showcase my technical skills and
                problem-solving approach.
              </span>
            </p>

            <p className="playground-desc">Scroll for more</p>
            <p className="playground-icon">
              <Image
                src="/images/arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </p>

            <div className="playground-list">
              {playgroundItems.map((item, index) => (
                <div key={index} className="playground-item">
                  <div className="playground-image">
                    <div className="playground-mask"></div>
                    <Image
                      src={item.image}
                      alt=""
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="playground-info">
                    <div className="playground-info__year playground-info__animate">
                      <span> ({item.year}) </span>
                    </div>
                    <div className="playground-info__name">
                      {item.name.map((line, lineIndex) => (
                        <div key={lineIndex}>
                          <span className="playground-info__animate">
                            <span>{line}</span>
                          </span>
                          {lineIndex < item.name.length - 1 && <br />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}