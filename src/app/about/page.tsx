"use client";

// Force dynamic rendering to avoid SSR issues with animations
export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import Image from "next/image";
import { useGSAPAnimations, useLocomotiveScroll } from "@/hooks";
import { GSAPText, ScrollTriggerSection, LottiePlayer } from "@/components/animations";

export default function AboutPage() {
  const { scroll } = useLocomotiveScroll();
  
  const { triggerAnimations } = useGSAPAnimations({
    page: 'about',
    delay: 0.85,
    enableScrollTrigger: true,
    locomotiveScroll: scroll,
  });

  return (
    <div data-scroll-container>
      <main
        className="normal-scroll trigger"
        data-barba="container"
        data-barba-namespace="about"
        id="site-main"
      >
        <div data-scroll-section>
          <section className="about sec-animate">
            <div className="container">
              <GSAPText
                as="h3"
                className="about-title"
                splitBy="words"
                animationType="slideUp"
                delay={0.85}
                triggerOnVisible={true}
              >
                <span className="dot dot-white"></span>
                With over 10 years of experience, I'm currently based in Milton
                Keynes, working as a Senior Data Analyst and Software Engineer
                at McLaren Automotive.
              </GSAPText>
              <div className="about-image">
                <div className="about-mask img1">
                  <Image
                    width={1216}
                    height={1555}
                    src="/images/about_hero_1.jpg"
                    alt=""
                    className="lazyload loading"
                  />
                </div>
                <div className="about-mask img2">
                  <Image
                    width={1216}
                    height={1555}
                    src="/images/about_hero_2.jpg"
                    alt=""
                    className="lazyload loading"
                  />
                </div>
              </div>
              <div className="about-hobby">
                Passionate about transforming
                <span className="font-sec"> complex data </span>
                into
                <span className="font-sec">actionable insights,</span>
                <span className="font-sec">machine learning models,</span>
                and <span className="font-sec">engineering solutions</span>
                that drive automotive performance.
              </div>
              <div className="about-text">This is me, doing my daily things</div>
            </div>
          </section>
        </div>

        <div data-scroll-section>
          <section className="about-full sec-animate hobby">
            <div className="container">
              <div className="hobby-flex">
                <div className="hobby-image">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="hobby-image__item">
                      <Image
                        className="lazyload is-loading"
                        width={783}
                        height={1080}
                        src={`/images/hobby-image-${num}.jpg`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
                <div className="hobby-list">
                  <h3 className="hobby-content">
                    <span className="hobby-hover active">
                      <span>Python Expert</span>
                      <svg
                        className="hobby-svg hobby-m"
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5 0C8.28 0 0 8.28 0 18.5S8.28 37 18.5 37 37 28.72 37 18.5 28.72 0 18.5 0zm-7.4 27.75h-3.7v-3.7h3.7v3.7zm0-7.4h-3.7v-3.7h3.7v3.7zm7.4 7.4h-3.7v-3.7h3.7v3.7zm0-7.4h-3.7v-3.7h3.7v3.7zm0-7.4h-3.7v-3.7h3.7v3.7zm7.4 14.8h-3.7v-3.7h3.7v3.7zm0-7.4h-3.7v-3.7h3.7v3.7zm0-7.4h-3.7v-3.7h3.7v3.7z"
                          fill="#878787"
                        />
                      </svg>
                    </span>
                    <span>with advanced libraries,</span>
                  </h3>
                  <h3 className="hobby-content">
                    <span className="hobby-hover">
                      <svg
                        className="hobby-svg"
                        width="37"
                        height="37"
                        viewBox="0 0 37 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5 3.7L11.1 0v14.8L18.5 18.5l7.4-3.7V0L18.5 3.7zm0 29.6l7.4 3.7V22.2l-7.4-3.7-7.4 3.7v14.8l7.4-3.7z"
                          fill="#878787"
                        />
                      </svg>
                      <span className="hobby-m">Machine Learning</span>
                    </span>
                    <span>specialist,</span>
                  </h3>
                  <h3 className="hobby-content">
                    expert in
                    <span className="hobby-hover hobby-m">
                      <span className="hobby-mr">Data Analytics</span>
                      <svg
                        className="hobby-svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 36V16h8v20H4zm12 0V4h8v32h-8zm12 0V24h8v12h-8z"
                          fill="#878787"
                        />
                      </svg>
                    </span>
                    <span>and visualization,</span>
                  </h3>
                  <h3 className="hobby-content">
                    certified in
                    <span className="hobby-hover hobby-m">
                      <svg
                        className="hobby-svg hobby-mr"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 4C11.164 4 4 11.164 4 20s7.164 16 16 16 16-7.164 16-16S28.836 4 20 4zm0 6c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm8 16c0 1.105-.895 2-2 2H14c-1.105 0-2-.895-2-2v-2c0-1.105.895-2 2-2h.5v-4h-.5c-1.105 0-2-.895-2-2v-2c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v8h2c1.105 0 2 .895 2 2v2z"
                          fill="#878787"
                        />
                      </svg>
                      <span>Azure Cloud</span>
                    </span>
                    <span>solutions,</span>
                  </h3>
                  <h3 className="hobby-content">
                    <span className="hobby-hover hobby-m">
                      <svg
                        className="hobby-svg hobby-mr"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 4l-2.5 5.7L11 11l5 4.8-1.2 6.2L20 19l5.2 3 -1.2-6.2L29 11l-6.5-1.3L20 4zm0 24c-5.5 0-10 4.5-10 10h20c0-5.5-4.5-10-10-10z"
                          fill="#878787"
                        />
                      </svg>
                      <span>Engineering Solutions</span>
                    </span>
                    <span>architect and</span>
                  </h3>
                  <h3 className="hobby-content">
                    10+ years in
                    <span className="hobby-hover hobby-m">
                      <span className="hobby-mr">Automotive</span>
                      <svg
                        className="hobby-svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32 12H28l-2-4H14l-2 4H8c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4zM10 28c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm20 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm2-8H8v-4h24v4z"
                          fill="#878787"
                        />
                      </svg>
                    </span>
                    <span>industry.</span>
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div data-scroll-section id="section-sticky">
          <section className="sec-animate process parallax-section">
            <div className="container">
              <div className="process-flex">
                <div
                  className="process-fixed"
                  data-scroll
                  data-scroll-sticky
                  data-scroll-target="#section-sticky"
                >
                  <div className="process-inner">
                    <GSAPText
                      as="h3"
                      className="process-title"
                      splitBy="words"
                      animationType="slideUp"
                      triggerOnVisible={true}
                    >
                      <span className="dot"></span>
                      Data analysis, machine learning model development,
                      statistical modeling, database design, cloud architecture,
                      Python development, performance optimization, business
                      intelligence.
                    </GSAPText>
                    <LottiePlayer
                      id="lottie-about"
                      src="/images/Animate/1.json"
                      className="process-lottie"
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </div>
                <div className="process-list">
                  <div className="process-list__item">
                    <div className="process-list__title">
                      <span>(a)</span>
                    </div>
                    <div className="process-list__text">
                      <div className="process-list__title">
                        <span>Direction</span>
                      </div>
                      <div className="process-list__desc">
                        In my opinion, deep understanding of the brief and
                        client is a must in the starting point. Determining
                        project goals and functional specifications, knowing
                        competitors and target audiences, making researches will
                        be taken at this stage in order to find a precise
                        combination between Typography, Color, Composition,
                        Motion and brand assets. For me, this process is the
                        foundation for solving business problems and discovering
                        a right direction for the perfect design.
                      </div>
                    </div>
                  </div>
                  <div className="process-list__item">
                    <div className="process-list__title">
                      <span>(b)</span>
                    </div>
                    <div className="process-list__text">
                      <div className="process-list__title">
                        <span>Design</span>
                      </div>
                      <div className="process-list__desc">
                        After collecting a right mood and tone in the Direction
                        stage. My mission at this point is connecting the dots
                        and making various versions to find the proper design.
                        My goal is always about creating an exprience that not
                        only emphasises the characteristics of each project but
                        also elegant and satisfied to use. To get that, I have
                        to make sure to work closely with clients and users to
                        get helpful feedbacks and insights for the evolution.
                      </div>
                    </div>
                  </div>
                  <div className="process-list__item">
                    <div className="process-list__title">
                      <span>(c)</span>
                    </div>
                    <div className="process-list__text">
                      <div className="process-list__title">
                        <span>Implementation</span>
                      </div>
                      <div className="process-list__desc">
                        Motion and interaction always play a vital role in my
                        works. I belive both are the key elements that help to
                        bring satisfaction to the audiences the best possible
                        way. A small subtle motion or microinteraction can push
                        the experience to a whole new level effortlessly. I love
                        seeing people get "wow" and keep toying with those
                        interactions. That's the reason why I often spend a lot
                        of time and effort for this stage on each project.
                      </div>
                    </div>
                  </div>
                  <div className="process-list__item">
                    <div className="process-list__title">
                      <span>(d)</span>
                    </div>
                    <div className="process-list__text">
                      <div className="process-list__title">
                        <span>Optimization</span>
                      </div>
                      <div className="process-list__desc">
                        Performance tuning and continuous improvement are
                        essential for long-term success. I establish feedback
                        loops to monitor model performance in production,
                        implementing A/B testing and experimentation frameworks.
                        Regular model retraining, hyperparameter optimization,
                        and architectural improvements ensure solutions evolve
                        with changing business needs. Through comprehensive
                        documentation and knowledge transfer, I enable teams to
                        maintain and enhance solutions independently.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>


        <div data-scroll-section>
          <section className="award-full sec-animate">
            <div className="container">
              <div className="award">
                <div className="award-title">
                  <span className="dot"></span>
                  <GSAPText
                    as="h3"
                    splitBy="words"
                    animationType="slideUp"
                    triggerOnVisible={true}
                  >
                    My academic and professional achievements reflect a
                    commitment to continuous learning and excellence in data
                    science and engineering. Each certification and degree has
                    enhanced my ability to deliver innovative solutions in the
                    automotive industry.
                  </GSAPText>
                </div>
                <div className="award-table">
                  <div className="award-item">
                    <div className="award-item__line"></div>
                    <div className="award-item__content">
                      <div className="award-item__text">
                        Corndel Data Analytics
                      </div>
                      <div className="award-item__text award-item__title">
                        Distinction
                      </div>
                      <div className="award-item__text">2023</div>
                    </div>
                    <div className="award-item__line"></div>
                  </div>
                  <div className="award-item">
                    <div className="award-item__line"></div>
                    <div className="award-item__content">
                      <div className="award-item__text">Machine Learning</div>
                      <div className="award-item__text award-item__title">
                        Certifications
                      </div>
                      <div className="award-item__text">2020</div>
                    </div>
                    <div className="award-item__line"></div>
                  </div>
                  <div className="award-item">
                    <div className="award-item__line"></div>
                    <div className="award-item__content">
                      <div className="award-item__text">
                        Python Financial Analysis
                      </div>
                      <div className="award-item__text award-item__title">
                        Professional Certificate
                      </div>
                      <div className="award-item__text">2020</div>
                    </div>
                    <div className="award-item__line"></div>
                  </div>
                  <div className="award-item">
                    <div className="award-item__line"></div>
                    <div className="award-item__content">
                      <div className="award-item__text">
                        Masters in Racing Engine Design
                      </div>
                      <div className="award-item__text award-item__title">
                        Oxford Brookes University
                      </div>
                      <div className="award-item__text">2013</div>
                    </div>
                    <div className="award-item__line"></div>
                  </div>
                </div>
                <div className="award-bottom">
                  <div className="award-another award-text">
                    Additional certifications in Python, SQL, Azure Data
                    Engineering, and various machine learning frameworks.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div data-scroll-section>
          <section className="clients sec-animate">
            <div className="container">
              <div className="clients-wrap">
                <GSAPText
                  as="h1"
                  className="clients-title"
                  splitBy="words"
                  animationType="slideUp"
                  triggerOnVisible={true}
                >
                  Throughout my career, I have had the privilege of working
                  with prestigious organizations in the automotive and
                  technology sectors.
                </GSAPText>
                <ul className="clients-list">
                  <li className="clients-item">McLaren Automotive</li>
                  <li className="clients-item">Lotus Formula 1 Team</li>
                </ul>
              </div>
            </div>
          </section>
        </div>


        <div data-scroll-section>
          <section className="about-full email sec-animate">
            <div className="email-wrap about-full__inner">
              <div className="email-lottie">
                <LottiePlayer
                  id="lottie-email__black"
                  src="/images/Animate/3.json"
                  className="email-lottie__item"
                  loop={true}
                  autoplay={true}
                />
              </div>
              <div className="email-top">
                <p>Let's connect.</p>
                <a href="mailto:contact@timonielsen.com">
                  <span className="font-sec">Get in</span>
                  <span> Touch </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer>
          <div className="about-footer">
            <div className="about-footer__number">
              <div className="about-footer__text">01</div>
              <div className="about-footer__text">-</div>
              <div className="about-footer__animate">
                <span
                  className="about-attr active about-footer__text about-footer__0"
                  id="01"
                >
                  01
                </span>
                <span
                  className="about-attr clone about-footer__text about-footer__1"
                  id="02"
                >
                  02
                </span>
                <span
                  className="about-attr clone about-footer__text about-footer__2"
                  id="03"
                >
                  03
                </span>
                <span
                  className="about-attr clone about-footer__text about-footer__3"
                  id="04"
                >
                  04
                </span>
                <span
                  className="about-attr clone about-footer__text about-footer__4"
                  id="05"
                >
                  05
                </span>
                <span
                  className="about-attr clone about-footer__text about-footer__5"
                  id="06"
                >
                  06
                </span>
              </div>
            </div>
            <p className="about-footer__text">/</p>
            <div className="about-footer__coppyright">
              <span
                className="about-attr active about-text__0 about-footer__text"
                id="something"
              >
                data science
                <br />
                by timo nielsen
              </span>
              <span
                className="about-attr clone about-text__1 about-footer__text"
                id="hobbies"
              >
                technical
                <br />
                skills & expertise
              </span>
              <span
                className="about-attr clone about-text__2 about-footer__text"
                id="process"
              >
                workflow
                <br />
                and process
              </span>
              <span
                className="about-attr clone about-text__3 about-footer__text"
                id="awards"
              >
                education and
                <br />
                certifications
              </span>
              <span
                className="about-attr clone about-text__4 about-footer__text"
                id="clients"
              >
                organizations
                <br />
                I've worked with
              </span>
              <span
                className="about-attr clone about-text__5 about-footer__text"
                id="contact"
              >
                let's
                <br />
                get in touch
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}