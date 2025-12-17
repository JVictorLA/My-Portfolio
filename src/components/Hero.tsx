import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import Lanyard from './Lanyard';
import ErrorBoundary from './ErrorBoundary';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Headline animation
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // CTA animation
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Spline fade in
    tl.fromTo(
      splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Floating orbs */}
      <div className="hero-orb glow-orb w-96 h-96 -top-40 -left-40" />
      <div className="hero-orb glow-orb w-64 h-64 top-1/3 left-1/4 opacity-50" />
      <div className="hero-orb glow-orb w-48 h-48 bottom-20 left-10 opacity-30" />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Welcome to my portfolio
            </p>
            <h1
              ref={headlineRef}
              className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight mb-6"
            >
              Hi, I'm{' '}
              <span className="text-gradient font-medium">Milad</span>
              <br />
              <span className="text-muted-foreground">Web Developer</span>
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

          {/* Right - Lanyard 3D */}
          <div
            ref={splineRef}
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Loading...
                  </div>
                }
              >
                <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} />
              </Suspense>
            </ErrorBoundary>
            {/* Gradient overlay for blending */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-transparent to-background/50 lg:to-background" />
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
