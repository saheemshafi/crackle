"use client";
import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@/styles/slider.module.css";
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import React from "react";

interface SliderProps {
  title?: string | JSX.Element;
  children: React.ReactNode;
}

const Slider: FC<SliderProps> = ({ children, title }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const trackRef = useRef<any>();

  const handleItemsOnScreen = useCallback(() => {
    if (!trackRef.current) return;
    let track = trackRef.current as HTMLDivElement;

    let itemsOnScreen: string =
      getComputedStyle(track).getPropertyValue("--items-on-screen");
    track.style.setProperty("--items-on-screen", itemsOnScreen.toString());

    if (currentSlide > 0 && currentSlide >= totalSlides) {
      setCurrentSlide(totalSlides - 1);
      setTotalSlides(track.children.length / parseInt(itemsOnScreen));
    }
    setTotalSlides(Math.ceil(track.children.length / parseInt(itemsOnScreen)));
  }, []);

  if (typeof globalThis.window !== "undefined") {
    window.addEventListener("resize", handleItemsOnScreen);
  }

  // Handling items on screen
  useEffect(() => {
    handleItemsOnScreen();
    return () => {
      window.removeEventListener("resize", handleItemsOnScreen);
    };
  }, []);

  useEffect(() => {
    trackRef.current?.style.setProperty(
      "--current-slide",
      currentSlide.toString()
    );
  }, [currentSlide]);

  // Handling Next And Previous
  const handleSlide = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!trackRef.current) return;
      const sliderTrack: HTMLDivElement | undefined = trackRef.current;
      if (
        ((e.target as HTMLElement).closest("button") as HTMLButtonElement)
          .dataset.role === "previous"
      ) {
        const previousSlide =
          currentSlide <= 0 ? totalSlides - 1 : currentSlide - 1;
        setCurrentSlide(previousSlide);
        sliderTrack?.style.setProperty(
          "--current-slide",
          previousSlide.toString()
        );
      } else if (
        ((e.target as HTMLElement).closest("button") as HTMLButtonElement)
          .dataset.role === "next"
      ) {
        const nextSlide =
          currentSlide + 1 == totalSlides ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
        sliderTrack?.style.setProperty("--current-slide", nextSlide.toString());
      }
    },
    [currentSlide, totalSlides]
  );

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <h2 className="relative mb-6 pb-3 text-xl font-medium capitalize after:absolute after:bottom-0 after:left-0 after:h-1 after:w-7 after:rounded-md after:bg-brand">
          {title}
        </h2>
        <div className={`space-x-1 ${totalSlides <= 1 ? "hidden" : "block"}`}>
          <button
            type="button"
            onClick={handleSlide}
            data-role="previous"
            className="rounded-md bg-gray-dark p-2 text-gray-light shadow-lg outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-brand/40"
            aria-label="Previous Slide"
          >
            <IoCaretBackOutline />
          </button>
          <button
            type="button"
            onClick={handleSlide}
            data-role="next"
            className="rounded-md bg-gray-dark p-2 text-gray-light shadow-lg outline-none transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-brand/40"
            aria-label="Next Slide"
          >
            <IoCaretForwardOutline />
          </button>
        </div>
      </div>
      <div className={`w-full overflow-hidden`}>
        <div
          data-slider-track
          ref={trackRef}
          className={`${styles["slider-track"]} flex w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Slider;
