import React, { useEffect, useRef, useMemo } from 'react';
import '/src/ProfileCard.css';

interface ProfileCardProps {
  avatarUrl?: string;
  miniAvatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;

  innerGradient?: string;
  customInnerGradient?: string;

  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;

  className?: string;

  enableTilt?: boolean;

  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;

  showIcon?: boolean;
  showUserInfo?: boolean;

  onContactClick?: () => void;
}

const DEFAULT_INNER_GRADIENT =
  'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const clamp = (v: number, min = 0, max = 100) =>
  Math.min(Math.max(v, min), max);

const round = (v: number, precision = 3) =>
  parseFloat(v.toFixed(precision));

const adjust = (
  v: number,
  fMin: number,
  fMax: number,
  tMin: number,
  tMax: number
) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = '/assets/profile.png',
  miniAvatarUrl,
  iconUrl = 'https://img.icons8.com/sf-black-filled/64/source-code.png',
  grainUrl,

  innerGradient,
  customInnerGradient,

  behindGlowEnabled = true,
  behindGlowColor = 'rgba(125, 190, 255, 0.67)',
  behindGlowSize = '50%',

  className = '',
  enableTilt = true,

  name = 'João Victor',
  title = 'Frontend Developer',
  handle = 'joaovictor',
  status = 'Online',
  contactText = 'Contact',

  showIcon = false,
  showUserInfo = true,

  onContactClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  /* ------------------ DESKTOP TILT ONLY ------------------ */
  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const setVars = (x: number, y: number) => {
      const wrap = wrapRef.current;
      const shell = shellRef.current;
      if (!wrap || !shell) return;

      const w = shell.clientWidth || 1;
      const h = shell.clientHeight || 1;

      const px = clamp((100 / w) * x);
      const py = clamp((100 / h) * y);

      const cx = px - 50;
      const cy = py - 50;

      wrap.style.setProperty('--pointer-x', `${px}%`);
      wrap.style.setProperty('--pointer-y', `${py}%`);
      wrap.style.setProperty('--background-x', `${adjust(px, 0, 100, 35, 65)}%`);
      wrap.style.setProperty('--background-y', `${adjust(py, 0, 100, 35, 65)}%`);
      wrap.style.setProperty('--rotate-x', `${round(-(cx / 5))}deg`);
      wrap.style.setProperty('--rotate-y', `${round(cy / 4)}deg`);
    };

    const step = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setVars(currentX, currentY);

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        rafId = requestAnimationFrame(step);
      }
    };

    return {
      set(x: number, y: number) {
        targetX = x;
        targetY = y;
        rafId = requestAnimationFrame(step);
      },
      center() {
        const shell = shellRef.current;
        if (!shell) return;
        this.set(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      init() {
        this.center();
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, [enableTilt]);

  useEffect(() => {
    if (!tiltEngine || !shellRef.current) return;

    const shell = shellRef.current;

    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // ✅ mobile não trava scroll
      const r = shell.getBoundingClientRect();
      tiltEngine.set(e.clientX - r.left, e.clientY - r.top);
    };

    shell.addEventListener('pointermove', move);
    shell.addEventListener('pointerleave', tiltEngine.center);

    tiltEngine.init();

    return () => {
      shell.removeEventListener('pointermove', move);
      shell.removeEventListener('pointerleave', tiltEngine.center);
      tiltEngine.cancel();
    };
  }, [tiltEngine]);

  const cardStyle = useMemo(
    () =>
      ({
        '--icon': iconUrl ? `url(${iconUrl})` : 'none',
        '--grain': grainUrl ? `url(${grainUrl})` : 'none',
        '--inner-gradient':
          customInnerGradient ?? innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor,
        '--behind-glow-size': behindGlowSize
      }) as React.CSSProperties,
    [iconUrl, grainUrl, innerGradient, customInnerGradient, behindGlowColor, behindGlowSize]
  );

  return (
    /* 🔥 CONTAINER NEUTRO — CENTRALIZA NO MOBILE */
    <div className="w-full flex justify-center lg:justify-end">
      <div
        ref={wrapRef}
        className={`pc-card-wrapper ${className}`}
        style={cardStyle}
      >
        {behindGlowEnabled && <div className="pc-behind" />}

        <div ref={shellRef} className="pc-card-shell">
          <section className="pc-card">
            <div className="pc-inside">
              <div className="pc-shine" />
              <div className="pc-glare" />

              <div className="pc-content pc-avatar-content">
                <img className="avatar" src={avatarUrl} alt={name} />

                {showUserInfo && (
                  <div className="pc-user-info">
                    <div className="pc-user-details">
                      <div className="pc-mini-avatar">
                        <img src={miniAvatarUrl || avatarUrl} alt={name} />
                      </div>
                      <div>
                        <div className="pc-handle">@{handle}</div>
                        <div className="pc-status">{status}</div>
                      </div>
                    </div>

                    <button
                      className="pc-contact-btn"
                      onClick={onContactClick}
                    >
                      {contactText}
                    </button>
                  </div>
                )}
              </div>

              <div className="pc-content">
                <div className="pc-details">
                  <h3>{name}</h3>
                  <p>{title}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);
