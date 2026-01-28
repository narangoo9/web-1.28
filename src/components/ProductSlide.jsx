// src/components/ProductSlide.jsx
export default function ProductSlide({
  side = "left",         // "left" → зураг зүүн, "right" → зураг баруун
  index = "01",          // _01, _02 ...
  title,
  description,
  imageSrc,
}) {
  const imageLeft = side === "left";

  return (
    <section className="relative max-w-6xl mx-auto px-8 pt-32 pb-32">
      <div className={`flex gap-16 ${imageLeft ? "" : "flex-row-reverse"}`}>
        {/* ЗУРГИЙН ТАЛ — bar-аас доогуур */}
        <div className="flex-1 relative z-10">
          <img
            src={imageSrc}
            alt={title}
            className="w-full object-cover grayscale contrast-125"
          />
        </div>

        {/* ТЕКСТИЙН ТАЛ — bar-аас дээгүүр */}
        <div className="flex-1 relative z-30 flex flex-col justify-center">
          {/* _01, _02 индекс */}
          <p
            className={`text-xs tracking-[0.35em] text-gray-400 mb-4 ${
              imageLeft ? "" : "text-right"
            }`}
          >
            _{index}
          </p>

          {/* Гол цэнхэр гарчиг */}
          <h3
            className={`text-2xl md:text-3xl font-semibold text-cyan-400 mb-4 ${
              imageLeft ? "" : "text-right"
            }`}
          >
            {title}
          </h3>

          {/* Доорх жижиг текст */}
          <p
            className={`text-xs md:text-sm text-gray-200 leading-relaxed max-w-xs ${
              imageLeft ? "" : "ml-auto text-right"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
