type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export function CaseFrame({ src, alt = "", className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center overflow-hidden rounded-[var(--radius)] bg-paper ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
    </div>
  );
}
