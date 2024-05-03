import { ArrowUp, Bell, CheckCircle, Loader2, Moon, Notebook, Sun, X, type LucideProps } from "lucide-react";

export const Icon = {
  sun: Sun,
  moon: Moon,
  sketchbook: Notebook,
  arrowUp: ArrowUp,
  spinner: Loader2,
  checkCircle: CheckCircle,
  bell: Bell,
  X: X,
  play: (props: LucideProps) => (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5528 7.77638C14.737 7.86851 14.737 8.13147 14.5528 8.2236L1.3618 14.8191C1.19558 14.9022 1 14.7813 1 14.5955L1 1.4045C1 1.21865 1.19558 1.09778 1.3618 1.18089L14.5528 7.77638Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  pause: (props: LucideProps) => (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 2.5V1.75H4V2.5V13.5V14.25H5.5V13.5V2.5ZM12 2.5V1.75H10.5V2.5V13.5V14.25H12V13.5V2.5Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  brandLogo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.82 76" {...props}>
      <g transform="translate(-1123 -3101)">
        <g>
          <path d="M0,38H0L19,19,0,0H38V38h0L0,76Z" transform="translate(1123 3101)" fill="currentColor" />
        </g>
        <path d="M0,0H37.94L0,37.94Z" transform="translate(1236.82 3101) rotate(90)" fill="currentColor" />
        <path d="M0,0H37.94L0,37.94Z" transform="translate(1198.88 3101) rotate(90)" fill="currentColor" />
      </g>
    </svg>
  ),
};
