import { TestSketch } from "./test-sketch";

export type Sketch = {
  title: string;
  description: string;
  tags: string[];
  component: React.ReactNode;
};

export const sketches: Sketch[] = [
  {
    title: "Sketch 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["react", "nextjs", "tailwindcss"],
    component: <TestSketch />,
  },
  {
    title: "Sketch 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["react", "nextjs", "tailwindcss"],
    component: <TestSketch />,
  },
];
