import { useEffect, useRef, useState } from "react";

export default function LearnMoreBar({ active }) {
  // Дэлгэцэн дээр харагдаж байгаа Y (viewport Y)
  const [viewY, setViewY] = useState(() => window.innerHeight * 0.7);

  // Page дээрх "жинхэнэ" Y (scrollY + clientY)
  const worldYRef = useRef(window.scrollY + window.innerHeight * 0.7);

  // Явж очих зорилтот viewport Y
  const targetViewYRef = useRef(viewY);

  useEffect(() => {
    const handleMove = (e) => {
      // cursor байгаа газар (page coordinate)
      const worldY = window.scrollY + e.clientY;
      worldYRef.current = worldY;
      // viewport дээр харуулах Y = worldY - scrollY
      targetViewYRef.current = worldY - window.scrollY;
    };

    const handleScroll = () => {
      // scroll хийхэд worldY өөрчлөгдөхгүй,
      // харин viewport дээр харагдах Y нь өөрчлөгдөнө
      const worldY = worldYRef.current;
      targetViewYRef.current = worldY - window.scrollY;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // cursor / scroll-ын зорилтот Y руу зөөлөн дөхүүлнэ
  useEffect(() => {
    let raf;

    const animate = () => {
      setViewY((prev) => {
        const ease = 0.18; // бага бол илүү удаан, зөөлөн
        const target = targetViewYRef.current;
        return prev + (target - prev) * ease;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const barHeight = 48;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 250ms ease-out",
      }}
    >
      <div
        className="fixed left-0 right-0 flex justify-center"
        style={{
          top: viewY - barHeight / 2,
          height: barHeight,
        }}
      >
        {/* active үед 100%, inactive үед 30% өргөнтэй */}
        <div
          className="h-full bg-black relative flex items-center justify-center overflow-hidden"
          style={{
            width: active ? "100%" : "30%",
            transition: "width 250ms ease-in-out",
          }}
        >
          {/* хоёр талаасаа бүдгэрсэн мэдрэмж */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70" />

          {/* TEXT */}
          <div className="relative flex items-center gap-6 text-[11px] tracking-[0.35em] uppercase">
            <span className="blink-dot text-cyan-400">:</span>
            <span className="text-slate-100">LEARN&nbsp;MORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
