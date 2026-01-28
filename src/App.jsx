import { useEffect, useState } from "react";
import LearnMoreBar from "./components/LearnMoreBar";

// ▶ Scroll-ын ерөнхий явцыг [0, 1] хооронд хадгална
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    handleScroll(); // эхний sync
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// ▶ Scroll утгыг дотроо "залхуу" дагадаг зураг (spring/lerp мэдрэмжтэй)
function ParallaxImage({ src, alt, progress }) {
  const [smooth, setSmooth] = useState(progress ?? 0.5);

  // progress өөрчлөгдөх бүрт бага багаар дөхөж очно
  useEffect(() => {
    let raf;

    const animate = () => {
      setSmooth((prev) => {
        const ease = 0.08; // 0.05–0.1 → илүү зөөлөн, bounce-тэй
        const next = prev + (progress - prev) * ease;

        // progress-т ойртсон бол шууд түүн дээр нь тавина
        if (Math.abs(next - progress) < 0.0005) return progress;
        return next;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const clamped = Math.min(1, Math.max(0, smooth));
  // range: +20% → -20% (өмнөхөөс бага, илүү subtle)
  const offsetPercent = 20 - clamped * 40;

  return (
    <div className="overflow-hidden h-[420px]">
      <img
        src={src}
        alt={alt}
        className="w-full h-[560px] object-cover grayscale contrast-125"
        style={{
          transform: `translateY(${offsetPercent}%)`,
          // JS-ээр аль хэдийн "зөөллөөд" байгаа болохоор transition хэрэггүй
        }}
      />
    </div>
  );
}

export default function App() {
  const [barActive, setBarActive] = useState(false);
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[#111111] text-white overflow-hidden">
      {/* Cursor дагадаг : LEARN MORE bar */}
      <LearnMoreBar active={barActive} />

      {/* PRODUCTS SECTION */}
      <section
        className="relative max-w-6xl mx-auto px-10 pt-24 pb-40 space-y-32"
        onMouseEnter={() => setBarActive(true)}
        onMouseLeave={() => setBarActive(false)}
      >
        {/* 🟦 OUR PRODUCTS copy – ХАМГИЙН ДЭЭР */}
        <div className="relative z-30 flex justify-end mb-8">
          <div className="max-w-md text-right space-y-6">
            <h2 className="text-sm tracking-[0.35em]">OUR PRODUCTS</h2>
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
              AURIGA’S LAUNCH PLATFORMS ARE BUILT ON A UNIFIED, REUSABLE, AND
              ALL-ELECTRIC ARCHITECTURE ENGINEERED TO DELIVER MISSION SUCCESS
              AND EXPAND OPERATIONAL CAPABILITY.
            </p>
          </div>
        </div>



        {/* 01 — HYPERSONIC TESTING (зураг зүүн, текст баруун) */}
        <div className="flex items-center gap-20">
          <div className="flex-1 relative z-10">
            <ParallaxImage
              src="/images/home-products-asset_01.png"
              alt="Hypersonic Testing"
              progress={scrollProgress}
            />
          </div>

          <div className="flex-1 relative z-30">
            <p className="text-xs tracking-[0.35em] text-gray-400 mb-2 text-right">
              _01
            </p>
            <h3 className="text-3xl text-cyan-400 mb-3 text-right">
              HYPERSONIC TESTING
            </h3>
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed max-w-xs ml-auto text-right">
              RECOVERABLE, HIGH-CADENCE, FLIGHT-REPRESENTATIVE TESTING ON THE
              GROUND.
            </p>
          </div>
        </div>

        {/* 02 — LAUNCHED EFFECTS (зураг том зүүн, текст баруун) */}
        <div className="flex items-center gap-20">
          <div className="flex-[1.3] relative z-10">
            <ParallaxImage
              src="/images/home-products-asset_02.webp"
              alt="Launched Effects"
              progress={scrollProgress}
            />
          </div>

          <div className="flex-[0.7] relative z-30">
            <p className="text-xs tracking-[0.35em] text-gray-400 mb-2 text-right">
              _02
            </p>
            <h3 className="text-3xl text-cyan-400 mb-3 text-right">
              LAUNCHED EFFECTS
            </h3>
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed max-w-xs ml-auto text-right">
              DYNAMIC DEPLOYMENT OF UNMANNED VEHICLES, TARGETS, DECOYS, AND
              COUNTER-UAS EFFECTORS.
            </p>
          </div>
        </div>

        {/* 03 — MISSILE DEFENSE (текст зүүн, зураг баруун) */}
        <div className="flex items-center gap-20">
          <div className="flex-[0.7] relative z-30">
            <p className="text-xs tracking-[0.35em] text-gray-400 mb-2">
              _03
            </p>
            <h3 className="text-3xl text-cyan-400 mb-3">MISSILE DEFENSE</h3>
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed max-w-xs">
              AFFORDABLE, RAPID INTERCEPTORS ACROSS ALL DOMAINS, POWERED BY
              ELECTROMAGNETIC LAUNCH.
            </p>
          </div>

          <div className="flex-[1.3] relative z-10">
            <ParallaxImage
              src="/images/home-products-asset_03.png"
              alt="Missile Defense"
              progress={scrollProgress}
            />
          </div>
        </div>

        {/* 04 — SPACE LAUNCH (гарчиг голд, зураг баруун, _04 доор) */}
        <div className="flex flex-col gap-20">
          <div className="flex items-start gap-20">
            <div className="flex-1" />

            <div className="flex-1 text-center  relative z-30">
              <h3 className="text-3xl text-cyan-400 mb-3">SPACE LAUNCH</h3>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed max-w-xs mx-auto">
                ON-DEMAND, RESPONSIVE, AND AFFORDABLE ACCESS TO ORBIT.
              </p>
            </div>
            <div className="flex-1 flex justify-end relative z-10">
              <div className="w-[360px]">
                <ParallaxImage
                  src="/images/home-products-asset_04.png"
                  alt="Space Launch"
                  progress={scrollProgress}
                />
              </div>
            </div>
          </div>

          <p className="text-xs tracking-[0.35em] text-gray-400 text-center relative z-30">
            _04
          </p>
        </div>
      </section>
    </div>
  );
}
