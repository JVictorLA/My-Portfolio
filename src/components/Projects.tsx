'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

import { ArrowUpRight, Atom, Wind, FileJs, X } from '@phosphor-icons/react';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const projects = [
  {
    id: 1,
    title: '3D Interactive Web',
    description: 'Email platform for developers with React, Tailwind & Spline integration.',
    image: project1,
    tags: ['React', 'Tailwind', 'Spline'],
    link: '#',
  },
  {
    id: 2,
    title: '3D Gaming UI',
    description: 'Next-level gaming interface with immersive 3D elements.',
    image: project2,
    tags: ['React', 'Three.js', 'GSAP'],
    link: '#',
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Creative developer portfolio featuring 3D animations.',
    image: project3,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Modern gaming platform with dynamic visuals.',
    image: project4,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    id: 5,
    title: 'Animation Tools',
    description: 'Fast & reliable web apps with smooth animations.',
    image: project5,
    tags: ['React', 'GSAP'],
    link: '#',
  },
  {
    id: 6,
    title: 'Animated Portfolio',
    description: 'Creative portfolio with cinematic interactions.',
    image: project6,
    tags: ['CSS', 'GSAP', 'JavaScript'],
    link: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<any>(null);

  /* ===============================
     DESKTOP SCROLL ANIMATION
  =============================== */
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ===============================
     MOBILE – STACK 3D
  =============================== */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const cards = gsap.utils.toArray<HTMLDivElement>('.project-card');

    cards.forEach((card, i) => {
      gsap.set(card, {
        x: i * 14,
        y: i * 10,
        scale: 1 - i * 0.04,
        zIndex: cards.length - i,
        transformPerspective: 1200,
      });
    });
  }, []);

  /* ===============================
     MOBILE – DRAG CARD (SEGURAR)
  =============================== */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const cards = gsap.utils.toArray<HTMLDivElement>('.project-card');

    cards.forEach((card) => {
      Draggable.create(card, {
        type: 'x,y',
        inertia: true,
        onPress() {
          gsap.to(card, {
            scale: 1.06,
            rotateZ: 2,
            duration: 0.2,
          });
        },
        onRelease() {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotateZ: 0,
            scale: 1,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
          });
        },
      });
    });
  }, []);

  /* ===============================
     MOBILE – SWIPE STACK
  =============================== */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const cards = gsap.utils.toArray<HTMLDivElement>('.project-card');

    Draggable.create(sliderRef.current!, {
      type: 'x',
      inertia: true,
      bounds: {
        minX: -(cards.length - 1) * 260,
        maxX: 0,
      },
      onDrag() {
        cards.forEach((card, i) => {
          gsap.to(card, {
            x: this.x * 0.4 + i * 14,
            rotateY: this.x * 0.02,
            duration: 0.2,
          });
        });
      },
    });
  }, []);

  /* ===============================
     DESKTOP TILT
  =============================== */
  const handleTilt = (e: any, card: HTMLDivElement) => {
    if (window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = ((y / rect.height) - 0.5) * -30;
    const ry = ((x / rect.width) - 0.5) * 30;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      scale(1.04)
    `;
  };

  const resetTilt = (card: HTMLDivElement) => {
    card.style.transform = `
      perspective(1200px)
      rotateX(0)
      rotateY(0)
      scale(1)
    `;
  };

  const getTagIcon = (tag: string) => {
    if (tag === 'React') return <Atom size={14} />;
    if (tag === 'Tailwind') return <Wind size={14} />;
    return <FileJs size={14} />;
  };

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="mx-auto w-full px-4 lg:container lg:px-6">
        <h2 className="text-center text-4xl mb-16">
          Meus <span className="text-gradient">Projetos</span>
        </h2>

        <div
          ref={sliderRef}
          className="
            relative flex gap-6 overflow-hidden
            lg:grid lg:grid-cols-3 lg:gap-8
          "
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                project-card
                min-w-[85%] lg:min-w-0
                rounded-2xl p-4
                bg-white/5 backdrop-blur-md
                border border-white/10
                touch-none
              "
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
              onClick={() => setSelected(project)}
            >
              <div className="overflow-hidden rounded-xl mb-4 h-56">
                <img
                  src={project.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl mb-2">{project.title}</h3>
              <p className="text-sm opacity-70 mb-4">
                {project.description}
              </p>

              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 flex items-center gap-1"
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
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-card rounded-2xl max-w-4xl w-full mx-4 relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setSelected(null)}
            >
              <X size={24} />
            </button>

            <img
              src={selected.image}
              className="w-full h-80 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <h2 className="text-2xl mb-2">{selected.title}</h2>
              <p className="opacity-70">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
