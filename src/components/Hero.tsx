'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextType from './TextType';
import ProfileCard from './ProfileCard';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

    return () => tl.kill();
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
              Bem vindo ao meu portfólio
            </p>

            <h1 ref={headlineRef} className="mb-6">
              <span className="block text-base md:text-lg lg:text-7xl font-light text-muted-foreground whitespace-nowrap">
                Olá, me chamo
              </span>

              <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-gradient whitespace-nowrap">
                João Victor
              </span>

              <span className="block mt-4 text-muted-foreground text-xl md:text-2xl">
                <TextType
                  text={[
                    'Web Developer',
                    'Frontend Developer',
                    'UI Engineer',
                    'React Specialist',
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor
                  cursorCharacter="|" variableSpeed={undefined} onSentenceComplete={undefined}                />
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-muted-foreground text-lg md:text-xl font-light max-w-lg mx-auto lg:mx-0 mb-10"
            >
              Criando experiências digitais que inspiram e envolvem por meio de design inovador e tecnologia de ponta.
            </p>

            {/* ===== MOBILE STACK ===== */}
<div className="lg:hidden flex flex-col items-center gap-6">

{/* ===== ProfileCard MOBILE ===== */}
<div className="lg:hidden w-full mb-8">
  <div className="mx-auto w-[320px]">
    <ProfileCard
      name="João Victor"
      title="Frontend Developer"
      handle="JVictorLA"
      status="Online"
      contactText="Contact Me"
      avatarUrl="https://res.cloudinary.com/dapypkcbb/image/upload/v1768933727/profile_muojwo.png"
      showUserInfo
      enableTilt
      behindGlowEnabled
      behindGlowColor="rgba(125, 190, 255, 0.67)"
      customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
    />
  </div>
</div>

  {/* Scroll indicator MOBILE */}
  <div className="flex flex-col items-center gap-2 opacity-80">
    <span className="text-muted-foreground text-xs tracking-widest uppercase">
      Scroll
    </span>
    <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
      <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
    </div>
  </div>

  {/* CTA */}
  <button
    ref={ctaRef}
    onClick={scrollToContact}
    className="btn-glow animate-glow-pulse"
  >
    contrate-me
  </button>

</div>
          </div>

          {/* RIGHT — PC */}
          <div className="hidden lg:flex justify-end">
            <div className="w-[380px]">
              <ProfileCard
                name="João Victor"
                title="Frontend Developer"
                handle="JVictorLA"
                status="Online"
                contactText="Contact Me"
                avatarUrl="src/assets/profile.png"
                showUserInfo
                enableTilt
                behindGlowEnabled
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator — PC */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
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
