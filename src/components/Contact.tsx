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
  Phone
} from '@phosphor-icons/react';
import { toast } from 'sonner';

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

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully!');
    setIsSubmitting(false);
    if (formRef.current) formRef.current.reset();
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
            Get in Touch
          </p>
          <h2 className="section-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div ref={infoRef}>
            <h3 className="text-2xl font-medium text-foreground mb-6">
              Contact Information
            </h3>
            <p className="text-muted-foreground font-light mb-8 leading-relaxed">
              Have a project in mind or just want to say hello? Drop me a
              message and I'll get back to you as soon as possible.
            </p>

            {/* Contact details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="skill-icon !w-12 !h-12">
                  <EnvelopeSimple size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">hello@miladicode.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="skill-icon !w-12 !h-12">
                  <Phone size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground">+1 (234) 567-890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="skill-icon !w-12 !h-12">
                  <MapPin size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Follow Me</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
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
                  href="https://linkedin.com"
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
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-icon !w-12 !h-12 group"
                >
                  <TwitterLogo
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
                <label className="text-sm text-muted-foreground block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="glass-input w-full"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-field">
                <label className="text-sm text-muted-foreground block mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  className="glass-input w-full"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-field">
                <label className="text-sm text-muted-foreground block mb-2">
                  Message
                </label>
                <textarea
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
                    Send Message
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
