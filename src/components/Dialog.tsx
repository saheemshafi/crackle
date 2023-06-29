"use client";

import { useRouter } from "next/navigation";
import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { VscClose } from "react-icons/vsc";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog: FC<DialogProps> = ({ children }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed bottom-0 left-0 right-0 top-0 z-[100] mx-auto bg-black/80 backdrop-blur-sm"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-3 sm:w-10/12 md:w-8/12"
      >
        <div className="flex py-2">
          <div className="ml-auto flex gap-2">
            <button
              aria-label="Close Image Preview"
              className="grid place-items-center rounded-full border border-white p-1 text-white hover:opacity-90"
              onClick={() => onDismiss()}
            >
              <VscClose size={24} />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
