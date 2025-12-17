import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Atom, Wind, FileJs } from '@phosphor-icons/react';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '3D Interactive Web',
    description: 'Email platform for developers with React, Tailwind & Spline integration.',
    image: project1,
    tags: ['React', 'Tailwind', 'Spline'],
  },
  {
    id: 2,
    title: '3D Gaming UI',
    description: 'Next-level gaming interface with immersive 3D elements and NFT integration.',
    image: project2,
    tags: ['React', 'Three.js', 'GSAP'],
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Creative developer portfolio featuring seamless 3D animations and UI/UX.',
    image: project3,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Modern gaming platform with dynamic visuals and character animations.',
    image: project4,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 5,
    title: 'Animation Tools',
    description: 'Fast & reliable web apps with smooth animations and clean architecture.',
    image: project5,
    tags: ['React', 'GSAP', 'Framer'],
  },
  {
    id: 6,
    title: 'Animated Portfolio',
    description: 'Step-by-step portfolio with creative developer animations and interactions.',
    image: project6,
    tags: ['CSS', 'GSAP', 'JavaScript'],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'react':
        return <Atom size={14} weight="light" />;
      case 'tailwind':
        return <Wind size={14} weight="light" />;
      default:
        return <FileJs size={14} weight="light" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-96 h-96 top-20 -left-48 opacity-20" />
      <div className="glow-orb w-64 h-64 bottom-20 right-20 opacity-30" />

      <div className="container mx-auto px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
            Portfolio
          </p>
          <h2 className="section-title">
            My <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Projects slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
          style={{ scrollbarWidth: 'thin' }}
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card snap-start group">
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* View button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="text-primary-foreground"
                  />
                </button>
              </div>

              {/* Content */}
              <h3 className="text-foreground text-xl font-medium mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm font-light mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-light bg-secondary/50 text-muted-foreground rounded-full border border-white/5"
                  >
                    {getTagIcon(tag)}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
