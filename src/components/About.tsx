import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileHtml,
  FileCss,
  FileJs,
  Atom,
  Wind,
  Lightning,
} from '@phosphor-icons/react';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5', icon: FileHtml },
  { name: 'CSS3', icon: FileCss },
  { name: 'JavaScript', icon: FileJs },
  { name: 'React', icon: Atom },
  { name: 'Tailwind', icon: Wind },
  { name: 'GSAP', icon: Lightning },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Skills animation
      gsap.fromTo(
        '.skill-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
    >
      {/* Background orb */}
      <div className="glow-orb w-96 h-96 top-1/2 -translate-y-1/2 -right-48 opacity-30" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="profile-glow relative group">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                <img
                  src={profileImage}
                  alt="João Victor Almeida - Frontend Developer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 rounded-full border border-primary/30 scale-110 animate-pulse-glow opacity-50" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Sobre Mim
            </p>

            {/* TITLE */}
            <h2 className="section-title mb-6">
              <span className="block text-lg font-bold lg:text-4xl text-muted-foreground">
                Olá, me chamo
              </span>

              <span className="block text-4xl md:text-5xl text-gradient font-semibold mt-2 whitespace-nowrap">
                João Victor Almeida
              </span>
            </h2>

            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
              Sou especialista em desenvolvimento front-end, criando websites dinâmicos, visualmente atraentes e altamente responsivos, focados em proporcionar experiências de usuário intuitivas e eficientes. Possuo formação técnica em Informática pelo IFMS (Instituto Federal de Mato Grosso do Sul), integrada ao Ensino Médio, o que me proporcionou uma base sólida em tecnologia.
            </p>

            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
            Com amplo domínio de HTML, CSS e JavaScript, e experiência prática com Vue.js, React e C++, atuo na construção de interfaces web modernas e aplicações eficientes, priorizando não apenas a estética, mas também desempenho, acessibilidade e usabilidade, sempre alinhado às melhores práticas do desenvolvimento web.
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-foreground text-lg font-medium mb-6">
                Tech Stack
              </h3>

              <div className="skills-grid grid grid-cols-3 sm:grid-cols-6 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item skill-icon flex-col gap-2 group"
                  >
                    <skill.icon
                      size={24}
                      weight="light"
                      className="text-primary group-hover:text-foreground transition-colors"
                    />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
