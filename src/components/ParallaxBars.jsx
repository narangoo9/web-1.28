// src/components/LearnMoreBar.jsx
import { useEffect, useRef, useState } from "react";

export default function LearnMoreBar({ active }) {
  // bar-ийн харагдаж байгаа Y байрлал
  const [y, setY] = useState(window.innerHeight * 0.8);
  // cursor-ын зорилтот Y
  const targetY = useRef(window.innerHeight * 0.8);

  // mouse move → targetY шинэчлэх
  useEffect(() => {
    const onMove = (e) => {
      targetY.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // smooth дагах animation
  useEffect(() => {
    let raf;

    const animate = () => {
      setY((prev) => prev + (targetY.current - prev) * 0.18);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const barHeight = 48; // px

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 250ms ease-out",
      }}
    >
      <div
        className="fixed left-0 right-0"
        style={{
          top: y - barHeight / 2,
          height: barHeight,
        }}
      >
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="flex items-center justify-center gap-6 text-[11px] tracking-[0.35em] uppercase">
            <span className="text-cyan-400">:</span>
            <span className="text-slate-100">LEARN&nbsp;MORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
