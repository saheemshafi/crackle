"use client";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC, FormEvent } from "react";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
      callbackUrl: "/",
    });
  }
  return (
    <div className="p-3 sm:w-full">
      <form
        className="w-full rounded border border-gray-md/30 bg-gray-dark p-4 shadow-md"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="The movie db"
            width={50}
            height={50}
          />
          <p className="mt-3 text-sm capitalize text-gray-light">
            In order to use features like{" "}
            <span className="font-medium">
              (add ratings), (add movies to watchlist),
            </span>{" "}
            you need to be logged in.{" "}
            <span className="font-medium">
              Please login using your tmdb{" "}
              <span className="text-white">username</span> and{" "}
              <span className="text-white">password.</span>
            </span>
          </p>
        </div>
        <div className="mb-4 mt-8">
          <label
            htmlFor="username"
            className="mb-2 block font-work-sans text-gray-light"
          >
            Username
          </label>
          <input
            className="block w-full rounded border border-gray-md/50 bg-transparent px-3 py-2 font-work-sans outline-none transition-colors hover:border-tmdb-teal/50 focus:border-tmdb-blue/50"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="password"
            className="mb-2 block font-work-sans text-gray-light"
          >
            Password
          </label>
          <input
            className="block w-full rounded border border-gray-md/50 bg-transparent px-3 py-2 font-work-sans outline-none transition-colors hover:border-tmdb-teal/50 focus:border-tmdb-blue/50"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <Button
            text="Login With TMDB"
            type="tmdb"
            attrs={{ type: "submit" }}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
