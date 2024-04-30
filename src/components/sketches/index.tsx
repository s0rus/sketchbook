import { ClerkTracingBeam } from "./clerk-tracing-beam";
import { Feedback } from "./feedback";

export type Sketch = {
  title: string;
  description: string;
  tags: string[];
  component: React.ReactNode;
};

export const sketches: Sketch[] = [
  {
    title: "Clerk tracing beam",
    description: "Recreation of scroll tracing beam from clerk.com blog posts.",
    tags: ["react", "framer-motion", "tailwindcss"],
    component: <ClerkTracingBeam />,
  },
  {
    title: "Feedback form",
    description: "Animation exercise for a feedback form from animations.dev course by Emil Kowalski.",
    tags: ["react", "framer-motion", "tailwindcss"],
    component: <Feedback />,
  },
  // {
  //   title: "Before/After slider",
  //   description: "A before/after slider component.",
  //   tags: ["react", "tailwindcss"],
  //   component: <BeforeAfterSlider />,
  // },
];
