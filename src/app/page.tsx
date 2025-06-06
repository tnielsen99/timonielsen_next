"use client";

// Force dynamic rendering to avoid SSR issues with animations
export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import Image from "next/image";
import { useGSAPAnimations, useLocomotiveScroll } from "@/hooks";
import { GSAPText, LottiePlayer } from "@/components/animations";

export default function HomePage() {
  const { scroll } = useLocomotiveScroll();
  const { triggerAnimations } = useGSAPAnimations({
    page: 'home',
    delay: 0.7,
    enableScrollTrigger: true,
    locomotiveScroll: scroll,
  });

  return (
    <div data-scroll-container className="home-prefix">
      <main data-barba="container" data-barba-namespace="home">
        <div data-scroll-section>
          <div className="container">
            <div className="wrapper">
              <section className="hello">
                <div className="hello-wrap">
                  <div className="hello-flex">
                    <GSAPText
                      as="h1"
                      className="hello-title"
                      splitBy="chars"
                      animationType="slideUp"
                      delay={0.7}
                      stagger={0.38}
                    >
                      <span className="font-sec"> Timo </span>
                      <span>Nielsen</span>
                    </GSAPText>
                    <GSAPText
                      as="p"
                      className="hello-sub"
                      splitBy="chars"
                      animationType="slideUp"
                      delay={1.5}
                    >
                      <span>(TN)</span>
                    </GSAPText>
                  </div>
                </div>
              </section>
              <section className="person">
                <div className="person-wrap">
                  <div className="person-col2">
                    <Image
                      src="/images/Shapes.svg"
                      alt=""
                      className="person-circle"
                      width={100}
                      height={100}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <div className="person-text">
                      Timo Nielsen is a Data Scientist & Engineer at McLaren
                      Automotive in Milton Keynes, UK
                    </div>
                  </div>
                  <div className="person-col4">
                    <LottiePlayer
                      id="lottie-home__clone"
                      src="/images/Animate/HomeLoop.json"
                      className="person-lottie"
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                  <div className="person-col2">
                    <Image
                      src="/images/Shapes.svg"
                      alt=""
                      className="person-circle"
                      width={100}
                      height={100}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <div className="person-text">
                      specializing in machine learning, data analytics, and
                      engineering solutions for automotive performance.
                    </div>
                  </div>
                </div>
              </section>
              <footer className="footer footer-clone">
                <div className="container">
                  <div className="footer-flex">
                    <p className="footer-content">
                      Engineering data-driven solutions.
                    </p>
                    &nbsp;
                    <p className="footer-content">
                      From Milton Keynes with passion.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}