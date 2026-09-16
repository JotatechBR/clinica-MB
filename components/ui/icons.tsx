type IconProps = { className?: string; size?: number };

export function WhatsAppIcon({ className, size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.37-2.94c-.25-.44.25-.41.72-1.36.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.41-.56-.42h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.13.16 1.76 2.68 4.25 3.76 1.58.68 2.2.74 2.99.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className, size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Estrela fina, em champagne fosco. */
export function StarIcon({ className, size = 14 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <path fill="currentColor" d="m12 2.8 2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.8 6.4 20l1.3-6.3L2.9 9.4l6.4-.7L12 2.8Z" />
    </svg>
  );
}

export function Stars({ count = 5, className, size }: IconProps & { count?: number }) {
  return (
    <span className={className} role="img" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: count }, (_, i) => (
        <StarIcon key={i} size={size} />
      ))}
    </span>
  );
}

/** Monograma MB desenhado em tipografia do site (texto real, acessível). */
export function Monogram({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <span className="font-display">M</span>
      <span className="font-display italic">B</span>
    </span>
  );
}
