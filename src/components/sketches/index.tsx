import { ClerkTracingBeam } from "./clerk-tracing-beam";
import { DynamicIsland } from "./dynamic-island";
import { Feedback } from "./feedback";
import { MultiStep } from "./multi-step";

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
  {
    title: "Multi-step component",
    description: "Animation exercise for a direction aware multi-step component from animations.dev course by Emil Kowalski.",
    tags: ["react", "framer-motion", "tailwindcss"],
    component: <MultiStep />,
  },
  {
    title: "Iphone dynamic island",
    description: "Recreation of the iPhone dynamic island with various states.",
    tags: ["react", "framer-motion", "tailwindcss"],
    component: <DynamicIsland />,
  },
];
