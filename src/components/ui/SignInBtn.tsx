"use client";
import { signIn } from "next-auth/react";
import { ButtonHTMLAttributes, FC } from "react";
import { RxPerson } from "react-icons/rx";

interface SignInBtnProps {
  attrs?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const SignInBtn: FC<SignInBtnProps> = ({attrs}) => {
  return (
    <button
      onClick={() => signIn()}
      className="flex h-8 place-items-center gap-2 rounded-sm border border-gray-dark px-2 text-xs outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
      {...attrs}
    >
      <RxPerson /> Sign In
    </button>
  );
};

export default SignInBtn;
