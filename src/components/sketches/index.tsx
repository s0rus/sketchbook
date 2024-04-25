export type Sketch = {
  title: string;
  description: string;
  tags: string[];
  component: React.ReactNode;
};

export const sketches: Sketch[] = [
  // {
  //   title: "Clerk tracing beam",
  //   description: "Recreation of scroll tracing beam from clerk.com blog posts.",
  //   tags: ["react", "framer-motion", "tailwindcss"],
  //   component: <ClerkTracingBeam />,
  // },
];
