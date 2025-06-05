"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Force dynamic rendering to avoid SSR issues with animations
export const dynamic = 'force-dynamic';

const workSlides = [
  {
    period: "2023 - 2024",
    totalProjects: 2,
    projects: [
      {
        slug: "analytics-dashboard",
        title: "Analytics Dashboard",
        image: "/images/playground-1.png",
        dataContent: "analytics-dashboard",
      },
      {
        slug: "engine-ml",
        title: "Engine ML",
        image: "/images/matvoyce.png",
        dataContent: "engine-ml",
      },
    ],
  },
  {
    period: "2021 - 2022",
    totalProjects: 2,
    projects: [
      {
        slug: "data-governance",
        title: "Data Governance",
        image: "/images/ascon-system.jpg",
        dataContent: "data-governance",
      },
      {
        slug: "azure-migration",
        title: "Azure Migration",
        image: "/images/mathijs-1.jpg",
        dataContent: "azure-migration",
      },
    ],
  },
  {
    period: "2020 - 2021",
    totalProjects: 1,
    projects: [
      {
        slug: "powertrain",
        title: "Powertrain",
        image: "/images/project-8.jpg",
        dataContent: "powertrain",
      },
    ],
  },
  {
    period: "2013 - 2014",
    totalProjects: 1,
    projects: [
      {
        slug: "turbocharger",
        title: "Turbocharger",
        image: "/images/project-13.jpg",
        dataContent: "turbocharger",
      },
    ],
  },
];

export default function WorksPage() {
  useEffect(() => {
    // Initialize animations and slider
  }, []);

  return (
    <div data-scroll-container>
      <main data-barba="container" data-barba-namespace="works">
        <section className="content" data-scroll-section>
          <div className="container content__wrap">
            <div className="content__inner">
              <div className="content__item" data-splitting>
                <p>
                  engineering & data science <br />
                  solutions since 2013
                </p>
              </div>
              <div className="content__item hide-on-desktop" data-splitting>
                <p>
                  Scroll down <br />
                  for more
                </p>
                <Image src="/images/arrow-down.svg" alt="" width={24} height={24} />
              </div>
              <div className="content__title">
                <h1 className="content__title-h1 content__title-active">
                  <span data-splitting>
                    <span className="font-sec"> My </span>Projects
                  </span>
                </h1>
                <h3 className="content__title-data" id="analytics-dashboard">
                  <span>
                    <span className="font-sec">Performance</span> Analytics
                  </span>
                </h3>
                <h3 className="content__title-data" id="engine-ml">
                  <span>
                    <span className="font-sec">Engine</span> ML
                  </span>
                </h3>
                <h3 className="content__title-data" id="data-governance">
                  <span>
                    <span className="font-sec">Data</span> Governance
                  </span>
                </h3>
                <h3 className="content__title-data" id="azure-migration">
                  <span>
                    <span className="font-sec">Azure</span> Migration
                  </span>
                </h3>
                <h3 className="content__title-data" id="powertrain">
                  <span>
                    <span className="font-sec">Powertrain</span> Analytics
                  </span>
                </h3>
                <h3 className="content__title-data" id="turbocharger">
                  <span>
                    <span className="font-sec">Turbocharger</span> Design
                  </span>
                </h3>
              </div>
              <div className="content__item" data-splitting>
                <p>
                  hold and drag <br />
                  to discover
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="slider js-slider" data-scroll-section>
          <div className="slider__inner js-slider__inner">
            {workSlides.map((slide, slideIndex) => (
              <div key={slideIndex} className="slide js-slide">
                <div className="slide__version">
                  <div className="slide__version-time">
                    <span>
                      {slide.period.split(" - ")[0]}{" "}
                      <span className="slide__version-font">-</span>{" "}
                      {slide.period.split(" - ")[1]}
                    </span>
                  </div>
                  <div className="slide__version-total">
                    {slide.totalProjects} project{slide.totalProjects > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="slide__list">
                  {slide.projects.map((project, projectIndex) => (
                    <Link
                      key={projectIndex}
                      href={`/works/${project.slug}`}
                      className="slide__bg"
                    >
                      <div className="slide__image">
                        <div className="slide__mask2"></div>
                        <div className="slide__mask"></div>
                        <Image
                          data-content={project.dataContent}
                          className="filter-normal"
                          src={project.image}
                          alt={project.title}
                          width={800}
                          height={600}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}