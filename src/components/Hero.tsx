'use client';

import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import TextType from './TextType';
import ErrorBoundary from './ErrorBoundary';
import HeroScene3D from './HeroScene3D';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    tl.fromTo(
      splineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="light-beam" />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="text-center lg:text-left">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Welcome to my portfolio
            </p>

          <h1
  ref={headlineRef}
  className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight mb-6"
>
  Olá, Me chamo{' '}
  <span className="text-gradient font-medium whitespace-nowrap">
    João Victor
  </span>
  <br />

  <span className="block text-muted-foreground mt-2">
    <TextType
                  text={[
                    'Web Developer',
                    'Frontend Developer',
                    'UI Engineer',
                    'React Specialist',
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|" variableSpeed={undefined} onSentenceComplete={undefined}    />
  </span>
</h1>

            <p
              ref={subtitleRef}
              className="text-muted-foreground text-lg md:text-xl font-light max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Crafting digital experiences that inspire and engage through
              innovative design and cutting-edge technology.
            </p>

            <button
              ref={ctaRef}
              onClick={scrollToContact}
              className="btn-glow animate-glow-pulse"
            >
              Hire Me
            </button>
          </div>

          {/* RIGHT – 3D */}
          <div
            ref={splineRef}
            className="
              relative w-full
              h-[240px]
              sm:h-[300px]
              lg:h-[520px]
              mt-16 lg:mt-0
            "
          >
            <ErrorBoundary>
              <Suspense fallback={null}>
                <HeroScene3D />
              </Suspense>
            </ErrorBoundary>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
