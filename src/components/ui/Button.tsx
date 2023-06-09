"use client";
import { ButtonHTMLAttributes, FC, MouseEventHandler } from "react";

interface ButtonProps {
  type?: "primary" | "secondary" | "default" | "tmdb";
  text?: string | JSX.Element;
  handler?: MouseEventHandler;
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
      {Icon && Icon} {text && text}
    </button>
  );
};

export default Button;
