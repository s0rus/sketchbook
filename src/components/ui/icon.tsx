import { Moon, Notebook, Sun, type LucideProps } from "lucide-react";

export const Icon = {
  sun: Sun,
  moon: Moon,
  sketchbook: Notebook,
  brandLogo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.82 76" {...props}>
      <g transform="translate(-1123 -3101)">
        <g>
          <path
            d="M0,38H0L19,19,0,0H38V38h0L0,76Z"
            transform="translate(1123 3101)"
            fill="currentColor"
          />
        </g>
        <path
          d="M0,0H37.94L0,37.94Z"
          transform="translate(1236.82 3101) rotate(90)"
          fill="currentColor"
        />
        <path
          d="M0,0H37.94L0,37.94Z"
          transform="translate(1198.88 3101) rotate(90)"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
};
