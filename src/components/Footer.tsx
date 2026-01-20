import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  Heart,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 24, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden py-12 border-t border-border
                 bg-gradient-to-b from-background to-background/95"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute footer-particle w-6 h-6 rounded-full bg-primary/30 blur-xl"
          style={{
            left: `${15 + i * 20}%`,
            bottom: `${20 + (i % 2) * 20}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 footer-content">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-xl font-light tracking-widest hover:opacity-80 transition"
          >
            <span className="text-gradient font-semibold">J</span>
            <span className="text-foreground">oão</span>
            <span className="text-gradient font-semibold">V</span>
            <span className="text-foreground">ictor</span>
          </button>

          {/* Navigation */}
          <nav className="flex gap-6 mt-2">
            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-xs font-light text-muted-foreground transition
                           hover:text-foreground
                           after:absolute after:left-0 after:-bottom-0.5
                           after:h-px after:w-0 after:bg-primary after:transition-all
                           hover:after:w-full"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex gap-3 mt-4">
            {[
              { href: 'https://github.com/JVictorLA', icon: <GithubLogo size={16} /> },
              {
                href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-lima-de-almeida-b0b56a321',
                icon: <LinkedinLogo size={16} />,
              },
              {
                href: 'https://www.instagram.com/_jvking.la77/',
                icon: <InstagramLogo size={16} />,
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full
                           border border-border text-muted-foreground
                           hover:text-primary hover:border-primary
                           transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-border/40 text-center">
          <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            © 2025 João Victor • Made with
            <Heart size={10} weight="fill" className="text-primary animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
