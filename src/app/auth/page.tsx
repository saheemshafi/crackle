"use client";
import Container from "@/components/Container";
import { signIn } from "next-auth/react";
import { FC, FormEvent } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
    });
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          className="my-2 block p-2"
          type="text"
          name="username"
          id="username"
        />
        <input
          className="my-2 block p-2"
          type="password"
          name="password"
          id="password"
        />
        <button type="submit" className="bg-zinc-700 p-2">
          Login
        </button>
      </form>
    </Container>
  );
};

export default page;
