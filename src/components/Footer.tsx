import { FC } from "react";
import Container from "@/components/Container";
import Link from "next/link";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="bg-zinc-800/10 text-white">
      <Container>
        <p className="font-work-sans text-sm font-medium">
          Designed and Developed by{" "}
          <Link
            href="https://github.com/saheem-shafi"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-brand hover:underline"
          >
            Mir Saheem Shafi.
          </Link>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
