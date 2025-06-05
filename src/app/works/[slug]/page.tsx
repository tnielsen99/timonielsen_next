"use client";

import { useEffect } from "react";

// Force dynamic rendering to avoid SSR issues with animations
export const dynamic = 'force-dynamic';
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";

export default function WorkDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  useEffect(() => {
    // Initialize animations
  }, []);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div data-scroll-container>
      <main
        className="sb-js"
        data-barba="container"
        data-barba-namespace="serious-business"
      >
        <div className="horizontal">
          <div className="horizontal__inner">
            <div className="sec">
              <section className="container sb-hero">
                <div data-splitting className="sb-hero__title">
                  <div className="title-mask">
                    <span className="font-sec">{project.title.split(" ")[0]}</span>
                  </div>
                  <div className="title-mask">
                    <span>{project.title.split(" ").slice(1).join(" ")}</span>
                  </div>
                </div>
                <div className="sb-hero__sub">{project.subtitle}</div>
                <div className="sb-hero__year">({project.year})</div>
              </section>
            </div>
            <div className="sec">
              <section className="container project-paragraph1">
                <div className="project-paragraph__wrap">
                  <p>
                    <span>•</span> {project.mainParagraph.split(".")[0]}.
                  </p>
                  <br />
                  <p>{project.mainParagraph.split(".").slice(1).join(".")}</p>
                </div>
              </section>
            </div>
            <div className="sec">
              <section className="container project-features">
                <h3>Key Features</h3>
                <ul className="project-features__list">
                  {project.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </section>
            </div>
            {project.images.gallery.map((image, index) => (
              <div key={index} className="sec">
                <section
                  className="container sb-image"
                  style={{ "--aspect-ratio": index === 0 ? "16/9" : index === 1 ? "3/2" : "1/1" } as React.CSSProperties}
                >
                  <Image
                    className="lazyload"
                    src={image}
                    alt={`${project.title} - View ${index + 1}`}
                    width={1200}
                    height={800}
                  />
                </section>
              </div>
            ))}
            <div className="sec">
              <section className="container project-paragraph">
                <h3>Technical Implementation</h3>
                <div className="project-paragraph__wrap">
                  <p>{project.technicalImplementation}</p>
                </div>
              </section>
            </div>
            <div className="sec">
              <section className="container project-paragraph">
                <h3>Impact & Results</h3>
                <div className="project-paragraph__wrap">
                  <p>{project.impact}</p>
                </div>
              </section>
            </div>
            <div className="sec">
              <section className="container project-cta">
                <div className="project-cta__inner">
                  <Link
                    href="/works"
                    className="project-cta__close menu-hover"
                    data-menu="back-to-works"
                  >
                    <Image
                      src="/images/close-icon.png"
                      alt="close icon"
                      className="project-cta__icon"
                      width={24}
                      height={24}
                    />
                    <span className="font-sec">Close</span>
                  </Link>
                  {project.nextProject && (
                    <Link
                      href={`/works/${project.nextProject}`}
                      className="project-cta__next menu-hover"
                      data-menu="next-project"
                    >
                      <span>Next</span>
                      <span className="font-sec">Project</span>
                    </Link>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}