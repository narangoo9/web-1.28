// import { useEffect, useState } from "react";

// export default function CustomCursor() {
//   const [target, setTarget] = useState({
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   });

//   const [pos, setPos] = useState({
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   });

//   // Хулгана хөдөлгөөн дагах – target state
//   useEffect(() => {
//     const handleMove = (e) => {
//       setTarget({
//         x: e.clientX,
//         y: e.clientY,
//       });
//     };

//     window.addEventListener("mousemove", handleMove);
//     return () => window.removeEventListener("mousemove", handleMove);
//   }, []);

//   // Smooth хөдөлгөөн (lerp)
//   useEffect(() => {
//     let frameId;

//     const animate = () => {
//       setPos((prev) => {
//         const ease = 0.18; // 0.1–0.2 хооронд байвал зүгээр
//         const x = prev.x + (target.x - prev.x) * ease;
//         const y = prev.y + (target.y - prev.y) * ease;
//         return { x, y };
//       });

//       frameId = requestAnimationFrame(animate);
//     };

//     frameId = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(frameId);
//   }, [target]);

//   return (
//     <div className="pointer-events-none fixed inset-0 z-50 mix-blend-screen">
//       {/* Гол дугуй cursor */}
//       <div
//         className="
//           fixed -translate-x-1/2 -translate-y-1/2
//           w-8 h-8 rounded-full
//           border border-white/70
//           bg-white/5
//           backdrop-blur
//           shadow-[0_0_40px_rgba(255,255,255,0.4)]
//         "
//         style={{
//           transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
//         }}
//       />

//       {/* Blur glow effect-үүд (зураг оронд gradient дугуйнууд) */}
//       <div
//         className="fixed -translate-x-1/2 -translate-y-1/2"
//         style={{
//           transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
//         }}
//       >
//         {/* Том зөөлөн blur */}
//         <div className="relative">
//           <div className="absolute -top-16 -left-20 w-40 h-40 rounded-full bg-violet-500/40 blur-3xl" />
//           <div className="absolute -bottom-20 -right-16 w-44 h-44 rounded-full bg-cyan-400/40 blur-3xl" />
//           <div className="absolute -top-6 -right-24 w-32 h-32 rounded-full bg-pink-500/40 blur-3xl" />
//         </div>
//       </div>
//     </div>
//   );
// }
