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
  google: (props: LucideProps) => (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" {...props}>
      <path
        d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
        fill="#4285F4"
      ></path>
      <path
        d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
        fill="#34A853"
      ></path>
      <path
        d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
        fill="#FBBC05"
      ></path>
      <path
        d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
        fill="#EA4335"
      ></path>
    </svg>
  ),
};
