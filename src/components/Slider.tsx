"use client";
import { FC } from "react";
import styles from "@/styles/slider.module.css";
import React from "react";

interface SliderProps {
  title?: string | JSX.Element | null;
  children: React.ReactNode;
}

const Slider: FC<SliderProps> = ({ children, title }) => {
  return (
    <div>
      <div className="mb-3 flex justify-between">
        {title && (
          <h2 className="relative mb-6 pb-3 text-xl font-medium capitalize after:absolute after:bottom-0 after:left-0 after:h-1 after:w-7 after:rounded-md after:bg-brand">
            {title}
          </h2>
        )}
      </div>
      <div className={`scroll-design w-full overflow-auto`}>
        <div className={`${styles["slider-track"]} flex w-full`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Slider;
