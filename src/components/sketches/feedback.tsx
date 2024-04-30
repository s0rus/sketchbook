"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "../ui/icon";

type FormState = "IDLE" | "SUCCESS" | "LOADING";

export function Feedback() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("IDLE");
  const [feedback, setFeedback] = useState("");

  function submit() {
    setFormState("LOADING");
    setTimeout(() => {
      setFormState("SUCCESS");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && open && formState === "IDLE") {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className="flex h-[500px] w-full items-center justify-center">
      <motion.button
        layoutId="wrapper"
        key="button"
        className="relative flex items-center border border-accent px-4 py-2 outline-none"
        onClick={() => {
          setOpen(true);
          setFormState("IDLE");
          setFeedback("");
        }}
        style={{ borderRadius: 8 }}
      >
        <motion.span layoutId="title" className="block text-sm">
          Feedback
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="wrapper"
            className="absolute flex h-[192px] w-[364px] flex-col justify-between overflow-hidden border border-accent bg-card p-2"
            style={{ borderRadius: 12 }}
          >
            <motion.span
              layoutId="title"
              aria-hidden
              data-feedback={feedback ? "true" : "false"}
              className="absolute left-[20px] top-[20px] z-10 text-sm text-muted-foreground data-[feedback='false']:!opacity-100 data-[feedback='true']:!opacity-0"
            >
              Feedback
            </motion.span>

            <AnimatePresence mode="popLayout" initial={false}>
              {formState === "SUCCESS" ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -32,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: 32,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.4,
                    bounce: 0,
                  }}
                  className="flex h-full w-full flex-col items-center justify-center text-center"
                >
                  <Icon.checkCircle className="mb-1 h-6 w-6" />
                  <h3 className="mb-1 mt-2 text-sm font-semibold">Feedback received!</h3>
                  <p className="text-sm text-muted-foreground">Thanks for helping me improve the sketchbook!</p>
                </motion.div>
              ) : (
                <motion.form
                  exit={{
                    opacity: 0,
                    y: 8,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.4,
                    bounce: 0,
                  }}
                  className="flex h-full flex-col"
                  key="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  <textarea
                    autoFocus
                    placeholder="Feedback"
                    onChange={(e) => setFeedback(e.target.value)}
                    className="h-[128px] w-full resize-none rounded-t-md bg-accent p-3 text-sm outline-none placeholder:opacity-0"
                  />
                  <div className="flex w-full flex-1 items-center justify-end rounded-b-md border-t border-dashed border-t-card bg-accent px-2">
                    <button
                      type="submit"
                      className="relative flex w-[124px] items-center justify-center overflow-hidden rounded-md bg-primary/50 px-2 py-1 text-xs font-bold"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 25 }}
                          transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0,
                          }}
                          key={formState}
                          className="flex w-full items-center justify-center"
                        >
                          {formState === "LOADING" ? <Icon.spinner className="h-3 w-3 animate-spin" /> : <span>Send feedback</span>}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
