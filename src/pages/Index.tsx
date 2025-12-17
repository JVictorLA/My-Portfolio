import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);

    // Animate main content in
    gsap.fromTo(
      '.main-content',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  };

  return (
    <>
      {/* SEO */}
      <title>Milad - Creative Web Developer | Portfolio</title>
      <meta
        name="description"
        content="Hi, I'm Milad - a skilled web developer crafting digital experiences through innovative design and cutting-edge technology. View my portfolio and let's connect."
      />

      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div className={`main-content ${isLoading ? 'opacity-0' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
