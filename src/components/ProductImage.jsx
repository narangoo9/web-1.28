export default function ProductImage({ src }) {
  return (
    <div className="relative z-10 mb-40">
      <img
        src={src}
        alt=""
        className="w-full max-w-xl grayscale contrast-125"
      />
    </div>
  );
}

