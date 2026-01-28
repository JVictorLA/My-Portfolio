import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';


import { ArrowUpRight, Atom, Wind, FileJs, X } from '@phosphor-icons/react';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project5 from '@/assets/project-5.png';
import project4 from '@/assets/project-4.png';
import project6 from '@/assets/project-6.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';


gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'WebSite da Igreja IEADMS PP',
    category: 'Sites',
    description: 'Website institucional desenvolvido para a Igreja IEADMS Ponta Porã, com foco em clareza, acessibilidade e presença digital. O projeto oferece uma navegação moderna, layout responsivo e identidade visual alinhada à missão da igreja, facilitando o acesso a informações, eventos e conteúdos para a comunidade.',
    image: project1,
    tags: ['React', 'Tailwind', 'Spline'],
    link: 'https://ieadmspontapora.netlify.app/',
  },
  {
    id: 2,
    title: 'PromptStudio AI',
    category: 'BOTs',
    description: 'Plataforma inteligente desenvolvida para transformar ideias simples em prompts detalhados para IAs e ferramentas no-code. O PromptStudio AI combina interface moderna, animações fluidas e foco em produtividade para acelerar a criação de projetos digitais.',
    image: project2,
    tags: ['React', 'Three.js', 'GSAP'],
    link: '/project-em-desenvolvimento',
  },
  {
    id: 3,
    title: 'Burger Bloom',
    category: 'Landing Pages',
    description: 'Landing page fictícia desenvolvida para a hamburgueria Burger Bloom, com foco em conversão, identidade visual forte e experiência do usuário. O projeto destaca cardápio, promoções e chamadas estratégicas para pedidos, utilizando um design moderno e responsivo.',
    image: project3,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://burger-bloom.vercel.app/',
  },
  {
    id: 4,
    title: 'Nexus Barbearia',
    category: 'Landing Pages',
    description: 'Nexus Barbearia é um projeto fictício de landing page desenvolvido para portfólio, inspirado em uma barbearia moderna e urbana. O conceito une identidade visual forte, tipografia marcante e foco na experiência do cliente, simulando uma presença digital profissional voltada para agendamentos e conversão.',
    image: project4,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://chrome-quill.vercel.app/',
  },{
    id: 5,
    title: 'Dev Barber',
    category: 'Landing Pages',
    description: 'Landing page fictícia para a barbearia Dev Barber, unindo estilo clássico e estética moderna. O projeto apresenta serviços, agendamento e identidade da marca de forma clara e responsiva, com foco em usabilidade, performance e presença digital profissional.',
    image: project5,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '',
  },
  {
    id: 6,
    title: 'EstéticaVita',
    category: 'Landing Pages',
    description: 'EstéticaVita é um projeto fictício de landing page desenvolvido para fins de portfólio, representando uma clínica de estética moderna e focada em bem-estar. A proposta destaca um design clean, comunicação estratégica e foco em conversão, simulando a presença digital de uma clínica profissional.',
    image: project6,
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://aura-design-studio-eta.vercel.app/',
  },
  
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const PROJECTS_PER_PAGE = 6;
  const [projectPage, setProjectPage] = useState(0);


  const filterRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<'Tudo' | 'Landing Pages' | 'BOTs' | 'Sites'>('Tudo');
  const filters = ['Tudo', 'Landing Pages', 'BOTs', 'Sites'];

  const FILTERS_PER_PAGE = 4;

  const [filterPage, setFilterPage] = useState(0);

  const totalPages = Math.ceil(filters.length / FILTERS_PER_PAGE);

  const visibleFilters = filters.slice(
    filterPage * FILTERS_PER_PAGE,
    filterPage * FILTERS_PER_PAGE + FILTERS_PER_PAGE
  );

  const filteredProjects =
    filter === 'Tudo'
      ? projects
      : projects.filter(project => project.category === filter);

  const totalProjectPages = Math.ceil(
    filteredProjects.length / PROJECTS_PER_PAGE
  );

  const paginatedProjects = filteredProjects.slice(
    projectPage * PROJECTS_PER_PAGE,
    projectPage * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE
  );

  useEffect(() => {
    setProjectPage(0);
  }, [filter]);
  useEffect(() => {
    if (isMobile) return;

    gsap.fromTo(
      '.project-card',
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [projectPage, filter, isMobile]);

  const handleFilterNav = (direction: 'left' | 'right') => {
    if (isMobile) {
      if (!filterRef.current) return;

      filterRef.current.scrollBy({
        left: direction === 'left' ? -180 : 180,
        behavior: 'smooth',
      });
    } else {
      setFilterPage((prev) => {
        if (direction === 'left') {
          return prev === 0 ? totalPages - 1 : prev - 1;
        }
        return prev === totalPages - 1 ? 0 : prev + 1;
      });
    }
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  useEffect(() => {
    if (!isMobile) {
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
              trigger: '.project-card',
              start: 'top 80%',
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isMobile]);

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

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (isMobile) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -35;
    const rotateY = ((x / rect.width) - 0.5) * 35;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const resetTilt = (card: HTMLDivElement) => {
    if (isMobile) return;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-32">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title">
            Meus <span className="text-gradient">Projetos</span>
          </h2>

          <div className="relative mt-6 flex items-center justify-center gap-4">

            {/* SETA ESQUERDA */}
            <button
              onClick={() => handleFilterNav('left')}
              className="
    group
    w-10 h-10
    rounded-full
    border border-white/10
    bg-white/5 backdrop-blur-md
    flex items-center justify-center
    transition-all duration-300
    hover:bg-white/10
    hover:scale-105
    active:scale-95
  "
            >
              <CaretLeft
                size={18}
                weight="bold"
                className="text-white/70 group-hover:text-white transition"
              />
            </button>

            {/* FILTROS */}
            {isMobile ? (
              <div
                ref={filterRef}
                className="flex gap-3 overflow-hidden px-10"
              >
                {filters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item as any)}
                    className={`
            flex-shrink-0 whitespace-nowrap
            px-4 py-2 rounded-full text-sm transition-all
            border backdrop-blur-md
            ${filter === item
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10'
                      }
          `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 justify-center min-w-[520px]">
                {visibleFilters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item as any)}
                    className={`
            px-4 py-2 rounded-full text-sm transition-all
            border backdrop-blur-md
            ${filter === item
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10'
                      }
          `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* SETA DIREITA */}
            <button
              onClick={() => handleFilterNav('right')}
              className="
    group
    w-10 h-10
    rounded-full
    border border-white/10
    bg-white/5 backdrop-blur-md
    flex items-center justify-center
    transition-all duration-300
    hover:bg-white/10
    hover:scale-105
    active:scale-95
  "
            >
              <CaretRight
                size={18}
                weight="bold"
                className="text-white/70 group-hover:text-white transition"
              />
            </button>
          </div>
          {/* PAGINAÇÃO DOS PROJETOS (DESKTOP) */}
          {!isMobile && totalProjectPages > 1 && (
            <div className="mt-6 mb-10 flex justify-center items-center gap-3">
              {Array.from({ length: totalProjectPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setProjectPage(index)}
                  className={`
          min-w-[36px] h-9 px-3
          rounded-full text-sm font-medium
          transition-all duration-300
          ${projectPage === index
                      ? 'bg-primary text-white scale-110 shadow-lg'
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                    }
        `}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* ================= MOBILE ================= */}
        {isMobile ? (
          <div className="w-full overflow-hidden">
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView={1.1}
              spaceBetween={12}
              modules={[EffectCoverflow]}
              className="w-full px-4"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 1,
                slideShadows: false,
              }}
            >
              {filteredProjects.map((project) => (

                <SwiperSlide key={project.id}>
                  <div
                    className="project-card mx-auto w-full max-w-[320px]
              rounded-2xl p-4 bg-gray-800 text-white
              border border-gray-700 transition-transform duration-300"
                    onClick={() => setSelected(project)}
                  >
                    <div className="relative mb-4 h-44 flex justify-center items-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-h-44 w-full object-contain rounded-xl"
                      />

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-primary flex items-center justify-center"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>

                    <h3 className="text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border border-gray-600 flex items-center gap-1"
                        >
                          {getTagIcon(tag)} {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (

          /* ================= DESKTOP (INALTERADO) ================= */
          <div className="flex gap-6 overflow-x-auto pb-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
            {paginatedProjects.map((project) => (


              <div
                key={project.id}
                className="project-card group cursor-pointer rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
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
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ArrowUpRight size={20} />
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
                      className="text-xs px-3 py-1 rounded-full border border-white/10 flex items-center gap-1"
                    >
                      {getTagIcon(tag)} {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
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


              <p className="text-muted-foreground">{selected.description}</p>

              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  {selected.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 flex items-center gap-1"
                    >
                      {getTagIcon(tag)} {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow"
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
