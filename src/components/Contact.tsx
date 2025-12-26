import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo, 
  PaperPlaneTilt,
  EnvelopeSimple,
  MapPin,
  Phone,
  InstagramLogo
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { sendEmail } from '@/lib/emailService';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -60, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Form inputs stagger
      gsap.fromTo(
        '.form-field',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      const formData = new FormData(formRef.current!);
      const emailData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      };

      // Validate required fields
      if (!emailData.name || !emailData.email || !emailData.message) {
        throw new Error('Please fill in all fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Send email
      await sendEmail(emailData);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form
      if (formRef.current) formRef.current.reset();
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while sending your message.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-96 h-96 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
            Entre em Contato
          </p>
          <h2 className="section-title">
            Envie sua <span className="text-gradient">Mensagem</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div ref={infoRef}>
            <h3 className="text-2xl font-medium text-foreground mb-6">
              Informações de Contato
            </h3>
            <p className="text-muted-foreground font-light mb-8 leading-relaxed">
              Tem um projeto em mente ou só quer dizer olá? Me envie uma mensagem e eu responderei o mais breve possível.
              mensagem e entrarei em contato com você o mais breve possível.
            </p>

            {/* Contact details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="skill-icon !w-12 !h-12">
                  <EnvelopeSimple size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">almeidalima.jvictor@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="skill-icon !w-12 !h-12">
                  <Phone size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground">+55 (67) 9 8449-2124</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="skill-icon !w-12 !h-12">
                  <MapPin size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">Cuiabá, MT</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Follow Me</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/JVictorLA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-icon !w-12 !h-12 group"
                >
                  <GithubLogo
                    size={24}
                    weight="light"
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/jo%C3%A3o-victor-lima-de-almeida-b0b56a321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-icon !w-12 !h-12 group"
                >
                  <LinkedinLogo
                    size={24}
                    weight="light"
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </a>
                <a
                  href="https://www.instagram.com/_jvking.la77/?next=%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-icon !w-12 !h-12 group"
                >
                  <InstagramLogo
                    size={24}
                    weight="light"
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8">
            <div className="space-y-6">
              <div className="form-field">
                <label htmlFor="name" className="text-sm text-muted-foreground block mb-2">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="glass-input w-full"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="text-sm text-muted-foreground block mb-2">
                  Seu Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="glass-input w-full"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-field">
                <label htmlFor="message" className="text-sm text-muted-foreground block mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="glass-input w-full resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn btn-glow w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Enviar Mensagem
                    <PaperPlaneTilt size={20} weight="light" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;