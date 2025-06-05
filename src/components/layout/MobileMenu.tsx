"use client";

import React from "react";
import Link from "next/link";

export default function MobileMenu() {
  return (
    <div className="menuMobile">
      <div className="container">
        <div className="menuMobile-wrap">
          <ul className="menuMobile-list">
            <li className="menuMobile-item menu-hover">
              <Link
                href="/works"
                className="menuMobile-link menu__link"
                data-splitting="true"
                data-menu="work"
              >
                <span className="menuMobile-link__wrap">
                  <span className="menuMobile-link__number">01</span>
                  <span className="menuMobile-link__animate">
                    <span className="font-Harmond">W</span>orks
                  </span>
                </span>
              </Link>
            </li>
            <li className="menuMobile-item menu-hover">
              <Link
                href="/about"
                className="menuMobile-link menu__link"
                data-splitting="true"
                data-menu="about"
              >
                <span className="menuMobile-link__wrap">
                  <span className="menuMobile-link__number">02</span>
                  <span className="menuMobile-link__animate">
                    <span className="font-Harmond">A</span>bout
                  </span>
                </span>
              </Link>
            </li>
            <li className="menuMobile-item menu-hover">
              <Link
                href="/playground"
                className="menuMobile-link menu__link"
                data-splitting="true"
                data-menu="playground"
              >
                <span className="menuMobile-link__wrap">
                  <span className="menuMobile-link__number">03</span>
                  <span className="menuMobile-link__animate">
                    <span className="font-Harmond">P</span>layground
                  </span>
                </span>
              </Link>
            </li>
            <li className="menuMobile-item menu-hover">
              <Link
                href="/contact"
                className="menuMobile-link menu__link"
                data-splitting="true"
                data-menu="contact"
              >
                <span className="menuMobile-link__wrap">
                  <span className="menuMobile-link__number">04</span>
                  <span className="menuMobile-link__animate">
                    <span className="font-Harmond">C</span>ontact
                  </span>
                </span>
              </Link>
            </li>
          </ul>
          <div className="menuMobile-credit">
            <div className="menuMobile-credit__inner">
              <div className="menuMobile-col1">
                <p className="menuMobile-text">CREDIT</p>
              </div>
              <div className="menuMobile-col1">
                <div className="menuMobile-type">
                  <p className="menuMobile-grey">Development</p>
                  <p className="menuMobile-text">Timo Nielsen</p>
                </div>
                <div className="menuMobile-type">
                  <p className="menuMobile-grey">Illustration</p>
                  <p className="menuMobile-text">UI8</p>
                </div>
              </div>
              <div className="menuMobile-col1">
                <div className="menuMobile-type">
                  <p className="menuMobile-grey">Type</p>
                  <p className="menuMobile-text">Displaay</p>
                </div>
                <div className="menuMobile-type">
                  <p className="menuMobile-grey">Animation</p>
                  <p className="menuMobile-text">C+ Team</p>
                </div>
              </div>
            </div>
          </div>

          <div className="menuMobile-footer">
            <p className="menuMobile-footer__text">
              Engineering data-driven solutions.
            </p>
            &nbsp;
            <p className="menuMobile-footer__text">
              From Milton Keynes with passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}