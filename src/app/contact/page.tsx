"use client";

// Force dynamic rendering to avoid SSR issues with animations
export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import Image from "next/image";

export default function ContactPage() {
  useEffect(() => {
    // Initialize animations
  }, []);

  return (
    <div data-scroll-container>
      <main data-barba="container" data-barba-namespace="contact">
        <div data-scroll-section>
          <section className="contact">
            <h1 className="contact-title" data-splitting>
              <span className="font-sec"> Let's Connect </span>
              <br />
              <span>
                Available for data science and engineering consulting,
                collaborations, and opportunities in automotive technology and
                machine learning.
              </span>
            </h1>
          </section>
        </div>
        <footer className="contact-footer container">
          <div className="contact-footer__flex">
            <div className="contact-footer__col">
              <div className="contact-footer__item">
                <p className="contact-footer__title contact-mask contact-footer__mb9">
                  <span className="contact-mask__inner"> Professional </span>
                </p>
                <p className="contact-footer__title contact-mask">
                  <span className="contact-mask__inner"> Location </span>
                </p>
              </div>
            </div>
            <div className="contact-footer__col">
              <div className="contact-footer__item">
                <div className="contact-footer__link contact-footer__mb7">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/timonielsen/"
                    className="contact-mask"
                  >
                    <span className="contact-mask__inner"> LinkedIn </span>
                    <span className="contact-arrow">
                      <Image
                        src="/images/arrow-top-right.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </span>
                    <div className="contact-line"></div>
                  </a>
                </div>
                <div className="contact-footer__link">
                  <span className="contact-mask">
                    <span className="contact-mask__inner">
                      {" "}
                      Milton Keynes, United Kingdom{" "}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="contact-footer__col col-ml-1">
              <div className="contact-footer__item contact-footer__mb">
                <p className="contact-footer__title contact-mask contact-footer__mb9">
                  <span className="contact-mask__inner"> Contact </span>
                </p>
                <p className="contact-footer__title contact-mask">
                  <span className="contact-mask__inner"> Email </span>
                </p>
              </div>
            </div>
            <div className="contact-footer__col">
              <div className="contact-footer__item">
                <div className="contact-footer__link contact-footer__mb7">
                  <span className="contact-mask">
                    <span className="contact-mask__inner">
                      {" "}
                      Available for consulting and collaborations{" "}
                    </span>
                  </span>
                </div>
                <div className="contact-footer__link">
                  <a
                    href="mailto:contact@timonielsen.com"
                    className="contact-mask"
                  >
                    <span className="contact-mask__inner">
                      contact@timonielsen.com
                    </span>
                    <span className="contact-arrow">
                      <Image
                        src="/images/arrow-top-right.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </span>
                    <div className="contact-line"></div>
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-footer__col">
              <div id="lottie-contact"></div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}