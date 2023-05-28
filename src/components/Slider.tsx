"use client";
import {
  FC,
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@/styles/slider.module.css";
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
interface SliderProps {
  title: string;
  children: React.ReactNode;
}

const Slider: FC<SliderProps> = ({ children, title }) => {
  if (typeof globalThis.window !== "undefined") {
    window.addEventListener("resize", handleItemsOnScreen);
  }
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>();

  // Handling items on screen
  useEffect(() => {
    handleItemsOnScreen();
  }, [totalSlides]);
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

  function handleItemsOnScreen() {
    let itemsOnScreen: string = trackRef.current?.dataset.itemsShowing || "5";
    if (window.innerWidth > 950) {
      itemsOnScreen = "5";
    }
    if (window.innerWidth < 950 && window.innerWidth > 750) {
      itemsOnScreen = "4";
    } else if (window.innerWidth < 750) {
      itemsOnScreen = "2";
    }
    trackRef.current?.style.setProperty(
      "--items-on-screen",
      itemsOnScreen.toString()
    );
    trackRef.current?.setAttribute("data-items-showing", itemsOnScreen);
    if (trackRef.current) {
      if (currentSlide > 0 && currentSlide >= totalSlides) {
        setCurrentSlide(totalSlides - 1);
        setTotalSlides(
          trackRef.current.children.length /
            parseInt(trackRef.current.getAttribute("data-items-showing") || "5")
        );
      }
      setTotalSlides(
        Math.ceil(
          trackRef.current.children.length /
            parseInt(trackRef.current.getAttribute("data-items-showing") || "5")
        )
      );
    }
  }

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <h2 className="text-xl font-medium capitalize">{title}</h2>
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
          data-items-showing="5"
          ref={trackRef as MutableRefObject<HTMLDivElement>}
          className={`${styles["slider-track"]} flex w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Slider;
