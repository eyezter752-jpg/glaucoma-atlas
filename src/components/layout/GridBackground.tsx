export function GridBackground() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-fine" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14213A" strokeOpacity="0.4" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid-bold" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#grid-fine)"/>
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#1A2A4A" strokeOpacity="0.6" strokeWidth="0.7"/>
          <circle cx="0" cy="0" r="1.5" fill="#334155" fillOpacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-bold)"/>
    </svg>
  );
}
