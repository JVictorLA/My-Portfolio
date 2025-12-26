import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart, InstagramLogo } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );

      // Floating particles animation
      gsap.to('.footer-particle', {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative py-16 overflow-hidden border-t border-border">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="footer-particle glow-orb w-8 h-8 opacity-30"
          style={{
            left: `${10 + i * 15}%`,
            bottom: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 footer-content">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <button onClick={scrollToTop} className="text-2xl font-light tracking-wider">
            <span className="text-gradient font-semibold">J</span>
            <span className="text-foreground">oão</span>
            <span className="text-gradient font-semibold">V</span>
            <span className="text-foreground">ictor</span>
          </button>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground text-sm font-light transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/JVictorLA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubLogo size={20} weight="light" />
            </a>
            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-victor-lima-de-almeida-b0b56a321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkedinLogo size={20} weight="light" />
            </a>
            <a
              href="https://www.instagram.com/_jvking.la77/?next=%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <InstagramLogo size={20} weight="light" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm font-light flex items-center justify-center gap-2">
            © 2025 Made with{' '}
            <Heart size={16} weight="fill" className="text-primary animate-pulse" />{' '}
            by <span className="text-gradient">João Victor</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
