import { ArrowUp, Bell, BellOff, CheckCircle, Loader2, Moon, Notebook, Plus, Sun, X, type LucideProps } from "lucide-react";

export const Icon = {
  sun: Sun,
  moon: Moon,
  sketchbook: Notebook,
  arrowUp: ArrowUp,
  spinner: Loader2,
  checkCircle: CheckCircle,
  bell: Bell,
  bellOff: BellOff,
  X: X,
  plus: Plus,
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
  skipBack: (props: LucideProps) => (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.08144 8.21092C3.92706 8.11268 3.92706 7.88733 4.08144 7.78909L14.3658 1.24451C14.5322 1.1386 14.75 1.25815 14.75 1.45542L14.75 14.5446C14.75 14.7419 14.5322 14.8614 14.3658 14.7555L4.08144 8.21092ZM0.75 2V1.25H2.25V2V14V14.75H0.75V14V2Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  skipForward: (props: LucideProps) => (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6686 8.21092C11.8229 8.11268 11.8229 7.88733 11.6686 7.78909L1.38422 1.24451C1.21779 1.1386 1 1.25815 1 1.45542V14.5446C1 14.7419 1.21779 14.8614 1.38422 14.7555L11.6686 8.21092ZM15 2V1.25H13.5V2V14V14.75H15V14V2Z"
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
