import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // trava scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Glow background */}
      <div className="glow-orb w-[500px] h-[500px] -top-40 -left-40 opacity-30" />
      <div className="glow-orb w-[400px] h-[400px] bottom-0 right-0 opacity-20" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Gear */}
        <div className="mb-10 perspective">
          <div className="gear-3d" />
        </div>

        {/* Text */}
        <h1 className="text-7xl font-bold text-foreground mb-4">404</h1>

        <p className="text-muted-foreground text-lg max-w-md mb-8">
          Este projeto ainda está em desenvolvimento ou a rota não existe.
        </p>

        {/* Button */}
        <Link to="/" className="btn-glow animate-glow-pulse">
          Voltar para Home
        </Link>
      </div>

      {/* Styles */}
      <style>{`
        .perspective {
          perspective: 800px;
        }

        .gear-3d {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background:
            radial-gradient(circle at center, #111 35%, transparent 36%),
            conic-gradient(
              from 0deg,
              #7c3aed 0deg 20deg,
              transparent 20deg 40deg
            );
          box-shadow:
            0 0 40px rgba(124, 58, 237, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          animation: spin 6s linear infinite;
          transform-style: preserve-3d;
        }

        .gear-3d::before {
          content: '';
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          background: #0f0f14;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
          transform: translateZ(20px);
        }

        @keyframes spin {
          from {
            transform: rotateX(25deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(25deg) rotateZ(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
