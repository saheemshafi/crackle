"use client";
import { ButtonHTMLAttributes, FC, FormEvent, MouseEvent } from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  type?: "primary" | "secondary" | "default" | "tmdb";
  text?: string;
  handler?: (e: unknown | any) => unknown;
  attrs?: ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: JSX.Element;
}

const Button: FC<ButtonProps> = ({
  attrs,
  text,
  type = "primary",
  handler,
  icon: Icon,
}) => {
  return (
    <button
      onClick={(e) => (handler ? handler(e) : {})}
      className={`button ${type}`}
      {...attrs}
    >
      {Icon && Icon } {text && text}
    </button>
  );
};

export default Button;
