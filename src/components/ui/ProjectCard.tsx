"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  slug: string;
  dataAttributes?: Record<string, string>;
}

export default function ProjectCard({
  title,
  category,
  year,
  imageSrc,
  slug,
  dataAttributes = {},
}: ProjectCardProps) {
  return (
    <Link href={`/works/${slug}`} className="project-card" {...dataAttributes}>
      <div className="project-card__image">
        <Image
          src={imageSrc}
          alt={title}
          width={800}
          height={600}
          className="lazyload"
        />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <div className="project-card__meta">
          <span className="project-card__category">{category}</span>
          <span className="project-card__year">{year}</span>
        </div>
      </div>
    </Link>
  );
}