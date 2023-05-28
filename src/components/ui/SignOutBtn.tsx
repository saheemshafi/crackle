"use client";
import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes, FC } from "react";
import { IoLogOut } from "react-icons/io5";

interface SignInBtnProps {
  attrs?: ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: boolean;
}

const SignOutBtn: FC<SignInBtnProps> = ({ attrs, icon }) => {
  return (
    <button
      onClick={() => signOut()}
      className="flex h-8 place-items-center gap-2 rounded-sm border border-gray-dark px-2 text-xs outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
      {...attrs}
    >
      {icon ? `${(<IoLogOut />)} Sign Out` : "Sign Out"}
    </button>
  );
};

export default SignOutBtn;
