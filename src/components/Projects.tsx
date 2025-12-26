import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import { ArrowUpRight, Atom, Wind, FileJs, X } from '@phosphor-icons/react';

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
    link: '/project-em-desenvolvimento',
  },
  {
    id: 2,
    title: '3D Gaming UI',
    description: 'Next-level gaming interface with immersive 3D elements.',
    image: project2,
    tags: ['React', 'Three.js', 'GSAP'],
    link: 'https://seuprojeto2.com',
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Creative developer portfolio featuring 3D animations.',
    image: project3,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://seuprojeto3.com',
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Modern gaming platform with dynamic visuals.',
    image: project4,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://seuprojeto4.com',
  },
  {
    id: 5,
    title: 'Animation Tools',
    description: 'Fast & reliable web apps with smooth animations.',
    image: project5,
    tags: ['React', 'GSAP', 'Framer'],
    link: 'https://seuprojeto5.com',
  },
  {
    id: 6,
    title: 'Animated Portfolio',
    description: 'Creative portfolio with cinematic interactions.',
    image: project6,
    tags: ['CSS', 'GSAP', 'JavaScript'],
    link: 'https://seuprojeto6.com',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<any>(null);

  /* ===============================
     BLOQUEIA SCROLL QUANDO MODAL ABRE
  =============================== */
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  /* ===============================
     ANIMAÇÕES DE ENTRADA
  =============================== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ===============================
     TILT RÁPIDO (SEM DELAY)
  =============================== */
  const handleTilt = (
    e: React.MouseEvent<HTMLDivElement>,
    card: HTMLDivElement
  ) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -35;
    const rotateY = ((x / rect.width) - 0.5) * 35;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;
  };

  const resetTilt = (card: HTMLDivElement) => {
    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'react':
        return <Atom size={14} />;
      case 'tailwind':
        return <Wind size={14} />;
      default:
        return <FileJs size={14} />;
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-32">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
        </div>

        <div
          ref={sliderRef}
          className="
            flex gap-6 overflow-x-auto pb-8
            lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible
          "
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                project-card group cursor-pointer rounded-2xl p-4
                bg-white/5 backdrop-blur-md border border-white/10
                transition-shadow duration-300
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
              "
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
              onClick={() => setSelected(project)}
            >
              <div className="relative overflow-hidden rounded-xl mb-4 h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="
                    absolute top-4 right-4 w-10 h-10 rounded-full
                    bg-primary flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-all
                  "
                >
                  <ArrowUpRight size={20} className="text-primary-foreground" />
                </a>
              </div>

              <h3 className="text-xl mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>

              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-white/10"
                  >
                    {getTagIcon(tag)} {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="relative bg-card rounded-2xl max-w-4xl w-full mx-4 overflow-hidden">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10"
            >
              <X size={24} />
            </button>

            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-80 object-cover"
            />

            <div className="p-6 flex flex-col gap-6">
              <h2 className="text-2xl">{selected.title}</h2>

              <p className="text-muted-foreground">
                {selected.description}
              </p>

              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  {selected.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10"
                    >
                      {getTagIcon(tag)} {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow animate-glow-pulse"
                >
                  Abrir projeto
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
