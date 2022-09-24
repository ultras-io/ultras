export const ORIGINAL_SIZE = 22;

export function buildSvg(size: number): string {
  const iconScale = size / ORIGINAL_SIZE;

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 ${size} ${size}"
      width="${size}"
      height="${size}"
    >
      <g transform="scale(${iconScale} ${iconScale})">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
          fill="#ff3b30"
        />
        <rect
          y="10.5"
          x="6"
          width="10"
          height="1"
          fill="#ffffff"
        />
      </g>
    </svg>
  `;
}
