import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';
import gsap from 'gsap';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.mobile-nav',
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-card !rounded-none py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-2xl font-light tracking-wider">
            <span className="text-gradient font-semibold">M</span>
            <span className="text-foreground">C</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="nav-link text-sm font-light tracking-wider"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="hidden md:block btn-glow !py-2 !px-6 text-sm"
          >
            Hire Me
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-foreground p-2"
          >
            <List size={28} weight="light" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="mobile-nav absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border flex flex-col">
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground p-2"
              >
                <X size={28} weight="light" />
              </button>
            </div>
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="mobile-nav-link text-2xl font-light text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="mobile-nav-link btn-glow mt-4 text-center"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
